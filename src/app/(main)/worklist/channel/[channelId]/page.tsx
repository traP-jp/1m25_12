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
import Pagination from '@/components/WorkList_Pagination_Channel';
import { redirect } from "next/navigation";

type PageProps = {
  searchParams: {
    page?: string;
  };
};

type Params = {
    channelId: string;

};

const PAGE_SIZE = 12; // 1ページあたりの表示件数

export default async function WorkPage({ params }: { params: Promise<Params> }) {
    const { channelId } = await params;

    redirect(`/worklist/channel/${channelId}/1`);

}
