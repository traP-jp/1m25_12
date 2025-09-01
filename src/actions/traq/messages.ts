"use server";

import { traqClient } from "@/lib/traq";
import { Message } from "traq-bot-ts";

export async function getMessage(id: string) {
	return traqClient.messages
		.getMessage(id)
		.then(response => response.json() as Promise<Message>)
		.then(({ createdAt, updatedAt, ...rest }) => ({
			createdAt: new Date(createdAt),
			updatedAt: new Date(updatedAt),
			...rest,
		}));
}
