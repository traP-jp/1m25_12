"use server";

import { getUser, getUserInfo } from "@/actions/traq/users";
import { getChannelPath } from "@/actions/traq/channels";
import { notFound } from "next/navigation";
import { Avatar } from "@heroui/avatar";
import { getFilePath } from "@/lib/client";
import { prisma } from "@/lib/prisma";
import { getUserTeams } from "@/actions/getTeamsBelong";

type Params = {
	name: string;
};

export default async function UserPage({ params }: { params: Promise<Params> }) {
	const { name } = await params;
	const { id, displayName, iconFileId } = await getUser(name).catch(notFound);
	const { bio } = await getUserInfo(id).catch(notFound);

	console.log(id);
	const channels = await prisma.userChannel.findMany({
		where: { ownerId: id },
		include: { channel: true },
	});

	const channelPaths = await Promise.all(
		channels.map(channel => getChannelPath(channel.channelId))
	);
	console.log(channelPaths);

	const teams = await getUserTeams(id);

	return (
		<div className="flex gap-8">
			<div className="flex flex-col gap-4">
				<div className="flex flex-row">
					<Avatar
						src={getFilePath(iconFileId)}
						className="w-42 h-42 text-large"
					/>
					<div className="flex flex-col ml-4 justify-center">
						<span className="text-2xl">{displayName}</span>
						<span className="text-xl text-gray-500">@{name}</span>
					</div>
				</div>
				<div>
					<p>{bio}</p>
				</div>
			</div>
			<div>
				<h2 className="text-2xl">チャンネル一覧</h2>
				<ul className="flex flex-col">
					{channelPaths.map(path => (
						<li
							className="text-lg"
							key={path}
						>
							{path}
						</li>
					))}
				</ul>
			</div>
			<div>
				<h2 className="text-2xl">所属チーム一覧</h2>
				<ul className="flex flex-col">
					{teams.map((team, index) => (
						<li key={index}>{team}</li>
					))}
				</ul>
			</div>
		</div>
	);
}
