"use server";

import { prisma } from "@/lib/prisma";
import { getUsers } from "./traq/users";

export async function loadUsers() {
	const users = await getUsers({ includeSuspended: true });
	await prisma.user.deleteMany({});
	await prisma.user.createMany({
		data: users.map(({ id, name, updatedAt }) => ({
			id,
			name,
			updatedAt: new Date(updatedAt),
		})),
	});
}
