"use client";

import { Button } from "@heroui/button";
import { bookmarksWork, UnbookmarkWork } from "@/actions/bookmarkWorks";
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
