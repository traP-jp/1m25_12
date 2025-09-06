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
import { bookmarksWork, UnbookmarkWork } from "@/actions/bookmarkWorks";
import { likeWork, UnlikeWork } from "@/actions/likedWorks";
import { getMe } from "@/actions/getMe";
import { useState } from "react";

type Params = {
	isLiked: boolean;
	id: string;
	userid: string;
};

export default function LikeButton({ isLiked, id, userid }: Params) {
	const [liked, setLiked] = useState(isLiked);

	return (
		<Button
			isIconOnly
			size="md"
			variant={undefined} // 背景を少しつけるスタイル
			aria-label="Add tag" // スクリーンリーダー用の説明
			className={liked ? "mr-2 hover:text-pink-600 text-pink-400" : "mr-2 text-gray-900 dark:hover:text-pink-400 dark:text-white hover:text-pink-400"}
			onPress={async () => {
				if (liked) {
					// Remove like
					await UnlikeWork(id, userid);
					// Update local state
					setLiked(false);
				} else {
					// Add like
					await likeWork(id, userid);
					setLiked(true);
				}
			}}
		>
			{/* いいねされているときはi-material-symbols-favoriteにしてほしい */}
			<span className={liked ? "i-material-symbols-favorite text-lg" : "i-material-symbols-favorite-outline text-lg"}></span>
		</Button>
	);
}
