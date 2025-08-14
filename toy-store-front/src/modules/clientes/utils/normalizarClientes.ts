export interface Cliente {
	id: number;
	nome: string;
	email: string;
	nascimento: string;
	vendas: { data: string; valor: number }[];
}

export function normalizarClientes(apiData: any): Cliente[] {
	const clientes = apiData?.data?.clientes || apiData?.clientes || [];
	return clientes.map((c: any) => {
		if (c.info || c.estatisticas) {
			return {
				id: c.id ?? 0,
				nome: c.info?.nomeCompleto || c.duplicado?.nomeCompleto || "",
				email: c.info?.detalhes?.email || "",
				nascimento: c.info?.detalhes?.nascimento || "",
				vendas: c.estatisticas?.vendas || [],
			};
		} else {
			return {
				id: c.id ?? 0,
				nome: c.nomeCompleto || "",
				email: c.email || "",
				nascimento: c.nascimento || "",
				vendas: c.vendas || [],
			};
		}
	});
}

export function primeiraLetraFaltante(nome: string): string {
	const letras = nome
		.toLowerCase()
		.replace(/[^a-z]/g, "")
		.split("");
	for (let i = 97; i <= 122; i++) {
		if (!letras.includes(String.fromCharCode(i))) {
			return String.fromCharCode(i);
		}
	}
	return "-";
}
