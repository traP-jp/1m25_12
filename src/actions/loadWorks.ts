"use server";

import { Category } from "@/lib/models";
import { prisma } from "@/lib/prisma";
import { getChannelMessages } from "./traq/channels";

export async function loadWorks(formData: FormData) {
	const channelId = formData.get("channel_id") as string;
	const messages = await getChannelMessages(channelId);

	await prisma.channel.upsert({
		where: { id: channelId },
		update: {},
		create: { id: channelId },
	});

	await prisma.$transaction(
		messages
			.map(({ id, userId, createdAt, updatedAt }) => [
				prisma.userChannel.upsert({
					where: { channelId_ownerId: { channelId, ownerId: userId } },
					update: {},
					create: { channelId, ownerId: userId },
				}),
				prisma.work.upsert({
					where: { id },
					update: {},
					create: {
						id,
						category: Category.OTHERS,
						viewCount: 0,
						allowReviews: false,
						createdAt: new Date(createdAt),
						updatedAt: new Date(updatedAt),
						channel: { connect: { id: channelId } },
						authors: { connect: [{ id: userId }] },
					},
				}),
			])
			.flat()
	);
}
