import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
	const { id } = await req.json();

	const res = await prisma.user.create({
		data: { name: id },
	});

	return NextResponse.json(res);
}
