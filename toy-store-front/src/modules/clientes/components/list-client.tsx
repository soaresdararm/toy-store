"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import { ClienteForm, type ClienteFormData } from "~/modules/clientes/components/ClienteForm";
import { Button } from "~/modules/shared/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "~/modules/shared/components/ui/sheet";
import { DataTable, useDataTable } from "~/modules/shared/components/ui/data-table";

const clientesMock = [
	{ id: 1, nome: "Ana Beatriz", email: "ana.b@example.com", nascimento: "1992-05-01", vendas: 2 },
	{ id: 2, nome: "Carlos Eduardo", email: "cadu@example.com", nascimento: "1987-08-15", vendas: 0 },
	{ id: 3, nome: "Ana Beatriz", email: "ana.b@example.com", nascimento: "1992-05-01", vendas: 2 },
	{ id: 4, nome: "Carlos Eduardo", email: "cadu@example.com", nascimento: "1987-08-15", vendas: 0 },
	{ id: 5, nome: "Ana Beatriz", email: "ana.b@example.com", nascimento: "1992-05-01", vendas: 2 },
];

const columns: ColumnDef<(typeof clientesMock)[0]>[] = [
	{ accessorKey: "nome", header: "Nome" },
	{ accessorKey: "email", header: "E-mail" },
	{ accessorKey: "nascimento", header: "Nascimento" },
	{ accessorKey: "vendas", header: "Vendas" },
];

export default function ListCustomers() {
	const [open, setOpen] = useState(false);
	const [clientes, setClientes] = useState(clientesMock);

	const table = useDataTable({
		columns,
		data: clientes,
	});

	function handleAddCliente(data: ClienteFormData) {
		setClientes((prev) => [...prev, { ...data, id: prev.length + 1, vendas: 0 }]);
	}

	return (
		<div className="mx-auto max-w-4xl p-4">
			<div className="mb-4 flex items-center justify-between">
				<h1 className="text-2xl font-bold">Clientes</h1>

				<Button onClick={() => setOpen(true)}>Cadastrar Cliente</Button>
				<Sheet open={open} onOpenChange={setOpen}>
					<SheetContent side="right" className="w-full max-w-md p-6">
						<ClienteForm onSubmit={handleAddCliente} onClose={() => setOpen(false)} />
					</SheetContent>
				</Sheet>
			</div>
			<div className="bg-neutral-0 max-h-[500px] overflow-y-auto rounded-lg p-4">
				<DataTable table={table} />
			</div>
		</div>
	);
}
