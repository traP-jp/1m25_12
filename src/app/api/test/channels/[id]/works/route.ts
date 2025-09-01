import { getChannelMessages } from "@/actions/traq/channels";
import { notFound } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

type Params = {
	id: string;
};

export async function GET(request: NextRequest, { params }: { params: Promise<Params> }) {
	const { id } = await params;
	return NextResponse.json(await getChannelMessages(id).catch(notFound));
}
