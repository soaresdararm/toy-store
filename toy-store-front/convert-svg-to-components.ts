#!/usr/bin/env tsx

import { execSync } from "child_process";
import * as fs from "fs";
import * as path from "path";

// Configuration
const SVG_SOURCE_DIR = "./icons";
const COMPONENT_OUTPUT_DIR = "./src/modules/shared/components/icons";
const INDEX_FILE_PATH = "./src/modules/shared/components/icons/index.ts";

// Types
interface ConversionResult {
	success: boolean;
	componentName?: string;
	fileName?: string;
	error?: string;
}

// Helper function to convert kebab-case to PascalCase
function kebabToPascalCase(str: string): string {
	return str
		.split("-")
		.map((word: string) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
		.join("");
}

// Helper function to ensure filename follows kebab-case convention
function ensureKebabCase(str: string): string {
	return (
		str
			// Replace spaces and underscores with hyphens
			.replace(/[\s_]+/g, "-")
			// Replace multiple hyphens with single hyphen
			.replace(/-+/g, "-")
			// Remove leading and trailing hyphens
			.replace(/^-+|-+$/g, "")
			// Convert to lowercase
			.toLowerCase()
	);
}

// Helper function to replace fill colors with currentColor
function replaceFillColors(svgContent: string): string {
	// Replace various fill color patterns with currentColor
	// Only replace existing fill attributes, don't add new ones
	return svgContent
		.replace(/fill="[^"]*"/g, 'fill="currentColor"')
		.replace(/fill='[^']*'/g, "fill='currentColor'")
		.replace(/fill:\s*[^;]+;/g, "fill: currentColor;")
		.replace(/fill:\s*[^}]+}/g, "fill: currentColor}");
}

// Helper function to convert SVG content to React JSX
function svgToJsx(svgContent: string): string {
	return (
		svgContent
			// Replace self-closing tags
			.replace(/(<[^>]+)\/>/g, "$1 />")
			// Convert HTML attributes to JSX
			.replace(/clip-path=/g, "clipPath=")
			.replace(/fill-rule=/g, "fillRule=")
			.replace(/clip-rule=/g, "clipRule=")
			.replace(/stroke-width=/g, "strokeWidth=")
			.replace(/stroke-linecap=/g, "strokeLinecap=")
			.replace(/stroke-linejoin=/g, "strokeLinejoin=")
			.replace(/stroke-dasharray=/g, "strokeDasharray=")
			.replace(/stroke-dashoffset=/g, "strokeDashoffset=")
			.replace(/font-family=/g, "fontFamily=")
			.replace(/font-size=/g, "fontSize=")
			.replace(/font-weight=/g, "fontWeight=")
			.replace(/text-anchor=/g, "textAnchor=")
			.replace(/dominant-baseline=/g, "dominantBaseline=")
	);
}

// Function to find missing exports and update the index file
function updateIndexFile(): void {
	console.log("📝 Updating icons index file...");

	try {
		// Get all component files
		const componentFiles = fs
			.readdirSync(COMPONENT_OUTPUT_DIR)
			.filter((file: string) => file.endsWith(".tsx"))
			.map((file: string) => file.replace(".tsx", ""));

		// Read current index file
		const indexContent = fs.readFileSync(INDEX_FILE_PATH, "utf8");

		// Find missing exports
		const missingExports: string[] = [];
		componentFiles.forEach((fileName: string) => {
			if (!indexContent.includes(`"./${fileName}"`)) {
				missingExports.push(fileName);
			}
		});

		if (missingExports.length === 0) {
			console.log("✅ All icons are already exported in the index file");
			return;
		}

		console.log(`📦 Found ${missingExports.length} missing exports`);

		// Generate export statements for missing icons
		const newExports = missingExports
			.map((fileName: string) => {
				const componentName = kebabToPascalCase(fileName);
				return `export { default as ${componentName} } from "./${fileName}";`;
			})
			.join("\n");

		// Add new exports to the end of the file (before the final newline)
		const updatedContent = indexContent.trim() + "\n" + newExports + "\n";

		// Write updated index file
		fs.writeFileSync(INDEX_FILE_PATH, updatedContent);

		console.log(`✅ Added ${missingExports.length} exports to index file:`);
		missingExports.forEach((fileName: string) => {
			console.log(`   - ${kebabToPascalCase(fileName)}`);
		});

		// Verify all icons are now exported
		const finalCheck = fs
			.readdirSync(COMPONENT_OUTPUT_DIR)
			.filter((file: string) => file.endsWith(".tsx"))
			.map((file: string) => file.replace(".tsx", ""))
			.filter((fileName: string) => !updatedContent.includes(`"./${fileName}"`));

		if (finalCheck.length === 0) {
			console.log("✅ All icons are now properly exported");
		} else {
			console.warn(`⚠️  ${finalCheck.length} icons still missing from exports`);
		}
	} catch (error) {
		console.error("❌ Error updating index file:", error);
	}
}

// Main conversion function
function convertSvgToComponent(svgFilePath: string, outputDir: string): ConversionResult {
	try {
		// Read SVG file
		const svgContent = fs.readFileSync(svgFilePath, "utf8");

		// Extract filename without extension
		const originalFileName = path.basename(svgFilePath, ".svg");

		// Ensure filename follows kebab-case convention
		const fileName = ensureKebabCase(originalFileName);

		// Convert to PascalCase for component name
		const componentName = kebabToPascalCase(fileName);

		// Extract SVG content (remove opening and closing svg tags to get inner content)
		const svgMatch = /<svg[^>]*>([\s\S]*)<\/svg>/.exec(svgContent.trim());
		if (!svgMatch) {
			throw new Error(`Invalid SVG format in ${svgFilePath}`);
		}

		const svgAttributesMatch = /<svg([^>]*)/.exec(svgContent.trim());
		if (!svgAttributesMatch) {
			throw new Error(`Could not extract SVG attributes from ${svgFilePath}`);
		}

		const svgAttributes = svgAttributesMatch[1];
		let svgInnerContent = svgMatch[1];

		if (!svgInnerContent) {
			throw new Error(`Empty SVG content in ${svgFilePath}`);
		}

		// Replace fill colors with currentColor only on child elements
		svgInnerContent = replaceFillColors(svgInnerContent);

		// Convert to JSX
		svgInnerContent = svgToJsx(svgInnerContent);

		// Create React component
		const componentCode = `export default function ${componentName}(props: React.SVGProps<SVGSVGElement>) {
\treturn (
\t\t<svg${svgAttributes} {...props}>
${svgInnerContent
	.split("\n")
	.map((line) => (line ? `\t\t\t${line}` : ""))
	.join("\n")}
\t\t</svg>
\t);
}
`;

		// Create output filename (ensure kebab-case)
		const outputFileName = `${fileName}.tsx`;
		const outputPath = path.join(outputDir, outputFileName);

		// Write component file
		fs.writeFileSync(outputPath, componentCode);

		console.log(`✅ Converted ${originalFileName}.svg → ${outputFileName}`);
		return { success: true, componentName, fileName };
	} catch (error) {
		const errorMessage = error instanceof Error ? error.message : String(error);
		console.error(`❌ Error converting ${svgFilePath}:`, errorMessage);
		return { success: false, error: errorMessage };
	}
}

// Main execution function
function main(): void {
	console.log("🚀 Starting SVG to React Component conversion...\n");

	// Check if source directory exists
	if (!fs.existsSync(SVG_SOURCE_DIR)) {
		console.error(`❌ Source directory not found: ${SVG_SOURCE_DIR}`);
		process.exit(1);
	}

	// Create output directory if it doesn't exist
	if (!fs.existsSync(COMPONENT_OUTPUT_DIR)) {
		fs.mkdirSync(COMPONENT_OUTPUT_DIR, { recursive: true });
		console.log(`📁 Created output directory: ${COMPONENT_OUTPUT_DIR}`);
	}

	// Get all SVG files
	const svgFiles = fs
		.readdirSync(SVG_SOURCE_DIR)
		.filter((file: string) => file.endsWith(".svg"))
		.map((file: string) => path.join(SVG_SOURCE_DIR, file));

	if (svgFiles.length === 0) {
		console.log(`⚠️  No SVG files found in ${SVG_SOURCE_DIR}`);
		return;
	}

	console.log(`📂 Found ${svgFiles.length} SVG files to convert:\n`);

	// Convert all SVG files
	const results = svgFiles.map((svgFile: string) => convertSvgToComponent(svgFile, COMPONENT_OUTPUT_DIR));

	// Summary
	const successful = results.filter((r: ConversionResult) => r.success).length;
	const failed = results.filter((r: ConversionResult) => !r.success).length;

	console.log("\n📊 Conversion Summary:");
	console.log(`✅ Successful: ${successful}`);
	console.log(`❌ Failed: ${failed}`);
	console.log(`📁 Output directory: ${COMPONENT_OUTPUT_DIR}`);

	if (failed > 0) {
		console.log("\n❌ Failed conversions:");
		results
			.filter((r: ConversionResult) => !r.success)
			.forEach((r: ConversionResult) => {
				console.log(`   - ${r.error}`);
			});
	}

	// Update the index file with any new exports
	if (successful > 0) {
		console.log("\n📝 Updating icons index file...");
		updateIndexFile();
	}

	// Format the generated files
	if (successful > 0) {
		console.log("\n🎨 Formatting generated files...");
		try {
			execSync("bun format", { stdio: "inherit" });
			console.log("✅ Files formatted successfully");
		} catch (error) {
			console.warn(error);
		}
	}

	console.log("\n🎉 Conversion complete!");
}

// Run the script
if (require.main === module) {
	main();
}

export { convertSvgToComponent, ensureKebabCase, kebabToPascalCase, replaceFillColors, svgToJsx, updateIndexFile };
