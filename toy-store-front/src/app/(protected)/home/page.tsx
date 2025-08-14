"use client";

import React from "react";
import { GraficoVendas, DestaquesClientes } from "../../../modules/clientes/components";
import { normalizarClientes, primeiraLetraFaltante } from "../../../modules/clientes/utils";

import { DataTable, useDataTable } from "../../../modules/shared/components/ui/data-table";
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

	// Definição das colunas para o DataTable
	const columns = [
		{
			accessorKey: "nome",
			header: "Nome",
		},
		{
			accessorKey: "email",
			header: "E-mail",
		},
		{
			accessorKey: "nascimento",
			header: "Nascimento",
		},
		{
			accessorKey: "vendas",
			header: "Vendas",
			cell: ({ row }: any) => row.original.vendas.length,
		},
		{
			accessorKey: "letraFaltante",
			header: "Letra faltante",
			cell: ({ row }: any) => primeiraLetraFaltante(row.original.nome),
		},
	];
	const dataTable = useDataTable ? useDataTable({ columns, data: clientes }) : undefined;

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
				{dataTable ? <DataTable table={dataTable} /> : <div>Carregando tabela...</div>}
			</section>
		</div>
	);
}
