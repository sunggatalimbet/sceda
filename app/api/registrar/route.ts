// app/api/schedule/route.ts
import { RegistrarClient } from "@/app/utils/registrar";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
	try {
		const body = await req.json();
		const { username, password } = body;

		if (!username || !password) {
			return NextResponse.json(
				{ error: "Invalid credentials" },
				{ status: 400 },
			);
		}

		const registrar = new RegistrarClient();
		const schedule = await registrar.sync(username, password);

		return NextResponse.json({ success: true, schedule });
	} catch (error) {
		console.error("Error:", error);
		return NextResponse.json(
			{
				success: false,
				error: (error as Error).message,
			},
			{ status: 500 },
		);
	}
}
