"use server";

import { prisma } from "@/lib/prisma";
import { getChannelStats } from "./traq/channels";
import { Category } from "@/generated/prisma";
import { Message } from "traq-bot-ts";
import { traqClient } from "@/lib/traq";

const limitMax = 50;

export async function loadWorks(formData: FormData | string) {
	const channelId =
		typeof formData === "string" ? formData : (formData.get("channel_id") as string);

	await prisma.channel.upsert({
		where: { id: channelId },
		update: {},
		create: { id: channelId },
	});

	const { totalMessageCount } = await getChannelStats(channelId);

	await [...Array(Math.ceil(totalMessageCount / limitMax)).keys()].reduce(
		(promise, index) =>
			promise.then(async () => {
				const messages = await traqClient.channels
					.getMessages(channelId, { limit: limitMax, offset: index * limitMax })
					.then(res => res.json() as Promise<Message[]>);

				await prisma.userChannel.createMany({
					data: messages.map(({ userId }) => ({ channelId, ownerId: userId })),
					skipDuplicates: true,
				});

				await prisma.work.createMany({
					data: messages.map(({ id, userId, createdAt, updatedAt }) => ({
						id,
						category: Category.OTHERS,
						viewCount: 0,
						allowReviews: false,
						createdAt: new Date(createdAt),
						updatedAt: new Date(updatedAt),
						channelId,
						authorId: userId,
					})),
					skipDuplicates: true,
				});
			}),
		Promise.resolve()
	);
}
