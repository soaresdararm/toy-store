"use client";

import React from "react";
import { GraficoVendas, DestaquesClientes } from "../../../modules/clientes/components";
import { normalizarClientes, primeiraLetraFaltante } from "../../../modules/clientes/utils";
import { useSession } from "next-auth/react";

// Mock do JSON fornecido
const mockApi = {
	data: {
		clientes: [
			{
				info: {
					nomeCompleto: "Ana Beatriz",
					detalhes: {
						email: "ana.b@example.com",
						nascimento: "1992-05-01",
					},
				},
				estatisticas: {
					vendas: [
						{ data: "2024-01-01", valor: 150 },
						{ data: "2024-01-02", valor: 50 },
					],
				},
			},
			{
				info: {
					nomeCompleto: "Carlos Eduardo",
					detalhes: {
						email: "cadu@example.com",
						nascimento: "1987-08-15",
					},
				},
				duplicado: {
					nomeCompleto: "Carlos Eduardo",
				},
				estatisticas: {
					vendas: [],
				},
			},
		],
	},
	meta: {
		registroTotal: 2,
		pagina: 1,
	},
	redundante: {
		status: "ok",
	},
};

export default function Page() {



	const clientes = normalizarClientes(mockApi);
	// Junta todas as vendas para o gráfico
	const vendasPorDia: { [data: string]: number } = {};
	clientes.forEach((c) => {
		c.vendas.forEach((v) => {
			vendasPorDia[v.data] = (vendasPorDia[v.data] || 0) + v.valor;
		});
	});
	const vendasArray = Object.entries(vendasPorDia).map(([data, valor]) => ({ data, valor: Number(valor) }));

	return (
		<div className="mx-auto max-w-4xl p-4">
			<h1 className="mb-4 text-2xl font-bold">Dashboard de Clientes</h1>
			<section className="mb-8">
				<h2 className="mb-2 font-semibold">Total de vendas por dia</h2>
				<GraficoVendas vendas={vendasArray} />
			</section>
			<DestaquesClientes clientes={clientes} />
			<section className="mt-8">
				<h2 className="mb-2 font-semibold">Lista de clientes</h2>
				<table className="w-full rounded border bg-white">
					<thead>
						<tr className="bg-gray-100">
							<th className="p-2">Nome</th>
							<th className="p-2">E-mail</th>
							<th className="p-2">Nascimento</th>
							<th className="p-2">Vendas</th>
							<th className="p-2">Letra faltante</th>
						</tr>
					</thead>
					<tbody>
						{clientes.map((c, i) => (
							<tr key={i} className="border-t">
								<td className="p-2">{c.nome}</td>
								<td className="p-2">{c.email}</td>
								<td className="p-2">{c.nascimento}</td>
								<td className="p-2">{c.vendas.length}</td>
								<td className="p-2 font-mono text-lg text-blue-600">{primeiraLetraFaltante(c.nome)}</td>
							</tr>
						))}
					</tbody>
				</table>
			</section>
		</div>
	);
}
