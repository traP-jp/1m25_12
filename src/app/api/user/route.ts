import { NextRequest, NextResponse } from "next/server";
import { addUser } from "@/actions/addUser";

export async function POST(req: NextRequest) {
	const { id } = await req.json();
	addUser(id);
	return NextResponse.json({ success: true });
}
