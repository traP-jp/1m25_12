"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function likeWork(workId: string, userId: string) {
	const work = await prisma.work.findUnique({ where: { id: workId } });
	if (!work) throw new Error("Work not found");

	const user = await prisma.user.findUnique({ where: { id: userId } });
	if (!user) throw new Error("User not found");

	await prisma.work.update({
		where: { id: workId },
		data: {
			likedUsers: {
				connect: { id: userId },
			},
		},
	});

	revalidatePath(`/works/${workId}`);
}

export async function UnlikeWork(workId: string, userId: string) {
	const work = await prisma.work.findUnique({ where: { id: workId } });
	if (!work) throw new Error("Work not found");

	const user = await prisma.user.findUnique({ where: { id: userId } });
	if (!user) throw new Error("User not found");

	await prisma.work.update({
		where: { id: workId },
		data: {
			likedUsers: {
				disconnect: { id: userId }, // ← ここをdisconnectに変更
			},
		},
	});

	revalidatePath(`/works/${workId}`);
}

export async function isWorkLikedByUser(workId: string, userId: string): Promise<boolean> {
	const work = await prisma.work.findUnique({
		where: { id: workId },
		include: {
			likedUsers: {
				where: { id: userId },
				select: { id: true },
			},
		},
	});

	return (work?.likedUsers.length ?? 0) > 0;
}

export async function loadWorkLikes(workId: string) {
	const work = await prisma.work.findUniqueOrThrow({
		where: { id: workId },
		include: {
			likedUsers: true, // ← likedUsersを含めて取得
		},
	});

	return work.likedUsers.length; // likedUsersの配列を返す
}
