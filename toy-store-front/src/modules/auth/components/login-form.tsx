"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "~/modules/shared/components/ui/form";
import { Input } from "~/modules/shared/components/ui/input";
import { PasswordInput } from "~/modules/shared/components/ui/password-input";

const formSchema = z.object({
	login: z.string({ required_error: "Email é obrigatório" }).email("Digite um email válido"),
	password: z.string({ required_error: "Senha é obrigatória" }).min(6, "A senha deve ter no mínimo 6 caracteres"),
	rememberMe: z.boolean().optional(),
});
type FormSchema = z.infer<typeof formSchema>;

export function LoginForm() {
	const form = useForm<FormSchema>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			login: "",
			password: "",
			rememberMe: false,
		},
	});

	const router = useRouter();

	const onSubmit = async (data: FormSchema) => {
		if (data.rememberMe) {
			localStorage.setItem("rememberedLogin", data.login);
		} else {
			localStorage.removeItem("rememberedLogin");
		}

		const result = await signIn("credentials", {
			login: data.login,
			password: data.password,
			redirect: false,
		});

		if (result?.error?.length) {
			// toast.error("Email ou senha inválidos");
		} else {
			router.replace("/home");
		}
		router.replace("/home");
	};

	React.useEffect(() => {
		router.prefetch("/home");
		const savedLogin = localStorage.getItem("rememberedLogin");
		if (savedLogin) {
			form.setValue("login", savedLogin);
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
						name="login"
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
			</form>
		</Form>
	);
}
