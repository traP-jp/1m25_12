"use server";

import { headers } from "next/headers";
import { unauthorized } from "next/navigation";
import { getUser } from "./getUser";

export async function getMe() {
	const userName = (await headers()).get("X-Forwarded-User");
	if (!userName) unauthorized();
	return getUser(userName);
}
