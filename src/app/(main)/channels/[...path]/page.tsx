"use server";

import { channelPathToId } from "@/actions/loadChannels";
import ChannelWorks from "@/components/ChannelWorks";

type Params = {
	path: string[];
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
	const { path } = await params;
	const { page } = await searchParams;

	const id = await channelPathToId(path);

	return (
		<ChannelWorks
			path={path}
			id={id}
			page={page}
		/>
	);
}
