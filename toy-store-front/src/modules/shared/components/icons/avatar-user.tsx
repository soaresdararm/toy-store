export default function AvatarUser(props: React.SVGProps<SVGSVGElement>) {
	return (
		<svg width={58} height={58} viewBox="0 0 58 58" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
			<rect width={58} height={58} rx={29} fill="#E7EDF8" />
			<path
				d="M29.5 29.469c5.247 0 9.5 2.814 9.5 6.285 0 3.47-4.253 6.284-9.5 6.284S20 39.225 20 35.754c0-3.471 4.253-6.285 9.5-6.285zM29.5 15a6.284 6.284 0 110 12.569A6.284 6.284 0 0129.5 15z"
				fill="currentColor"
			/>
		</svg>
	);
}
