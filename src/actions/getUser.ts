"use server";

import { traqClient } from "@/lib/traq";
import { notFound } from "next/navigation";

export async function getUser(userName: string) {
	return traqClient.users
		.getUsers({ name: userName })
		.then(async response => {
			const users = await response.json();
			if (users.length !== 1) notFound();
			return users[0];
		})
		.catch(notFound);
}
