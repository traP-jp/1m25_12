import { prisma } from "@/lib/prisma";
import { traqClient } from "@/lib/traq";
import { UserDetail } from "traq-bot-ts";

export default async function UserList() {
	const usersRaw = await prisma.user.findMany();

	const users = await Promise.all(
		usersRaw.map(({ id, name }) => {
			if (!name) return Promise.reject();
			return traqClient.users
				.getUser(name)

				.then(async res => {
					const userDetail = (await res.json()) as UserDetail;

					const file = await traqClient.files
						.getFile(userDetail.iconFileId)
						.then(response => response.arrayBuffer());

					return {
						...userDetail,
						icon: file,
					};
				})
				.catch(() => ({
					id,
					name,
					displayName: "",
					iconFileId: "",
					icon: null,
				}));
		})
	);

	return (
		<div>
			<h2>Users</h2>
			{users.map(({ id, name, displayName }, index) => {
				return (
					<div key={index}>
						<p>
							{displayName} ({name}) [{id}]
						</p>
					</div>
				);
			})}
		</div>
	);
}
