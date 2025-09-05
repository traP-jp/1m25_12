"use server";

import { getUser, getUserInfo } from "@/actions/traq/users";
import { getChannelPath } from "@/actions/traq/channels";
import { notFound } from "next/navigation";
import { Avatar } from "@heroui/avatar";
import { getFilePath } from "@/lib/client";
import { prisma } from "@/lib/prisma";
import { Link } from "@/components/Link";
import { WorksTabs } from "@/components/WorksTabs";
import TeamIcon from "@/components/TeamIcon";
import { getUserTeams } from "@/actions/getUserTeams";

type Params = {
	name: string;
};

export default async function UserPage({ params }: { params: Promise<Params> }) {
	const { name } = await params;
	const { id, displayName, iconFileId } = await getUser(name).catch(notFound);
	const { bio } = await getUserInfo(id).catch(notFound);

	const channels = await prisma.userChannel.findMany({
		where: { ownerId: id },
		include: { channel: true },
	});

	const channelPaths = await Promise.all(
		channels.map(channel => getChannelPath(channel.channelId))
	);

	const userTeamIds = await getUserTeams(id);
	const ALL_TEAMS = [
		{ id: "867b3529-696f-4bd1-af53-1947eba92e77", name: "graphics" },
		{ id: "cb977ab2-85fa-4953-ac4d-809eaef427e6", name: "sound" },
		{ id: "280bf56d-fa22-46bc-8dcc-6367d600d873", name: "algorithm" },
		{ id: "af240e80-8526-4f21-925e-b20eded06284", name: "game" },
		{ id: "ec54d385-e5e7-4554-8aa2-878ebedc9db0", name: "kaggle" },
		{ id: "f86db5ec-dc02-4885-aa0a-732bb229a1b5", name: "sysad" },
		{ id: "c5670065-75d4-4851-bfba-9ff05201fc44", name: "ctf" },
	];

	return (
		<div>
			<div>
				<div className="mb-3">
					<Link
						href="/works"
						className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-5 w-5"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M15 19l-7-7 7-7"
							/>
						</svg>
						<span>作品に戻る</span>
					</Link>
				</div>
				<div className="flex gap-8">
					<div className="w-2/3 flex flex-col justify-start gap-4">
						<div className="flex flex-row">
							<Avatar
								src={getFilePath(iconFileId)}
								className="w-42 h-42 text-large"
							/>
							<div className="flex flex-col ml-4 justify-center">
								<span className="text-2xl">{displayName}</span>
								<span className="text-xl text-gray-500 mb-4">@{name}</span>
							</div>
							<div className="justify-center text-left">
								<span className="text-xl">所属</span>
								<ul className="flex flex-wrap gap-2 mt-2">
									{ALL_TEAMS.map(team => {
										const isMember = userTeamIds.includes(team.id);
										return (
											<li
												key={team.id}
												className={
													isMember
														? ""
														: "grayscale brightness-0 opacity-20"
												}
											>
												<TeamIcon teamName={team.name} />
											</li>
										);
									})}
								</ul>
							</div>
						</div>
						<div className="w-full break-words">
							<p>{bio.length > 200 ? bio.substring(0, 200) + "..." : bio}</p>
						</div>
					</div>
					<div className="max-w-sm flex flex-col gap-4">
						<h2 className="text-xl mt-4">チャンネル一覧</h2>
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
				</div>
			</div>
			<div>
				<WorksTabs />
			</div>
		</div>
	);
}
