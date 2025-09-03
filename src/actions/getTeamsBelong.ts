import { getUserInfo } from "./traq/users";
import { getGroup } from "./traq/groups";

export async function getTeamsBelong(userId: string) {
	try {
		const userInfo = await getUserInfo(userId);
		const teamNames = [];
		for (const groupId of userInfo.groups) {
			const teamName = (await getGroup(groupId)).name;
			teamNames.push(teamName);
		}
		return teamNames;
	} catch (error) {
		console.error("Error fetching user belonging teams:", error);
		throw error;
	}
}
