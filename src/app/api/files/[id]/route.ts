import { getFileBlob } from "@/actions/traq/getFileBlob";
import { getFileMeta } from "@/actions/traq/getFileMeta";
import { notFound } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

type Params = {
	id: string;
};

export async function GET(request: NextRequest, { params }: { params: Promise<Params> }) {
	const headers = request.headers;
	const { id } = await params;

	headers.set(
		"Content-Type",
		await getFileMeta(id)
			.then(meta => meta.mime)
			.catch(notFound)
	);

	return new NextResponse(
		await getFileBlob(id)
			.then(blob => blob.stream())
			.catch(notFound),
		{
			headers,
		}
	);
}
