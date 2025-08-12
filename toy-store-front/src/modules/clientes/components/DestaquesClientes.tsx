import React from "react";
import type { Cliente } from "../utils/normalizarClientes";

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
			<div className="flex-1 rounded border bg-blue-50 p-4">
				<strong>Maior volume de vendas:</strong>
				<br />
				{maiorVolume
					? `${maiorVolume.nome} (R$ ${maiorVolume.vendas.reduce((s: number, v: { valor: number }) => s + v.valor, 0)})`
					: "-"}
			</div>
			<div className="flex-1 rounded border bg-green-50 p-4">
				<strong>Maior média por venda:</strong>
				<br />
				{maiorMedia
					? `${maiorMedia.nome} (R$ ${(maiorMedia.vendas.reduce((s: number, v: { valor: number }) => s + v.valor, 0) / (maiorMedia.vendas.length || 1)).toFixed(2)})`
					: "-"}
			</div>
			<div className="flex-1 rounded border bg-yellow-50 p-4">
				<strong>Maior frequência de compras:</strong>
				<br />
				{maiorFrequencia
					? `${maiorFrequencia.nome} (${new Set(maiorFrequencia.vendas.map((v: { data: string }) => v.data)).size} dias)`
					: "-"}
			</div>
		</div>
	);
};
