import React from "react";
import type { Cliente } from "../utils/normalizarClientes";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "../../shared/components/ui/card";

interface DestaquesProps {
	clientes: Cliente[];
}
function calcularDestaques(clientes: Cliente[]) {
	let maiorVolume: Cliente | undefined;
	let maiorMedia: Cliente | undefined;
	let maiorFrequencia: Cliente | undefined;
	let maxVolume = -1,
		maxMedia = -1,
		maxFreq = -1;

	clientes.forEach((c: Cliente) => {
		const total = c.vendas.reduce((s: number, v: { valor: number }) => s + v.valor, 0);
		const media = c.vendas.length ? total / c.vendas.length : 0;
		const diasUnicos = new Set(c.vendas.map((v: { data: string }) => v.data)).size;
		if (total > maxVolume) {
			maxVolume = total;
			maiorVolume = c;
		}
		if (media > maxMedia) {
			maxMedia = media;
			maiorMedia = c;
		}
		if (diasUnicos > maxFreq) {
			maxFreq = diasUnicos;
			maiorFrequencia = c;
		}
	});
	return { maiorVolume, maiorMedia, maiorFrequencia };
}

export const DestaquesClientes: React.FC<DestaquesProps> = ({ clientes }) => {
	const { maiorVolume, maiorMedia, maiorFrequencia } = calcularDestaques(clientes);
	return (
		<div className="my-4 flex flex-col gap-4 md:flex-row">
			<Card className="bg-primary-50 flex-1">
				<CardHeader>
					<CardTitle className="text-neutral-0">Maior volume de vendas</CardTitle>
				</CardHeader>
				<CardContent>
					<CardDescription className="text-neutral-0 flex h-full items-center justify-center text-center">
						{maiorVolume
							? `${maiorVolume.nome} (R$ ${maiorVolume.vendas.reduce((s: number, v: { valor: number }) => s + v.valor, 0)})`
							: "-"}
					</CardDescription>
				</CardContent>
			</Card>
			<Card className="flex-1 bg-green-50">
				<CardHeader>
					<CardTitle className="text-neutral-0">Maior média por venda</CardTitle>
				</CardHeader>
				<CardContent>
					<CardDescription className="text-neutral-0 flex h-full items-center justify-center text-center">
						{maiorMedia
							? `${maiorMedia.nome} (R$ ${(maiorMedia.vendas.reduce((s: number, v: { valor: number }) => s + v.valor, 0) / (maiorMedia.vendas.length || 1)).toFixed(2)})`
							: "-"}
					</CardDescription>
				</CardContent>
			</Card>
			<Card className="flex flex-1 bg-yellow-50">
				<CardHeader>
					<CardTitle className="text-neutral-0">Maior frequência de compras</CardTitle>
				</CardHeader>
				<CardContent>
					<CardDescription className="text-neutral-0 flex h-full items-center justify-center text-center">
						{maiorFrequencia
							? `${maiorFrequencia.nome} (${new Set(maiorFrequencia.vendas.map((v: { data: string }) => v.data)).size} dias)`
							: "-"}
					</CardDescription>
				</CardContent>
			</Card>
		</div>
	);
};
