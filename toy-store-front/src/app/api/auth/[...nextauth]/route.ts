import { NextResponse } from "next/server";

// Mock simples para endpoints do NextAuth
export async function GET() {
	return NextResponse.json({
		user: {
			name: "Usuário Mock",
			email: "mock@mock.com",
		},
		expires: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
	});
}

export async function POST() {
	return NextResponse.json({
		ok: true,
		message: "Login mock realizado",
	});
}
