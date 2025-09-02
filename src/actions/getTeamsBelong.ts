import { getUserInfo } from "./traq/users";

export async function getTeamsBelong(userId: string) {
	try {
		const userInfo = await getUserInfo(userId);
		return userInfo.groups;
	} catch (error) {
		console.error("Error fetching user belonging teams:", error);
		throw error;
	}
}
