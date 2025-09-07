"use client";

import { Button } from "@heroui/button";
import { likeWork, UnlikeWork } from "@/actions/likedWorks";
import { useState } from "react";
import clsx from "clsx";

type Params = {
	isLiked: boolean;
	id: string;
	userid: string;
	likeCount: number;
};

export default function LikeButton({ isLiked, id, userid, likeCount }: Params) {
	const [liked, setLiked] = useState(isLiked);
	const [likedCount, setLikeCount] = useState(likeCount);

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
					setLikeCount(likedCount - 1); // いいねの数を減らす
				} else {
					// Add like
					await likeWork(id, userid);
					setLiked(true);
					setLikeCount(likedCount + 1); // いいねの数を増やす
				}
			}}
		>
			{/* いいねされているときはi-material-symbols-favoriteにしてほしい */}
			<div className="flex flex-row items-center gap-1">
				<span
					className={
						liked
							? "i-material-symbols-favorite text-lg "
							: "i-material-symbols-favorite-outline text-lg "
					}
				/>
				<span>{likedCount}</span>
			</div>
		</Button>
	);
}
