import { getFileBlob } from "@/actions/getFileBlob";
import { notFound } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

type Params = {
	id: string;
};

export async function GET(_: NextRequest, { params }: { params: Promise<Params> }) {
	const { id } = await params;
	return new NextResponse(await getFileBlob(id).catch(notFound));
}
