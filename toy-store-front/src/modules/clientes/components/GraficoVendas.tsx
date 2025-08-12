import React from "react";

interface VendaPorDia {
	data: string;
	valor: number;
}

interface GraficoVendasProps {
	vendas: VendaPorDia[];
}

export const GraficoVendas: React.FC<GraficoVendasProps> = ({ vendas }) => {
	if (!vendas.length) return <div>Nenhuma venda registrada.</div>;
	const maxValor = Math.max(...vendas.map((v) => v.valor));
	return (
		<svg width={400} height={200} className="rounded bg-gray-100">
			{vendas.map((v, i) => (
				<rect
					key={v.data}
					x={i * 40 + 30}
					y={200 - (v.valor / maxValor) * 150 - 20}
					width={30}
					height={(v.valor / maxValor) * 150}
					fill="#3b82f6"
				/>
			))}
			{vendas.map((v, i) => (
				<text key={v.data + "-label"} x={i * 40 + 45} y={190} fontSize={12} textAnchor="middle">
					{v.data.slice(5)}
				</text>
			))}
		</svg>
	);
};
