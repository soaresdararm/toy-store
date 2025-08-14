import { NextRequest, NextResponse } from "next/server";
import { ClientFormSchema } from "~/modules/clientes/data/schema/client.schema";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export async function GET(req: NextRequest) {
	const authHeader = req.headers.get("authorization");
	const res = await fetch(`${API_URL}/api/clients`, {
		headers: {
			...(authHeader ? { Authorization: authHeader } : {}),
		},
	});
	const contentType = res.headers.get("content-type");
	if (contentType && contentType.includes("application/json")) {
		const data = await res.json();
		return NextResponse.json(data, { status: res.status });
	} else {
		const text = await res.text();
		return new Response(text, { status: res.status });
	}
}

export async function POST(req: NextRequest) {
	const body = await req.json();
	const parse = ClientFormSchema.safeParse(body);
	if (!parse.success) {
		return NextResponse.json({ error: parse.error.format() }, { status: 400 });
	}
	const authHeader = req.headers.get("authorization");
	const res = await fetch(`${API_URL}/api/clients`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			...(authHeader ? { Authorization: authHeader } : {}),
		},
		body: JSON.stringify(body),
	});
	const contentType = res.headers.get("content-type");
	if (contentType && contentType.includes("application/json")) {
		const data = await res.json();
		return NextResponse.json(data, { status: res.status });
	} else {
		const text = await res.text();
		return new Response(text, { status: res.status });
	}
}
