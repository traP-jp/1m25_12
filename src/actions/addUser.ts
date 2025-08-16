"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function addUser(id: string) {
	await prisma.user.create({
		data: { name: id },
	});

	revalidatePath("/");
}
