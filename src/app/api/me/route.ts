import { getUser } from "@/actions/getUser";
import { unauthorized } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
	const userName = await request.headers.get("X-Forwarded-User");
	if (!userName) unauthorized();
	return NextResponse.json(await getUser(userName));
}
