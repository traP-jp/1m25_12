"use server";

import { traqClient } from "@/lib/traq";
import { Channel, ChannelStats, Message } from "traq-bot-ts";

export async function getChannel(channelId: string) {
	return traqClient.channels
		.getChannel(channelId)
		.then(response => response.json() as Promise<Channel>);
}

export async function getChannelPath(channelId: string) {
	return traqClient
		.request<{ path: string }, void>({
			path: `/channels/${channelId}/path`,
			method: "GET",
			secure: true,
			format: "json",
		})
		.then(response => response.json().then(({ path }) => path as string));
}

export async function getChannelStats(channelId: string) {
	return traqClient.channels
		.getChannelStats(channelId)
		.then(response => response.json() as Promise<ChannelStats>);
}

const limitMax = 200;

export async function getChannelMessages(channelId: string) {
	const { totalMessageCount } = await getChannelStats(channelId);
	return Promise.all(
		[...Array(Math.ceil(totalMessageCount / limitMax)).keys()].map(index =>
			traqClient.channels
				.getMessages(channelId, { limit: limitMax, offset: index * limitMax })
				.then(res => res.json() as Promise<Message[]>)
		)
	).then(pages => pages.flat(1));
}
