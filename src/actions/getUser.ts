"use server";

import { traqClient } from "@/lib/traq";
import { User } from "traq-bot-ts";

export async function getUser(userName: string) {
	return traqClient.users.getUsers({ name: userName }).then(async response => {
		const users = await response.json();
		if (users.length !== 1) throw new Error();
		return users[0] as User;
	});
}
