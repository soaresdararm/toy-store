import { env } from "~/env";
import { BaseApi } from "~/modules/shared/data/base.api";
import { useMutation } from "@tanstack/react-query";

export class AuthApi extends BaseApi {
	constructor() {
		super(env.NEXT_PUBLIC_API_URL);
	}

	async login(data: { email: string; password: string }): Promise<string> {
		const response = await this.httpClient.post("/api/auth/login", data);
		if (!response.data || !response.data.token) {
			throw new Error("Login inválido");
		}
		return response.data.token;
	}

	async register(data: { email: string; password: string }) {
		const response = await this.httpClient.post("/api/auth/register", data);
		return response.data;
	}
}

const api = new AuthApi();

export function useLogin() {
	return useMutation({
		mutationFn: async (data: { email: string; password: string }) => {
			return await api.login(data);
		},
	});
}

export function useRegister() {
	return useMutation({
		mutationFn: async (data: { email: string; password: string }) => {
			return await api.register(data);
		},
	});
}
