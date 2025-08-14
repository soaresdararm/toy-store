"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { useState, useEffect } from "react";
import { ClienteForm } from "~/modules/clientes/components/ClienteForm";
import { Button } from "~/modules/shared/components/ui/button";
import { Sheet, SheetContent } from "~/modules/shared/components/ui/sheet";
import { DataTable, useDataTable } from "~/modules/shared/components/ui/data-table";
import { getClients } from "../data/client.api";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

const columns: ColumnDef<any>[] = [
	{ accessorKey: "nomeCompleto", header: "Nome" },
	{ accessorKey: "email", header: "E-mail" },
	{
		accessorKey: "nascimento",
		header: "Nascimento",
		cell: ({ row }) => {
			const nasc = row.original.nascimento;
			if (!nasc) return "-";
			const d = new Date(nasc);
			if (isNaN(d.getTime())) return nasc;
			return d.toLocaleDateString("pt-BR");
		},
	},
];

export default function ListCustomers() {
	const [open, setOpen] = useState(false);
	const [clientes, setClientes] = useState<any[]>([]);
	const { data: session } = useSession();

	async function fetchClientes() {
		try {
			const lista = await getClients(session?.accessToken);
			setClientes(lista);
		} catch (e: any) {
			toast.error(e.message || "Erro ao buscar clientes");
		}
	}

	useEffect(() => {
		fetchClientes();
	}, []);

	const table = useDataTable({
		columns,
		data: clientes,
	});

	return (
		<div className="mx-auto max-w-4xl p-4">
			<div className="mb-4 flex items-center justify-between">
				<h1 className="text-2xl font-bold">Clientes</h1>
				<Button onClick={() => setOpen(true)}>Cadastrar Cliente</Button>
				<Sheet open={open} onOpenChange={setOpen}>
					<SheetContent side="right" className="w-full max-w-md p-6">
						<ClienteForm
							onClose={() => {
								setOpen(false);
								fetchClientes();
							}}
						/>
					</SheetContent>
				</Sheet>
			</div>
			<div className="bg-neutral-0 max-h-[500px] overflow-y-auto rounded-lg p-4">
				<DataTable table={table} />
			</div>
		</div>
	);
}
