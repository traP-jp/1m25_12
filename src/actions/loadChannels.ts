"use server";

import { prisma } from "@/lib/prisma";
import { traqClient } from "@/lib/traq";
import { Channel } from "traq-bot-ts";

export async function loadChannels() {
	const channels = await traqClient.channels
		.getChannels()
		.then(res => res.json() as Promise<Channel[]>);
	await prisma.channel.deleteMany({});
	await prisma.channel.createMany({
		data: channels.map(({ id, name, children }) => ({
			id,
			name,
			children,
		})),
	});
}
