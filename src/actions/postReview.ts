"use server";

import { Review } from "@/generated/prisma";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function postReview(
	authorId: string,
	workId: string,
	type: "GOOD" | "MORE", // enum ReviewType の値
	contents: string
) {
	await prisma.review.create({
		data: {
			authorId,
			workId,
			type,
			contents,
		},
	});

	revalidatePath(`/works/${workId}`);
}

export async function updateReview(data: Review) {
	await prisma.review.update({
		where: { id: data.id },
		data,
	});
}
