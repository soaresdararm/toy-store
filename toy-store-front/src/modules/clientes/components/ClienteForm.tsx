import React from "react";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "~/modules/shared/components/ui/form";
import { Button } from "~/modules/shared/components/ui/button";
import { Input } from "~/modules/shared/components/ui/input";
import { DatePicker } from "~/modules/shared/components/date-picker";
import { useForm } from "react-hook-form";

interface ClienteFormProps {
	onSubmit: (cliente: ClienteFormData) => void;
	onClose?: () => void;
}

export interface ClienteFormData {
	nome: string;
	email: string;
	nascimento: string;
}

export const ClienteForm: React.FC<ClienteFormProps> = ({ onSubmit, onClose }) => {
	const form = useForm<ClienteFormData>({
		defaultValues: { nome: "", email: "", nascimento: "" },
	});

	function handleFormSubmit(data: ClienteFormData) {
		onSubmit(data);
		if (onClose) onClose();
		form.reset();
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(handleFormSubmit)} className="flex flex-col">
				<h1 className="pb-4 text-2xl font-bold">Novo Cliente</h1>
				<FormField
					control={form.control}
					name="nome"
					rules={{ required: "Nome obrigatório" }}
					render={({ field }) => (
						<FormItem>
							<FormLabel>Nome completo</FormLabel>
							<FormControl>
								<Input type="text" placeholder="Nome completo" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="email"
					rules={{ required: "E-mail obrigatório" }}
					render={({ field }) => (
						<FormItem>
							<FormLabel>E-mail</FormLabel>
							<FormControl>
								<Input type="email" placeholder="E-mail" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="nascimento"
					rules={{ required: "Data de nascimento obrigatória" }}
					render={({ field }) => (
						<FormItem>
							<FormLabel>Data de nascimento</FormLabel>
							<FormControl>
								<DatePicker
									value={field.value}
									onChange={field.onChange}
									placeholder="Data de nascimento"
									disabled={field.disabled}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<div className="pt-4">
					<Button type="submit" className="btn-primary bt-4 w-full">
						Cadastrar
					</Button>
				</div>
			</form>
		</Form>
	);
};
