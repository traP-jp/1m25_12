"use server";

import ChannelWorks from "@/components/ChannelWorks";

type Params = {
	id: string;
};

type SearchParams = {
	page?: number;
};

export default async function ChannelWorksPage({
	params,
	searchParams,
}: {
	params: Promise<Params>;
	searchParams: Promise<SearchParams>;
}) {
	const { id } = await params;
	const { page } = await searchParams;

	return (
		<ChannelWorks
			id={id}
			page={page}
		/>
	);
}
