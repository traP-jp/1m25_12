"use server";

import { Review } from "@/generated/prisma";
import { prisma } from "@/lib/prisma";

export async function postReview(
    authorId: string,
    workId: string,
    type: "GOOD" | "MORE", // enum ReviewType の値
    contents: string
) {
    return await prisma.review.create({
    data: {
      authorId,
      workId,
      type,
      contents,
    },
  });
}

export async function updateReview(data: Review) {
    await prisma.review.update({
        where: { id: data.id },
        data,
    });
}
