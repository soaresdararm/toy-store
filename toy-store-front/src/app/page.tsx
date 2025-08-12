import { LoginForm } from "~/modules/auth/components/login-form";

export default function Page() {
	return (
		<>
			<div className="grid h-screen w-full md:grid-cols-1 xl:grid-cols-3">
				<div className="col-span-1 p-20">
					<LoginForm />
				</div>

				<div className="bg-primary col-span-2 flex items-center justify-center p-10 md:hidden xl:flex">
					<h1 className="text-neutral-0 text-7xl font-bold">Loja de Brinquedos</h1>
				</div>
			</div>
		</>
	);
}
