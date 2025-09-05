"use server";

import WorkList from "@/components/WorkList";
import { getFilePath } from "@/lib/client";
import { getChannelPath } from "@/actions/traq/channels";
import { getMessage } from "@/actions/traq/messages";
import { getUserInfo } from "@/actions/traq/users";
import { extractFiles } from "@/lib/utils";
import { notFound } from "next/navigation";
import { traqClient } from "@/lib/traq";
import { prisma } from "@/lib/prisma";
import { UserDetail } from "traq-bot-ts";
import { title } from "@/components/primitives";
import { Work } from "@/generated/prisma";

type Params = {
	channelId: string;
};

export default async function Home({ params }: { params: Promise<Params> }) {
	const { channelId } = await params;

	const path = await getChannelPath(channelId);

	// 単一のクエリで必要なデータをすべて取得 (N+1問題の解決)
    const worksRaw = await prisma.work.findMany({
        where: { channelId: channelId },
        take: 20,
        orderBy: {
            createdAt: 'desc' // 新しい順に取得 (toReversed()の代替)
        },
        include: {
            authors: true, // 関連するauthorsを同時に取得
            // tags: true, // もしtagsも必要ならここに追加
        }
    });
	// console.log(worksRaw);
const worksdetail = await Promise.all(

	worksRaw.map(async (work) => {

const { content, updatedAt: updatedAt1 } = await getMessage(work.id).catch(notFound);

const files = extractFiles(content);

const fileid = files ;

const fileId = await traqClient.users
		.getUser(work.authors[0].id ?? "")
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
// console.log(fileid);
return {work,fileid,iconfileid};

 })
);

console.log(worksdetail);
console.log(worksRaw.length);

	return (
		<section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
			<div className="mb-2">
			<h2 className={title({ size: "sm" })}>{path}の一覧</h2>
			</div>
            <WorkList
			workdetails={worksdetail}
/>
        </section>
	);
}
