"use client";

import { getChannelPath } from "@/actions/traq/channels";
import { getMessage } from "@/actions/traq/messages";
import { getUserInfo } from "@/actions/traq/users";
import { extractFiles } from "@/lib/utils";
import { notFound } from "next/navigation";
import { traqClient } from "@/lib/traq";
import { prisma } from "@/lib/prisma";
import { UserDetail } from "traq-bot-ts";
import { Button } from "@heroui/button";
import TrapIcon from "@/components/TrapIcon";
import { Link } from "@heroui/link";
import { Divider } from "@heroui/divider";
import ReviewForm from "@/components/ReViewForm";
import ImageGallery from "@/components/PicturePreview";
import { getImageSize } from "@/actions/traq/getImageSize";
import { getFilePath } from "@/lib/client";
import { bookmarksWork, UnbookmarkWork, isWorkBookmarkedByUser } from "@/actions/bookmarkWorks";
import { getMe } from "@/actions/getMe";
import { useState } from "react";

type Params = {
	isBookmarked: boolean;
	id: string;
	userid: string;
};

export default function BookmarkButton({ isBookmarked, id, userid }: Params) {

    const [bookmarked, setBookmarked] = useState(isBookmarked);

	return (
		<Button
			size="md"
			radius="full"
			color="secondary"
			className="ml-auto"
			onPress={async () => {
				if (bookmarked) {
					// Remove bookmark
					await UnbookmarkWork(id, userid);
					// Update local state
					setBookmarked(false);
				} else {
					// Add bookmark
					await bookmarksWork(id, userid);
					setBookmarked(true);
				}
			}}
		>
			<span
				className={
					bookmarked
						? `i-material-symbols-bookmark text-lg`
						: `i-material-symbols-bookmark-outline text-lg`
				}
			></span>
			{bookmarked ? "ブックマーク済み" : "ブックマーク"}
			
		</Button>
	);
}
