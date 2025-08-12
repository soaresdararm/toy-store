export function getBaseUrl_serverOnly(headersList: Readonly<Headers>) {
	const host = headersList.get("host");
	const protocol = headersList.get("x-forwarded-proto") ?? "https"; // Usually 'https' on Vercel
	const baseUrl = `${protocol}://${host}`;

	return baseUrl;
}
