import { ApiError, errorCodes } from "@/app/utils/api-error";
import { RegistrarClient } from "@/app/utils/registrar";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
	try {
		const body = await req.json();
		const { username, password } = body;

		if (!username || !password) {
			return NextResponse.json(
				{
					success: false,
					error: "Invalid credentials",
					code: errorCodes.INVALID_CREDENTIALS,
				},
				{ status: 400 },
			);
		}

		const registrar = new RegistrarClient();
		const schedule = await registrar.sync(username, password);

		return NextResponse.json({ success: true, schedule });
	} catch (error) {
		console.error("Error:", error);
		if (error instanceof ApiError) {
			return NextResponse.json(
				{
					success: false,
					error: error.message,
					code: error.code,
				},
				{ status: error.status },
			);
		}

		return NextResponse.json(
			{
				success: false,
				error: "An unexpected error occurred",
				code: errorCodes.SERVER_ERROR,
			},
			{ status: 500 },
		);
	}
}
