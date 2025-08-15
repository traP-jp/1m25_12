import { prisma } from "@/lib/prisma";
import { traqClient } from "@/lib/traq";
import { UserDetail } from "traq-bot-ts";
import TraqImage from "./TraqImage";

export default async function UserList() {
	const usersRaw = await prisma.user.findMany();

	const users = await Promise.all(
		usersRaw.map(({ id, name }) => {
			if (!name) return Promise.reject();
			return traqClient.users
				.getUser(name)
				.then(response => response.json() as Promise<UserDetail>)
				.catch(() => ({
					id,
					name,
					displayName: "",
					iconFileId: "",
				}));
		})
	);

	return (
		<div>
			<h2>Users</h2>
			{users.map(({ id, name, displayName, iconFileId }, index) => {
				return (
					<div
						key={index}
						className="flex flex-row gap-2"
					>
						<p>{index}</p>
						<TraqImage
							fileId={iconFileId}
							alt={name}
							height={25}
							width={25}
						/>
						<p>
							{displayName} ({name}) [{id}]
						</p>
					</div>
				);
			})}
		</div>
	);
}
