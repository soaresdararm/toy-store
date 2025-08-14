import React, { useState } from "react";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "~/modules/shared/components/ui/form";
import { Button } from "~/modules/shared/components/ui/button";
import { Input } from "~/modules/shared/components/ui/input";
import { DatePicker } from "~/modules/shared/components/date-picker";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createClient } from "../data/client.api";
import { ClientFormSchema, type ClientForm } from "../data/schema/client.schema";
import { toast } from "sonner";
import { useSession } from "next-auth/react";

interface ClienteFormProps {
	onSuccess?: () => void;
	onClose?: () => void;
}

export const ClienteForm: React.FC<ClienteFormProps> = ({ onSuccess, onClose }) => {
	const [loading, setLoading] = useState(false);
	const form = useForm<ClientForm>({
		resolver: zodResolver(ClientFormSchema),
		defaultValues: { nomeCompleto: "", email: "", nascimento: "" },
	});
	const { data: session } = useSession();

	async function handleFormSubmit(data: ClientForm) {
		setLoading(true);
		try {
			let nascimento = data.nascimento;
			if (nascimento && nascimento.includes("/")) {
				const [dia, mes, ano] = nascimento.split("/");
				if (dia && mes && ano) {
					nascimento = `${ano}-${mes.padStart(2, "0")}-${dia.padStart(2, "0")}`;
				}
			}
			const payload = {
				nomeCompleto: data.nomeCompleto,
				email: data.email,
				nascimento,
			};
			await createClient(payload, session?.accessToken);
			toast.success("Cliente cadastrado com sucesso!");
			form.reset();
			if (onSuccess) onSuccess();
			if (onClose) onClose();
		} catch (e: any) {
			toast.error(e.message || "Erro ao cadastrar cliente");
		} finally {
			setLoading(false);
		}
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(handleFormSubmit)} className="flex flex-col">
				<h1 className="pb-4 text-2xl font-bold">Novo Cliente</h1>
				<FormField
					control={form.control}
					name="nomeCompleto"
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
				{/* Mensagens de erro/sucesso agora são exibidas via toast */}
				<div className="pt-4">
					<Button type="submit" className="btn-primary bt-4 w-full" disabled={loading}>
						{loading ? "Cadastrando..." : "Cadastrar"}
					</Button>
				</div>
			</form>
		</Form>
	);
};
