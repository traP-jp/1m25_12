"use server";

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

type Params = {
	id: string;
};

export default async function UserPage({ params }: { params: Promise<Params> }) {
	const { id } = await params;

	const {
		authors,
		channelId,
		name,
		description,
		updatedAt: updatedAt0,
	} = await prisma.work
		.findUniqueOrThrow({
			where: { id, deletedAt: null },
			include: { tags: true, authors: true },
		})
		.catch(notFound);

	const path = await getChannelPath(channelId);

	const { content, updatedAt: updatedAt1 } = await getMessage(id).catch(notFound);

	const updatedAt = new Date(Math.max(updatedAt0.getTime(), updatedAt1.getTime()));

	const files = extractFiles(content);

	const fileId = await traqClient.users
		.getUser(authors[0].id ?? "")
		.then(async response => ({
			key: id,
			...((await response.json()) as UserDetail),
		}))
		.catch(() => ({
			key: id,
			id,
			name,
			displayName: "",
			iconFileId: "",
			createdAt: new Date(),
		}));

	const imagesWithDimensions = await Promise.all(
		files.map(async fileId => {
			const { width, height } = await getImageSize(fileId);
			const filepath = await getFilePath(fileId);
			console.log(`aiueo${filepath}`);
			return { id: fileId, width, height, filepath };
		})
	);

	return (
		<div className="flex min-h-screen flex-col md:flex-row gap-1">
			{/* 2. 左側の要素: flex-1で幅を均等に分ける */}
			<div className="flex flex-col flex-3  bg-gray-50 dark:bg-gray-900 rounded-sm">
				<div className="   rounded-t-sm rounded-b-none  bg-blue-50  dark:bg-gray-700 ">
					<ImageGallery
						filepaths={imagesWithDimensions.map(img => img.filepath)}
						width={imagesWithDimensions.map(img => img.width ?? 0)}
						height={imagesWithDimensions.map(img => img.height ?? 0)}
					/>
				</div>
				<p className="text-xs text-gray-500 dark:text-gray-200">{`最終更新：${updatedAt.toLocaleString()}`}</p>
				<div className=" flex flex-row justify-end gap-2 p-2 ">
					<Button
						isIconOnly
						size="md"
						variant={undefined} // 背景を少しつけるスタイル
						aria-label="Add tag" // スクリーンリーダー用の説明
						className="mr-2 text-gray-900 dark:hover:text-pink-400 dark:text-white hover:text-pink-400"
					>
						{/* いいねされているときはi-material-symbols-favoriteにしてほしい */}
						<span className="i-material-symbols-favorite-outline text-lg"></span>
					</Button>
					<Button
						isIconOnly
						size="md"
						variant={undefined} // 背景を少しつけるスタイル
						aria-label="Add tag" // スクリーンリーダー用の説明
						className="mr-2 text-gray-900 dark:text-white  dark:hover:text-blue-300  hover:text-blue-300"
					>
						<span className="i-material-symbols-download text-lg"></span>
					</Button>
				</div>
				<div className="gap-2 flex flex-col ml-4 mr-4">
					<h1 className="text-lg font-bold">{name}</h1>
					<Link
						href={`https://q.trap.jp/channels/${path}`}
						size="sm"
						className="text-base"
					>
						#{path}
					</Link>
					<p className="text-sm">{description ?? content}</p>
					<div className="flex flex-wrap items-center">
						<Link
							href="https://q.trap.jp/channels/team/graphics/progress"
							size="sm"
							className="!font-light !text-shadow-black !text-white bg-[#839404]/80 p-2 rounded-md "
						>
							#イラスト
						</Link>

						<Button
							isIconOnly
							size="sm"
							variant={undefined}
							aria-label="Add tag"
							className="text-gray-600 dark:text-blue-400 hover:text-orange-300 dark:hover:text-orange-300"
						>
							<span className="i-material-symbols-add text-lg"></span>
						</Button>
					</div>
					<Divider className="my-4 px-4" />
					<div className="flex flex-col gap-2 p-4">
						<h4 className="font-bold">投稿者</h4>
						<div className="flex flex-row items-center gap-2">
							<TrapIcon
								fileId={fileId.iconFileId}
								alt={fileId.displayName}
							/>

							{await Promise.all(
								authors.map(async ({ id, name }) => {
									const { displayName } = await getUserInfo(id);
									return (
										<div key={id}>
											<span>{displayName}</span>
											<br />
											<span className="text-gray-500">@{name}</span>
										</div>
									);
								})
							)}

							<Button
								size="md"
								radius="full"
								color="secondary"
								className="ml-auto"
							>
								<span className="i-material-symbols-bookmark-outline"></span>
								{/* ブックマークされているときはi-material-symbols-bookmarkにしてほしい */}
								ブックマーク
							</Button>
						</div>
					</div>
				</div>
			</div>

			{/* 3. 右側の要素: こちらもflex-1で幅を均等に分ける */}
			<div className="sticky top-4 flex flex-2 flex-col items-start justify-start bg-gray-50  dark:bg-gray-900 p-8 rounded-sm h-auto">
				{/* ここでが送信フォーム */}
				<ReviewForm />
				<Divider className="my-2" />
				<div className="flex flex-col gap-2 w-full overflow-y-auto">
					<div className="flex flex-col w-full">
						<h2 className="font-semibold text-lg">Good</h2>
						<p className="text-gray-700 dark:text-gray-50 p-3 ">
							レビューが表示されます
						</p>
						<p className="text-xs text-gray-500 dark:text-gray-200 ml-auto">
							投稿日: 2025/5/2 22:55
						</p>
						<Divider className="my-2" />
					</div>
					<div className="flex flex-col w-full">
						<h2 className="font-semibold text-lg">Good</h2>
						<p className="text-gray-700 dark:text-gray-50 p-3 ">
							レビューが表示されます
						</p>
						<p className="text-xs text-gray-500 dark:text-gray-200 ml-auto">
							投稿日: 2025/5/2 22:55
						</p>
						<Divider className="my-2" />
					</div>
					<div className="flex flex-col w-full">
						<h2 className="font-semibold text-lg">Good</h2>
						<p className="text-gray-700 dark:text-gray-50 p-3 ">
							レビューが表示されます
						</p>
						<p className="text-xs text-gray-500 dark:text-gray-200 ml-auto">
							投稿日: 2025/5/2 22:55
						</p>
						<Divider className="my-2" />
					</div>
					<div className="flex flex-col w-full">
						<h2 className="font-semibold text-lg">Good</h2>
						<p className="text-gray-700 dark:text-gray-50 p-3 ">
							レビューが表示されます
						</p>
						<p className="text-xs text-gray-500 dark:text-gray-200 ml-auto">
							投稿日: 2025/5/2 22:55
						</p>
						<Divider className="my-2" />
					</div>
					<div className="flex flex-col w-full">
						<h2 className="font-semibold text-lg">Good</h2>
						<p className="text-gray-700 dark:text-gray-50 p-3 ">
							レビューが表示されます
						</p>
						<p className="text-xs text-gray-500 dark:text-gray-200 ml-auto">
							投稿日: 2025/5/2 22:55
						</p>
						<Divider className="my-2" />
					</div>
					<div className="flex flex-col w-full">
						<h2 className="font-semibold text-lg">Good</h2>
						<p className="text-gray-700 dark:text-gray-50 p-3 ">
							レビューが表示されます
						</p>
						<p className="text-xs text-gray-500 dark:text-gray-200 ml-auto">
							投稿日: 2025/5/2 22:55
						</p>
						<Divider className="my-2" />
					</div>
					<div className="flex flex-col w-full">
						<h2 className="font-semibold text-lg">Good</h2>
						<p className="text-gray-700 dark:text-gray-50 p-3 ">
							レビューが表示されます
						</p>
						<p className="text-xs text-gray-500 dark:text-gray-200 ml-auto">
							投稿日: 2025/5/2 22:55
						</p>
						<Divider className="my-2" />
					</div>
					<div className="flex flex-col w-full">
						<h2 className="font-semibold text-lg">Good</h2>
						<p className="text-gray-700 dark:text-gray-50 p-3 ">
							レビューが表示されます
						</p>
						<p className="text-xs text-gray-500 dark:text-gray-200 ml-auto">
							投稿日: 2025/5/2 22:55
						</p>
						<Divider className="my-2" />
					</div>
					<div className="flex flex-col w-full">
						<h2 className="font-semibold text-lg">Good</h2>
						<p className="text-gray-700 dark:text-gray-50 p-3 ">
							レビューが表示されます
						</p>
						<p className="text-xs text-gray-500 dark:text-gray-200 ml-auto">
							投稿日: 2025/5/2 22:55
						</p>
						<Divider className="my-2" />
					</div>
					<div className="flex flex-col w-full">
						<h2 className="font-semibold text-lg">Good</h2>
						<p className="text-gray-700 dark:text-gray-50 p-3 ">
							レビューが表示されます
						</p>
						<p className="text-xs text-gray-500 dark:text-gray-200 ml-auto">
							投稿日: 2025/5/2 22:55
						</p>
						<Divider className="my-2" />
					</div>
					<div className="flex flex-col w-full">
						<h2 className="font-semibold text-lg">Good</h2>
						<p className="text-gray-700 dark:text-gray-50 p-3 ">
							レビューが表示されます
						</p>
						<p className="text-xs text-gray-500 dark:text-gray-200 ml-auto">
							投稿日: 2025/5/2 22:55
						</p>
						<Divider className="my-2" />
					</div>
					<div className="flex flex-col w-full">
						<h2 className="font-semibold text-lg">Good</h2>
						<p className="text-gray-700 dark:text-gray-50 p-3 ">
							レビューが表示されます
						</p>
						<p className="text-xs text-gray-500 dark:text-gray-200 ml-auto">
							投稿日: 2025/5/2 22:55
						</p>
						<Divider className="my-2" />
					</div>
				</div>
			</div>
		</div>
	);
}
