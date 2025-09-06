"use server";

import { prisma } from "@/lib/prisma";


export async function bookmarksWork(workId: string, userId: string) {
    const work = await prisma.work.findUnique({ where: { id: workId } });
    if (!work) throw new Error("Work not found");

    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new Error("User not found");

    await prisma.work.update({
        where: { id: workId },
        data: {
            bookmarkUsers: {
                connect: { id: userId },
            }
        },
    });
}

export async function UnbookmarkWork(workId: string, userId: string) {
    const work = await prisma.work.findUnique({ where: { id: workId } });
    if (!work) throw new Error("Work not found");

    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new Error("User not found");

    await prisma.work.update({
        where: { id: workId },
        data: {
            bookmarkUsers: {
                disconnect: { id: userId }, // ← ここをdisconnectに変更
            }
        },
    });
}

export async function isWorkBookmarkedByUser(workId: string, userId: string): Promise<boolean> {
    const work = await prisma.work.findUnique({
        where: { id: workId },
        include: {
            bookmarkUsers: {
                where: { id: userId },
                select: { id: true },
            },
        },
    });

    return (work?.bookmarkUsers.length ?? 0) > 0;
}