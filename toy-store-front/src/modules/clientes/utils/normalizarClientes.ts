// Função utilitária para normalizar o JSON fornecido pela API
export interface Cliente {
	nome: string;
	email: string;
	nascimento: string;
	vendas: { data: string; valor: number }[];
}

export function normalizarClientes(apiData: any): Cliente[] {
	if (!apiData?.data?.clientes) return [];
	return apiData.data.clientes.map((c: any) => ({
		nome: c.info?.nomeCompleto || c.duplicado?.nomeCompleto || "",
		email: c.info?.detalhes?.email || "",
		nascimento: c.info?.detalhes?.nascimento || "",
		vendas: c.estatisticas?.vendas || [],
	}));
}

// Função para encontrar a primeira letra do alfabeto que não aparece no nome
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
