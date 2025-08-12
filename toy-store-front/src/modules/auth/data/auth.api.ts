import { env } from "~/env";
import { BaseApi } from "~/modules/shared/data/base.api";
import type { ApiResponse } from "~/modules/shared/data/schema/api-response.schema";
import { loginResponseSchema, type LoginInput, type LoginResponse } from "./schema/login.schema";

export class AuthApi extends BaseApi {
	constructor() {
		super(env.NEXT_PUBLIC_API_URL);
	}

	async login(data: LoginInput): Promise<LoginResponse> {
		const response = await this.httpClient.post<ApiResponse>("/Auth/Login", data);
		if (!response.data.success) {
			throw new Error(response.data.message);
		}

		const parsed = loginResponseSchema.safeParse(response.data.data);
		if (!parsed.success) {
			console.error(parsed.error);
			throw new Error(parsed.error.message);
		}
		return parsed.data;
	}
}
