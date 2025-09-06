"use server";

import { getChannelPath } from "@/actions/traq/channels";
import { getMessage } from "@/actions/traq/messages";
import { getUserInfo } from "@/actions/traq/users";
import { extractFiles } from "@/lib/utils";
import { notFound } from "next/navigation";
import { traqClient } from "@/lib/traq";
import { prisma } from "@/lib/prisma";
import { FileInfo, UserDetail } from "traq-bot-ts";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import { Divider } from "@heroui/divider";
import ReviewForm from "@/components/ReViewForm";
import ImageGallery from "@/components/PicturePreview";
import { getImageSize } from "@/actions/traq/getImageSize";
import { getFilePath } from "@/lib/client";
import { bookmarksWork, UnbookmarkWork, isWorkBookmarkedByUser } from "@/actions/bookmarkWorks";
import { isWorkLikedByUser } from "@/actions/likedWorks";
import { getMe } from "@/actions/getMe";
import BookmarkButton from "@/components/BookmarkButton";
import LikeButton from "@/components/LikeButton";
import TraqAvater from "@/components/TraqAvater";
import { $Enums, ReviewType } from "@/generated/prisma";

type Params = {
	id: string;
};

export default async function UserPage({ params }: { params: Promise<Params> }) {
	const { id } = await params;

	const {
		author,
		channelId,
		name,
		description,
		updatedAt: updatedAt0,
	} = await prisma.work
		.findUniqueOrThrow({
			where: { id, deletedAt: null },
			include: { tags: true, author: true },
		})
		.catch(notFound);

	const path = await getChannelPath(channelId);

	const { content, updatedAt: updatedAt1 } = await getMessage(id).catch(notFound);

	const updatedAt = new Date(Math.max(updatedAt0.getTime(), updatedAt1.getTime()));

	const files = extractFiles(content);

	const authorInfo = await traqClient.users
		.getUser(author.id ?? "")
		.then(async response => ({
			key: id,
			...((await response.json()) as UserDetail),
		}))
		.catch(() => ({
			key: id,
			id,
			name: author.name,
			displayName: "",
			iconFileId: "",
			createdAt: new Date(),
		}));

	const imagesWithDimensions = await Promise.all(
		files.map(async fileId => {
			const { width, height } = await getImageSize(fileId);
			const filepath = await getFilePath(fileId);
			const blurredFilePath = await getFilePath(fileId, { thumbnail: true });
			return { id: fileId, width, height, filepath, blurredFilePath };
		})
	);

	const userme = await getMe();
	const isBookmarked = await isWorkBookmarkedByUser(id, userme.id);
	const isLiked = await isWorkLikedByUser(id, userme.id);

	const fileInfos: FileInfo[] = await Promise.all(
		files.map(async fileid => {
			const fileInfo = await traqClient.files.getFileMeta(fileid).then(res => res.json());
			return fileInfo;
		})
	);

	const reviews = await prisma.review.findMany({
		where: { workId: id },
		orderBy: { updatedAt: "desc" },
	});

	return (
		<div className="flex min-h-screen flex-col md:flex-row gap-1">
			{/* 2. 左側の要素: flex-1で幅を均等に分ける */}
			<div className="flex flex-col flex-3  bg-gray-50 dark:bg-gray-900 rounded-sm">
				<div className="rounded-t-sm rounded-b-none  bg-blue-50  dark:bg-gray-700 ">
					<ImageGallery
						filepaths={imagesWithDimensions.map(({ filepath }) => filepath)}
						blurredFilePaths={imagesWithDimensions.map(
							({ blurredFilePath }) => blurredFilePath
						)}
						width={imagesWithDimensions.map(({ width }) => width ?? 0)}
						height={imagesWithDimensions.map(({ height }) => height ?? 0)}
					/>
				</div>
				<p className="text-xs text-gray-500 dark:text-gray-200">{`最終更新：${updatedAt.toLocaleString()}`}</p>
				<div className=" flex flex-row justify-end gap-2 p-2 ">
					<LikeButton
						isLiked={isLiked}
						id={id}
						userid={userme.id}
					/>
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
							<TraqAvatar
								username={authorInfo.name}
								alt={authorInfo.displayName}
								size="lg"
							/>

							{await Promise.all(
								author.map(async ({ id, name }) => {
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

							<BookmarkButton
								isBookmarked={isBookmarked}
								id={id}
								userid={userme.id}
							/>
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
					{reviews.map(({ type, contents, updatedAt }) => (
						<div
							className="flex flex-col w-full"
							key={updatedAt.toString()}
						>
							<h2 className="font-semibold text-lg">
								{type === ReviewType.GOOD ? "Good" : "More"}
							</h2>
							<p className="text-gray-700 dark:text-gray-50 p-3 ">{contents}</p>
							<p className="text-xs text-gray-500 dark:text-gray-200 ml-auto">
								投稿日: {updatedAt.toLocaleString()}
							</p>
							<Divider className="my-2" />
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
