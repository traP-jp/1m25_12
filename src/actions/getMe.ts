"use client";

import { client } from "@/lib/client";
import { User } from "traq-bot-ts";

export async function getMe() {
	const user = await client.get("/me");
	return user.data as User;
}
