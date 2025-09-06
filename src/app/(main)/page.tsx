import { getChannelPath } from "@/actions/traq/channels";
import { getMessage } from "@/actions/traq/messages";
import { prisma } from "@/lib/prisma";
import { FileInfo } from "traq-bot-ts";
import WorkList from "@/components/WorkList";
import { extractFiles } from "@/lib/utils";
import { notFound } from "next/navigation";
import { getFileMeta } from "@/actions/traq/getFileMeta";
import { TEAM_LIST } from "@/lib/constants";
import { Link } from "@/components/Link";

const PAGE_SIZE = 4; // 1ページあたりの表示件数

export default async function Home() {
	const channelDetails = await Promise.all(
		TEAM_LIST.map(async ({ id, channelId }) => {
			const path = await getChannelPath(channelId);
			const worksRaw = await prisma.work.findMany({
				where: { channelId },
				take: PAGE_SIZE,
				orderBy: {
					createdAt: "desc", // 新しい順に取得 (toReversed()の代替)
				},
				include: {
					author: true, // 関連するauthorを同時に取得
					// tags: true, // もしtagsも必要ならここに追加
				},
			});

			const workDetails = await Promise.all(
				worksRaw.map(async work => {
					const { content } = await getMessage(work.id).catch(notFound);

					const fileid = await extractFiles(content);

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
						(item): item is { fileInfo: FileInfo; extension: string } =>
							item !== undefined
					);

					// console.log(fileInfos);
					return { work, fileid, content, fileInfos };
				})
			);

			return { id, path, workDetails };
		})
	);

	const topWorkDetails = await prisma.work.findMany({
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
			{channelDetails.map(({ id, path, workDetails }) => (
				<div
					key={id}
					className="rounded-4xl bg-gray-100/40 dark:bg-gray-800/80 px-4 py-8 m-12 text-gray-800 dark:text-white"
				>
					<div className="flex flex-row items-center p-2 mb-4 justify-between w-full">
						<h2 className="text-2xl font-semibold mx-auto">
							<Link
								className="text-2xl font-semibold mx-auto"
								href={`https://q.trap.jp/channels/${path}`}
							>
								#{path}
							</Link>{" "}
							の最新作品
						</h2>
						<Link href={`/channels/${path}`}>
							作品一覧
							<span className="i-material-symbols-arrow_forward  ml-1">→</span>
						</Link>
					</div>
					<WorkList workDetails={workDetails} />
				</div>
			))}
		</div>
	);
}
