import { NextResponse } from "next/server";

export async function GET(request: Request) {
	const userId = request.headers.get("X-Forwarded-User");
	return NextResponse.json({ userId });
}
