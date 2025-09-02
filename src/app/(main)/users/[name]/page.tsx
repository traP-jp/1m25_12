"use server";

import { getUser, getUserInfo } from "@/actions/traq/users";
import { getChannelPath } from "@/actions/traq/channels";
import { notFound } from "next/navigation";
import { Avatar } from "@heroui/avatar";
import { getFilePath } from "@/lib/client";
import { prisma } from "@/lib/prisma";
import { Link } from "@/components/Link";
import { WorksTabs } from "@/components/WorksTabs";

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

	return (
		<div>
			<div>
				<div className="mb-3">
					{/* ここから作品戻るリンク */}
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
					{/* ここからユーザー情報 */}
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
							</div>
						</div>
						<div className="w-full break-words">
							<p>{bio.substring(0, 200)}...</p>
						</div>
					</div>
					<div className="max-w-sm flex flex-col gap-4">
						<h2 className="text-xl mt-4">プログレスチャンネル</h2>
						<ul className="flex flex-col">
							{channelPaths.map(path => (
								<li
									className="text-lg"
									key={path}
								>
									{path}
								</li>
							))}
							<h2 className="text-xl">所属チーム</h2>
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
