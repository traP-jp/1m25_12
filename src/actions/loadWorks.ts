"use server";

import { prisma } from "@/lib/prisma";
import { getChannelMessages } from "./traq/channels";
import { Category } from "@/generated/prisma";

export async function loadWorks(formData: FormData | string) {
	const channelId =
		typeof formData === "string" ? formData : (formData.get("channel_id") as string);

	const messages = await getChannelMessages(channelId);

	await prisma.channel.upsert({
		where: { id: channelId },
		update: {},
		create: { id: channelId },
	});

	await prisma.userChannel.createMany({
		data: messages.map(({ channelId, userId }) => ({ channelId, ownerId: userId })),
		skipDuplicates: true,
	});

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
}
