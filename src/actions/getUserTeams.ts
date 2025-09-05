import { getUserInfo } from "./traq/users";
// import { getGroup } from "./traq/groups";
// import { use } from "react";

export async function getUserTeams(userId: string) {
	const user_groups: string[] = [];
	user_groups.push(...(await getUserInfo(userId)).groups);
	return user_groups;
}
