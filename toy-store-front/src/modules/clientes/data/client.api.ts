import type { Client, ClientForm } from "./schema/client.schema";

export async function createClient(data: ClientForm, token?: string) {
	const res = await fetch("/api/clients", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			...(token ? { Authorization: `Bearer ${token}` } : {}),
		},
		body: JSON.stringify(data),
	});
	if (!res.ok) throw new Error("Erro ao cadastrar cliente");
	return res.json();
}

export async function getClients(token?: string): Promise<Client[]> {
	const res = await fetch("/api/clients", {
		headers: {
			...(token ? { Authorization: `Bearer ${token}` } : {}),
		},
	});
	if (!res.ok) throw new Error("Erro ao buscar clientes");
	const data = await res.json().catch(() => ({}));
	if (Array.isArray(data)) {
		return data;
	}
	if (Array.isArray(data.clientes)) {
		return data.clientes;
	}
	return [];
}
