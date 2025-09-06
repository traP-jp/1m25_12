"use client";

import { useState } from "react";
import { Button } from "@heroui/button";

import { Textarea } from "@heroui/input";
import { Autocomplete, AutocompleteItem } from "@heroui/autocomplete";
import { postReview } from "@/actions/postReview";
import { Review } from "@/generated/prisma";
import { getMe } from "@/actions/getMe";

// --- Icon Components ---
function SendIcon() {
	return <span className="i-material-symbols-send"></span>;
}

// このコンポーネントは作品IDなどをpropsで受け取ることができる
// interface ReviewFormProps {
//   workId: string;
// }

export default function ReviewForm({ userid, workid }: { userid: string; workid: string }) {
	const [comment, setComment] = useState("");
	const [evaluation, setEvaluation] = useState<string | null>(null);

	const handleSubmit = () => {
		// フォームが有効な場合のみ実行
		if (!comment || !evaluation) return;

		postReview(userid, workid, evaluation.toUpperCase() as "GOOD" | "MORE", comment);

		// 送信後にフォームをクリア
		setComment("");
		setEvaluation(null);
	};

	const evaluates = [
		{ label: "Good", value: "good", color: "bg-blue-400" },
		{ label: "More", value: "more", color: "bg-pink-400" },
	];

	return (
		<div className="flex w-full flex-col items-start gap-4">
			<h1 className="text-2xl font-bold">レビュー</h1>
			<div className="flex w-full flex-col gap-2">
				<Autocomplete
					label="レビューの種類"
					className="max-w-xs"
					color={evaluation === "more" ? "danger" : "primary"}
					onSelectionChange={key => setEvaluation(key as string)}
				>
					{evaluates.map(item => (
						<AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>
					))}
				</Autocomplete>
				<div className="flex items-center gap-2">
					<Textarea
						isClearable
						className="flex-1"
						placeholder="レビューを入力してください"
						variant="flat"
						value={comment}
						onValueChange={setComment}
					/>
					<Button
						size="md"
						radius="full"
						color="secondary"
						startContent={<SendIcon />}
						onPress={handleSubmit}
						isDisabled={!comment || !evaluation}
					>
						送信
					</Button>
				</div>
			</div>
		</div>
	);
}
