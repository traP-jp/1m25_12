"use server";

import WorkList from "@/components/WorkList";
import { getFilePath } from "@/lib/client";
import { getMessage } from "@/actions/traq/messages";
import { extractFiles } from "@/lib/utils";
import { notFound, redirect } from "next/navigation";
import { traqClient } from "@/lib/traq";
import { prisma } from "@/lib/prisma";
import { FileInfo, UserDetail } from "traq-bot-ts";
import Pagination from "@/components/WorkList_Pagination_User";
import { getFileMeta } from "@/actions/traq/getFileMeta";

type Props = {
	id: string;
	name: string;
	page?: number;
};

const PAGE_SIZE = 12; // 1ページあたりの表示件数

export default async function UserWorks({ id, name, page }: Props) {
	if (!page) {
		redirect(`/users/${name}?page=1`);
	}

	const currentPage = Number(page) || 1;

	// 単一のクエリで必要なデータをすべて取得 (N+1問題の解決)
	const [totalWorks, worksRaw] = await Promise.all([
		prisma.work.count({
			where: {
				authorId: id,
			},
		}),
		prisma.work.findMany({
			where: {
				authorId: id,
			},
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

	const worksdetail = await Promise.all(
		worksRaw.map(async work => {
			const { content, updatedAt: updatedAt1 } = await getMessage(work.id).catch(notFound);

			const files = await extractFiles(content);

			const fileid = files;

			const fileId = await traqClient.users
				.getUser(work.author.id ?? "")
				.then(async response => ({
					key: work.id,
					...((await response.json()) as UserDetail),
				}))
				.catch(() => ({
					key: work.id,
					name,
					displayName: "",
					iconFileId: "",
					createdAt: new Date(),
				}));

			const iconfileid = fileId.iconFileId;

			const fileInfos: { fileInfo: FileInfo; extension: string }[] = (
				await Promise.all(
					fileid.map(async fileid => {
						const filepath = await getFilePath(fileid);
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

			return { work, fileid, iconfileid, content, fileInfos };
		})
	);

	return (
		<section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
			<Pagination totalPages={totalPages} />
			<WorkList workdetails={worksdetail} />
			<Pagination totalPages={totalPages} />
		</section>
	);
}
