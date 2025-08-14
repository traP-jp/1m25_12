import { NextRequest, NextResponse } from "next/server";

// Prisma Clientのインスタンスをインポート
import prisma from "@/lib/prisma";

export async function GET() {
	const userArray = await prisma.user.findMany();
	return NextResponse.json(userArray);
}

export async function POST(req: NextRequest) {
	const { name } = await req.json();

	const res = await prisma.user.create({
		data: { name },
	});

	return NextResponse.json(res);
}
