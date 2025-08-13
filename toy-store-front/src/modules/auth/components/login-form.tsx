"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { Button } from "~/modules/shared/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "~/modules/shared/components/ui/form";
import { Input } from "~/modules/shared/components/ui/input";
import { PasswordInput } from "~/modules/shared/components/ui/password-input";
import { useLogin } from "../data/auth.api";

const formSchema = z.object({
	email: z.string({ required_error: "Email é obrigatório" }).email("Digite um email válido"),
	password: z.string({ required_error: "Senha é obrigatória" }).min(6, "A senha deve ter no mínimo 6 caracteres"),
	rememberMe: z.boolean().optional(),
});

type FormSchema = z.infer<typeof formSchema>;

export function LoginForm() {
	const form = useForm<FormSchema>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "",
			password: "",
			rememberMe: false,
		},
	});

	const router = useRouter();
	const loginMutation = useLogin();

	const onSubmit = (data: FormSchema) => {
		if (data.rememberMe) {
			localStorage.setItem("rememberedEmail", data.email);
		} else {
			localStorage.removeItem("rememberedEmail");
		}

		loginMutation.mutate(
			{ email: data.email, password: data.password },
			{
				onSuccess: () => {
					router.replace("/home");
				},
				onError: () => {
					// toast.error("Email ou senha inválidos");
				},
			},
		);
	};

	React.useEffect(() => {
		router.prefetch("/home");
		const savedEmail = localStorage.getItem("rememberedEmail");
		if (savedEmail) {
			form.setValue("email", savedEmail);
			form.setValue("rememberMe", true);
		}
	}, [router, form]);

	return (
		<Form {...form}>
			<form className="flex h-full w-full flex-col justify-center gap-12 py-6" onSubmit={form.handleSubmit(onSubmit)}>
				<h2 className="typography-header-lg">Login</h2>
				<div className="flex flex-col justify-center space-y-3">
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel showAsterisk>Email</FormLabel>
								<FormControl>
									<Input placeholder="Digite aqui..." type="email" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="password"
						render={({ field }) => (
							<FormItem>
								<FormLabel showAsterisk>Senha</FormLabel>
								<FormControl>
									<PasswordInput placeholder="Digite aqui..." {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<div className="flex flex-col gap-3">
					<Button type="submit">Login</Button>
				</div>
			</form>
		</Form>
	);
}
