import { traqClient } from "@/lib/traq";
import { notFound, unauthorized } from "next/navigation";
import { NextResponse } from "next/server";

export async function GET(request: NextResponse) {
	const userName = await request.headers.get("X-Forwarded-User");
	if (!userName) unauthorized();

	const userInfo = await traqClient.users
		.getUsers({ name: userName! })
		.then(async response => {
			const users = await response.json();
			if (users.length !== 1) notFound();
			return users[0];
		})
		.catch(notFound);

	return NextResponse.json(userInfo);
}
