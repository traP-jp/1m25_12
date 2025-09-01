"use server";

import { prisma } from "@/lib/prisma";
import { getUsers } from "./traq/users";

export async function loadUsers() {
	const users = await getUsers({ includeSuspended: true });

	await prisma.$transaction(
		users
			.map(({ id, name, updatedAt }) => ({
				id,
				name,
				updatedAt: new Date(updatedAt),
			}))
			.map(({ id, name, updatedAt }) =>
				prisma.user.upsert({
					where: { id },
					update: { name, updatedAt },
					create: { id, name, updatedAt },
				})
			)
	);
}
