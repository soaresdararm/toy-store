import React from "react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

export type Venda = {
	data: string;
	valor: number;
};

interface GraficoVendasProps {
	vendas: Venda[];
}

export const GraficoVendas: React.FC<GraficoVendasProps> = ({ vendas }) => {
	if (!vendas || vendas.length === 0) {
		return <div className="text-gray-500">Nenhuma venda registrada.</div>;
	}
	return (
		<div style={{ width: "100%", height: 180 }}>
			<ResponsiveContainer>
				<BarChart data={vendas} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis dataKey="data" />
					<YAxis />
					<Tooltip />
					<Bar dataKey="valor" fill="#2563eb" />
				</BarChart>
			</ResponsiveContainer>
		</div>
	);
};
