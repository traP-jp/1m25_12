"use server";

import { Review } from "@/generated/prisma";
import { prisma } from "@/lib/prisma";

export async function postReview(data: Review) {
    await prisma.review.create({data});
}

export async function updateReview(data: Review) {
    await prisma.review.update({
        where: { id: data.id },
        data,
    });
}
