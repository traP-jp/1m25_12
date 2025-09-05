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
import Pagination from '@/components/WorkList_Pagination_User';
import { redirect } from "next/navigation";
import { getUser } from "@/actions/traq/users";

type PageProps = {
  searchParams: {
    page?: string;
  };
};

type Params = {
    name: string;
    page:number;
};

const PAGE_SIZE = 12; // 1ページあたりの表示件数

export default async function WorkPage({ params }: { params: Promise<Params> }) {
    const {name,page} = await params;
 
    console.log(name);
    // pageがundefinedやnullの場合は1にリダイレクト
    const user = await getUser(name).catch(notFound);
    if (!user) return; // 念のため
    

    const id = user.id;


    const currentPage = Number(page) || 1;

    // 単一のクエリで必要なデータをすべて取得 (N+1問題の解決)
    const [totalWorks, worksRaw] = await Promise.all([
        prisma.work.count(),
        prisma.work.findMany({
        where: {
    authors: {
      some: {
        id: id
      }
    }
  },
        take: PAGE_SIZE,
        skip: (currentPage - 1) * PAGE_SIZE,
        orderBy: {
            createdAt: 'desc' // 新しい順に取得 (toReversed()の代替)
        },
        include: {
            authors: true, // 関連するauthorsを同時に取得
            // tags: true, // もしtagsも必要ならここに追加
        }
    })
    ]);
    const totalCount = worksRaw.length;

    const totalPages = Math.ceil(totalWorks / PAGE_SIZE);


const worksdetail = await Promise.all(

    worksRaw.map(async (work) => {

const { content, updatedAt: updatedAt1 } = await getMessage(work.id).catch(notFound);

const files = await extractFiles(content);

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
return {work,fileid,iconfileid,content};

 })
);
const userdetail : UserDetail= await getUserInfo(id ?? "");


console.log(worksdetail);
console.log(worksRaw.length);

    return (
        <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
            <div className="mb-2">
            <h2 className={title({ size: "sm" })}>{userdetail.name}の作品一覧</h2>
            </div>
            <WorkList
            workdetails={worksdetail}
            totalcount={totalCount}
            />
            <Pagination totalPages={totalPages}></Pagination>
        </section>
    );
}
