// @ts-nocheck
import { NextRequest, NextResponse } from "next/server";
import { ClientFormSchema } from "~/modules/clientes/data/schema/client.schema";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export async function PUT(req: NextRequest, context: { params: { id: string } }) {
	const { params } = context;
	const id = params?.id;
	if (!id || isNaN(Number(id))) {
		return NextResponse.json({ error: "ID inválido" }, { status: 400 });
	}
	const body = await req.json();
	const parse = ClientFormSchema.safeParse(body);
	if (!parse.success) {
		return NextResponse.json({ error: parse.error.format() }, { status: 400 });
	}
	const authHeader = req.headers.get("authorization");
	const res = await fetch(`${API_URL}/api/clients/${id}`, {
		method: "PUT",
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
		// Se status 204 (No Content), não pode retornar body
		if (res.status === 204) {
			return new Response(null, { status: 204 });
		}
		return new Response(text, { status: res.status });
	}
}

export async function DELETE(req: NextRequest, context: { params: { id: string } }) {
	const { params } = context;
	const id = params?.id;
	if (!id || isNaN(Number(id))) {
		return NextResponse.json({ error: "ID inválido" }, { status: 400 });
	}
	const authHeader = req.headers.get("authorization");
	const res = await fetch(`${API_URL}/api/clients/${id}`, {
		method: "DELETE",
		headers: {
			...(authHeader ? { Authorization: authHeader } : {}),
		},
	});
	const contentType = res.headers.get("content-type");
	if (contentType && contentType.includes("application/json")) {
		// Se status 204 (No Content), não pode retornar body
		if (res.status === 204) {
			return new Response(null, { status: 204 });
		}
		const data = await res.json();
		return NextResponse.json(data, { status: res.status });
	} else {
		// Se status 204 (No Content), não pode retornar body
		if (res.status === 204) {
			return new Response(null, { status: 204 });
		}
		const text = await res.text();
		return new Response(text, { status: res.status });
	}
}
