export class ApiError extends Error {
	constructor(
		public message: string,
		public code:
			| "INVALID_CREDENTIALS"
			| "SERVER_ERROR"
			| "NETWORK_ERROR"
			| "PARSE_ERROR"
			| "INVALID_ACCESS",
		public status: number,
	) {
		super(message);
		this.name = "ApiError";
	}
}

export const errorCodes = {
	INVALID_CREDENTIALS: "INVALID_CREDENTIALS",
	SERVER_ERROR: "SERVER_ERROR",
	NETWORK_ERROR: "NETWORK_ERROR",
	PARSE_ERROR: "PARSE_ERROR",
	INVALID_ACCESS: "INVALID_ACCESS",
} as const;
