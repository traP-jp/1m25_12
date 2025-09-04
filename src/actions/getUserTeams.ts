import { getUserInfo } from "./traq/users";
import { getGroup } from "./traq/groups";

export async function getUserTeams(userId: string) {
	const { groups } = await getUserInfo(userId);

	return await Promise.all(
		groups.map(async group => {
			const { name } = await getGroup(group);
			return name;
		})
	);
}
