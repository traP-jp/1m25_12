import { getFileBlob, getThumbnailBlob } from "@/actions/traq/getFileBlob";
import { notFound } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

type Params = {
	id: string;
};

export async function GET(request: NextRequest, { params }: { params: Promise<Params> }) {
	const { id } = await params;
	const thumbnail = Boolean(request.nextUrl.searchParams.get("thumbnail"));

	if (thumbnail) {
		return new NextResponse(
			await getThumbnailBlob(id)
				.then(blob => blob.stream())
				.catch(notFound)
		);
	}

	return new NextResponse(
		await getFileBlob(id)
			.then(blob => blob.stream())
			.catch(notFound)
	);
}

export const config = {
	api: {
		responseLimit: false,
	},
};
