
import { getChannelPath } from "@/actions/traq/channels";
import { getMessage } from "@/actions/traq/messages";
import { prisma } from "@/lib/prisma";
import { UserDetail } from "traq-bot-ts";
import { title } from "@/components/primitives";
import WorkList from "@/components/WorkList";
import { extractFiles } from "@/lib/utils";
import { traqClient } from "@/lib/traq";
import { notFound } from "next/navigation";
import { getFileMeta } from "@/actions/traq/getFileMeta";
import Link from "next/dist/client/link";
import { Image } from "@heroui/image";


const PAGE_SIZE = 4; // 1ページあたりの表示件数


export default async function Home() {

	const channelIds: { name: string; id: string }[] = [
		{ name: "Graphics", id: "858ae414-21ec-40d8-be6a-012620db8edf" },
		{ name: "Sound", id: "8bd9e07a-2c6a-49e6-9961-4f88e83b4918" },
		{ name: "Game Development", id: "cde0fe1b-f225-415a-b302-0c7a7ab754e2" },
		{ name: "CTF", id: "7dc7d0e1-a7b9-4294-ba3e-1149a4c42c71" },
		{ name: "SysAd", id: "112446e4-a8b5-4618-9813-75f08377ccc5" },
		{ name: "Algorithms", id: "9e822ec2-634e-4b9c-af30-41707f537426" },
	];

	const channeldetail = await Promise.all(
		channelIds.map(async channel => {
			const path = await getChannelPath(channel.id);
			const worksRaw = await prisma.work.findMany({
				where: { channelId: channel.id },
				take: PAGE_SIZE,
			orderBy: {
				createdAt: "desc", // 新しい順に取得 (toReversed()の代替)
			},
			include: {
				author: true, // 関連するauthorを同時に取得
				// tags: true, // もしtagsも必要ならここに追加
			},
		})
		const worksdetail = await Promise.all(
			worksRaw.map(async work => {
				const { content } = await getMessage(work.id).catch(notFound);

				const files = await extractFiles(content);

				const fileid = files;

				const author = await traqClient.users
					.getUser(work.author.id ?? "")
					.then(async response => ({
						key: work.id,
						...((await response.json()) as UserDetail),
					}))
					.catch(() => ({
						key: work.id,
						name: "",
						displayName: "",
						iconFileId: "",
						createdAt: new Date(),
					}));

				const iconfileid = author.iconFileId;
				// console.log(fileid);
				const fileInfos: { fileInfo: FileInfo; extension: string }[] = (
					await Promise.all(
						fileid.map(async fileid => {
							const fileInfo = await getFileMeta(fileid);
							if (fileInfo !== null) {
								const extension = fileInfo.name
									? (fileInfo.name.split(".").pop()?.toLowerCase() ?? "")
									: "";
								return { fileInfo, extension };
							}
							return undefined;
						})
					)
				).filter(
					(item): item is { fileInfo: FileInfo; extension: string } => item !== undefined
				);

				// console.log(fileInfos);
				return { work, fileid, iconfileid, content, fileInfos };
			})
		);

		return { path, channeldetails: worksdetail };
	}));

	const topworkdetail = await prisma.work.findMany({
		take: 5,
		orderBy: {
			createdAt: "desc", // 新しい順に取得 (toReversed()の代替)
		},
		include: {
			author: true, // 関連するauthorを同時に取得
			// tags: true, // もしtagsも必要ならここに追加
		},
	});

	return (
		<div className="space-y-10">
			{channeldetail.map(({ path, channeldetails}) => (
				<div key={path} className="rounded-4xl bg-gray-100/40 dark:bg-gray-800/80 px-4 py-8 m-12 text-gray-800 dark:text-white">
					<div className="flex flex-row items-center p-2 mb-4 justify-between w-full">
						<h2 className="text-2xl font-semibold mx-auto">#{path}の最新作品</h2>
						<Link href={`/channels/${path}`}>
							作品一覧
							<span className="i-material-symbols-arrow_forward  ml-1">→</span>
						</Link>
					</div>
					<WorkList workdetails={channeldetails} />
				</div>
			))}
		</div>
	);
}

