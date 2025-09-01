"use server";

import { traqClient } from "@/lib/traq";
import { User, UserDetail } from "traq-bot-ts";

export async function getUser(userName: string) {
	return traqClient.users.getUsers({ name: userName }).then(async response => {
		const users = await response.json();
		if (users.length !== 1) throw new Error();
		return users[0] as User;
	});
}

export async function getUsers({ includeSuspended = false } = {}) {
	return traqClient.users.getUsers({ "include-suspended": includeSuspended }).then(response => {
		return response.json() as Promise<User[]>;
	});
}

export async function getUserInfo(id: string) {
	return traqClient.users
		.getUser(id)
		.then(async response => response.json() as Promise<UserDetail>);
}
