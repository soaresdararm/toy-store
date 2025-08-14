"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { Pencil, Trash2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { ClienteEditForm } from "~/modules/clientes/components/ClienteEditForm";
import { ClienteForm } from "~/modules/clientes/components/ClienteForm";
import { Button } from "~/modules/shared/components/ui/button";
import { DataTable, useDataTable } from "~/modules/shared/components/ui/data-table";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "~/modules/shared/components/ui/dialog";
import { Sheet, SheetContent } from "~/modules/shared/components/ui/sheet";
import { DestaquesClientes, GraficoVendas } from ".";
import { deleteClient, getClients } from "../data/client.api";
import { normalizarClientes, primeiraLetraFaltante } from "../utils";

type ActionsCellProps = {
	row: any;
	onEdit: () => void;
	onDelete: () => void;
};

function ActionsCell({ onEdit, onDelete }: ActionsCellProps) {
	return (
		<div className="flex gap-2">
			<Button size="icon" onClick={onEdit} title="Editar">
				<Pencil className="h-4 w-4" />
			</Button>
			<Button size="icon" variant="negative" onClick={onDelete} title="Remover">
				<Trash2 className="h-4 w-4" />
			</Button>
		</div>
	);
}

const columns: ColumnDef<any>[] = [
	{
		accessorKey: "nome",
		header: "Nome",
		cell: ({ row }) => <span className={row.original.destaque ? `font-bold text-blue-700` : undefined}>{row.original.nome}</span>,
	},
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
	{
		accessorKey: "letraFaltante",
		header: "Letra Faltante",
		cell: ({ row }) => primeiraLetraFaltante(row.original.nome),
	},
	{
		accessorKey: "vendas",
		header: "Qtd. Vendas",
		cell: ({ row }) => row.original.vendas.length,
	},
	{
		id: "actions",
		header: "Ações",
		cell: ({ row }) => null,
	},
];

export default function ListCustomers() {
	const [open, setOpen] = useState(false);
	const [clientes, setClientes] = useState<any[]>([]);
	const { data: session } = useSession();

	async function fetchClientes() {
		try {
			const apiData = await getClients(session?.accessToken);
			const normalizados = normalizarClientes({ data: { clientes: apiData } });
			setClientes(normalizados);
		} catch (e: any) {
			toast.error(e.message || "Erro ao buscar clientes");
		}
	}

	useEffect(() => {
		fetchClientes();
	}, []);

	// Destaques
	let maiorVolume: string | null = null,
		maiorMedia: string | null = null,
		maiorFrequencia: string | null = null;
	if (clientes.length) {
		let maxVolume = -1,
			maxMedia = -1,
			maxFreq = -1;
		clientes.forEach((c: any) => {
			const total = c.vendas.reduce((s: number, v: { valor: number }) => s + v.valor, 0);
			const media = c.vendas.length ? total / c.vendas.length : 0;
			const diasUnicos = new Set(c.vendas.map((v: { data: string }) => v.data)).size;
			if (total > maxVolume) {
				maxVolume = total;
				maiorVolume = c.nome;
			}
			if (media > maxMedia) {
				maxMedia = media;
				maiorMedia = c.nome;
			}
			if (diasUnicos > maxFreq) {
				maxFreq = diasUnicos;
				maiorFrequencia = c.nome;
			}
		});
	}
	const clientesComDestaque = clientes.map((c: any) => ({
		...c,
		destaque: [maiorVolume, maiorMedia, maiorFrequencia].includes(c.nome),
	}));
	const [editCliente, setEditCliente] = useState<any | null>(null);
	const [deleteCliente, setDeleteCliente] = useState<any | null>(null);
	const [loadingDelete, setLoadingDelete] = useState(false);
	const [loadingEdit, setLoadingEdit] = useState(false);

	const table = useDataTable({
		columns: columns.map((col) =>
			col.id === "actions"
				? {
						...col,
						cell: ({ row }: any) => (
							<ActionsCell
								row={row}
								onEdit={() => setEditCliente(row.original)}
								onDelete={() => {
									// Busca o cliente na lista pelo id para garantir que é o objeto correto
									const id = row.original.id;
									const cliente = clientesComDestaque.find((c: any) => c.id === id);
									setDeleteCliente(cliente || row.original);
								}}
							/>
						),
					}
				: col,
		),
		data: clientesComDestaque,
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
				{/* Sheet de edição */}
				<Sheet open={!!editCliente} onOpenChange={(v) => !v && setEditCliente(null)}>
					<SheetContent side="right" className="w-full max-w-md p-6">
						{editCliente && (
							<ClienteEditForm
								cliente={{
									id: editCliente.id,
									nome: editCliente.nome,
									email: editCliente.email,
									nascimento: editCliente.nascimento,
								}}
								onClose={() => {
									setEditCliente(null);
									fetchClientes();
								}}
								onSuccess={() => {
									setEditCliente(null);
									fetchClientes();
								}}
							/>
						)}
					</SheetContent>
				</Sheet>
				{/* Dialog de remoção */}
				<Dialog open={!!deleteCliente} onOpenChange={(v) => !v && setDeleteCliente(null)}>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>Remover cliente</DialogTitle>
						</DialogHeader>
						<p>
							Tem certeza que deseja remover o cliente <b>{deleteCliente?.nome}</b>?
						</p>
						<DialogFooter>
							<Button onClick={() => setDeleteCliente(null)} disabled={loadingDelete}>
								Cancelar
							</Button>
							<Button
								onClick={async () => {
									setLoadingDelete(true);
									try {
										const id = deleteCliente && typeof deleteCliente.id !== "undefined" ? deleteCliente.id : undefined;
										if (!id) throw new Error("ID do cliente não encontrado");
										const result = await deleteClient(Number(id), session?.accessToken);
										toast.success("Cliente removido com sucesso!");
										setDeleteCliente(null);
										await fetchClientes();
									} catch (e: any) {
										toast.error(e.message || "Erro ao remover cliente");
									} finally {
										setLoadingDelete(false);
									}
								}}
								disabled={loadingDelete}
							>
								Remover
							</Button>
						</DialogFooter>
					</DialogContent>
				</Dialog>
			</div>
			<DestaquesClientes clientes={clientes} />
			<div className="my-4">
				<GraficoVendas vendas={clientes.flatMap((c) => c.vendas)} />
			</div>
			<div className="bg-neutral-0 max-h-[500px] overflow-y-auto rounded-lg p-4">
				<DataTable table={table} />
			</div>
		</div>
	);
}
