/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import axios, { type AxiosInstance } from "axios";

export class BaseApi {
	protected readonly httpClient: AxiosInstance;

	constructor(baseURL?: string) {
		this.httpClient = axios.create({ baseURL: baseURL, validateStatus: () => true });
	}
}
