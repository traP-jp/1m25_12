"use server";

import WorkList from "@/components/WorkList";
import { getMessage } from "@/actions/traq/messages";
import { extractFiles } from "@/lib/utils";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { FileInfo } from "traq-bot-ts";
import { title } from "@/components/primitives";
import Pagination from "@/components/WorkList_Pagination_Channel";
import { redirect } from "next/navigation";
import { getFileMeta } from "@/actions/traq/getFileMeta";
import { Link } from "./Link";
import { getUserInfo } from "@/actions/traq/users";

type Props = {
	path: string[];
	id: string;
	page?: number;
};

const PAGE_SIZE = 20; // 1ページあたりの表示件数

export default async function ChannelWorks({ path, id, page }: Props) {
	const pathString = path.join("/");

	if (!page) {
		redirect(`/channels/${pathString}?page=1`);
	}

	const currentPage = Number(page) || 1;

	// 単一のクエリで必要なデータをすべて取得 (N+1問題の解決)
	const [totalWorks, worksRaw] = await Promise.all([
		prisma.work.count({ where: { channelId: id } }),
		prisma.work.findMany({
			where: { channelId: id },
			take: PAGE_SIZE,
			skip: (currentPage - 1) * PAGE_SIZE,
			orderBy: {
				createdAt: "desc", // 新しい順に取得 (toReversed()の代替)
			},
			include: {
				author: true, // 関連するauthorを同時に取得
				// tags: true, // もしtagsも必要ならここに追加
			},
		}),
	]);

	const totalPages = Math.ceil(totalWorks / PAGE_SIZE);

	const workDetails = await Promise.all(
		worksRaw.map(async work => {
			const { content } = await getMessage(work.id).catch(notFound);
			const author = await getUserInfo(work.authorId).catch(notFound);

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
				(item): item is { fileInfo: FileInfo; extension: string } => item !== undefined
			);
			return { work, fileid, author, content, fileInfos };
		})
	);

	return (
		<section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
			<div className="mb-2">
				<h2 className={title({ size: "sm" })}>
					<Link
						className={title({ size: "sm" })}
						href={`https://q.trap.jp/channels/${pathString}`}
					>
						#{pathString}
					</Link>{" "}
					の作品
				</h2>
			</div>
			<Pagination totalPages={totalPages} />
			<WorkList workDetails={workDetails} />
			<Pagination totalPages={totalPages} />
		</section>
	);
}
