import React, { useState } from "react";

interface ClienteFormProps {
	onSubmit: (cliente: ClienteFormData) => void;
}

export interface ClienteFormData {
	nome: string;
	email: string;
	nascimento: string;
}

export const ClienteForm: React.FC<ClienteFormProps> = ({ onSubmit }) => {
	const [form, setForm] = useState<ClienteFormData>({
		nome: "",
		email: "",
		nascimento: "",
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onSubmit(form);
	};

	return (
		<form onSubmit={handleSubmit} className="mx-auto flex max-w-md flex-col gap-4 rounded border bg-white p-4">
			<label>
				Nome completo
				<input type="text" name="nome" value={form.nome} onChange={handleChange} required className="input input-bordered w-full" />
			</label>
			<label>
				E-mail
				<input
					type="email"
					name="email"
					value={form.email}
					onChange={handleChange}
					required
					className="input input-bordered w-full"
				/>
			</label>
			<label>
				Data de nascimento
				<input
					type="date"
					name="nascimento"
					value={form.nascimento}
					onChange={handleChange}
					required
					className="input input-bordered w-full"
				/>
			</label>
			<button type="submit" className="btn btn-primary w-full">
				Cadastrar
			</button>
		</form>
	);
};
