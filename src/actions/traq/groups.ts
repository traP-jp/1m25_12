"use server";

import { traqClient } from "@/lib/traq";
import { UserGroup } from "traq-bot-ts";

export async function getGroup(groupId: string) {
	return traqClient.groups
		.getUserGroup(groupId)
		.then(async response => response.json() as Promise<UserGroup>);
}
