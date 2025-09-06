"use client";

import { Button } from "@heroui/button";
import { likeWork, UnlikeWork } from "@/actions/likedWorks";
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
			className={
				liked
					? "mr-2 hover:text-pink-600 text-pink-400"
					: "mr-2 text-gray-900 dark:hover:text-pink-400 dark:text-white hover:text-pink-400"
			}
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
			<span
				className={
					liked
						? "i-material-symbols-favorite text-lg"
						: "i-material-symbols-favorite-outline text-lg"
				}
			></span>
		</Button>
	);
}
