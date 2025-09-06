import { Card, CardFooter } from "@heroui/card";
import TraqImage from "./TraqImage";
import { User, Work } from "@/generated/prisma";
import { FileInfo, UserDetail } from "traq-bot-ts";
import TraqAvatar from "./TraqAvatar";
import { Link } from "./Link";
import SoundPreview from "./SoundPreview";
import { getFilePath } from "@/lib/client";
import { PICTURE_EXTENSIONS, SOUND_EXTENSIONS } from "@/lib/constants";

export const PenIcon = ({
	fill = "currentColor",
	height,
	width,
	...props
}: React.SVGProps<SVGSVGElement>) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			width={width || 12}
			height={height || 12}
			{...props}
		>
			<g
				fill="none"
				stroke={fill}
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeMiterlimit={10}
				strokeWidth={1.5}
			>
				<path d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
			</g>
		</svg>
	);
};

type WorkDetail = {
	work: Work;
	fileid: string[];
	content: string;
	author: UserDetail;
	fileInfos: { fileInfo: FileInfo; extension: string }[];
};

type Props = {
	workDetails: WorkDetail[];
};

export default function WorkList({ workDetails }: Props) {
	return (
		<div>
			<div className="flex flex-wrap items-center justify-center gap-5">
				{workDetails.map(({ work, fileid, author, content, fileInfos }) => {
					let mediaComponent;

					if (PICTURE_EXTENSIONS.includes(fileInfos[0]?.extension)) {
						mediaComponent = (
							<Link href={`/works/${work.id}`}>
								<div className="h-[200px] w-full relative">
									<TraqImage
										removeWrapper
										thumbnail
										className="object-cover w-full rounded-b-none"
										fileId={fileid[0]}
										fill
										placeholder="empty"
										alt={work.description ?? ""}
										loading="lazy"
									/>
								</div>
							</Link>
						);
					} else if (SOUND_EXTENSIONS.includes(fileInfos[0]?.extension)) {
						mediaComponent = (
							<div className="object-cover h-[200px] w-full rounded-b-none flex items-center justify-center bg-gray-200">
								<SoundPreview audioSrc={getFilePath(fileid[0])} />
							</div>
						);
					} else {
						mediaComponent = (
							<Link href={`https://q.trap.jp/messages/${work.id}`}>
								<div className="object-cover h-[200px] w-full rounded-b-none flex items-center justify-center bg-gray-200">
									<span className="text-gray-500 text-sm">No Preview</span>
								</div>
							</Link>
						);
					}

					return (
						<Card
							shadow="md"
							className="col-span-12 sm:col-span-12 h-[320px]  w-[200px] overflow-hidden"
							key={work.id}
						>
							{mediaComponent}
							<CardFooter className="justify-between   overflow-hidden rounded-middle rounded-t-none z-10 flex-col ">
								<Link
									href={`/users/${author.name}`}
									className="flex items-end absolute bottom-19.5 left-1 right-1"
								>
									<TraqAvatar
										username={author.name}
										size="lg"
										alt={author.name}
									/>
									<div className=" font-light text-sm text-black/80 dark:text-white/80 ml-2">
										<div className="h-[20px] overflow-hidden">
											{author.displayName}
										</div>
										<div>@{author.name}</div>
									</div>
								</Link>

								<div className="flex items-end absolute flex-col mt-9 text-left left-4 ">
									<Link
										href={`/works/${work.id}`}
										key={work.id}
									>
										<p className="  font-light text-xs text-black/80 dark:text-white/80">
											{(work.description ?? content).length > 48
												? (work.description ?? content).slice(0, 48) + "..."
												: (work.description ?? content)}
										</p>
									</Link>
								</div>

								<Link
									href={`https://q.trap.jp/messages/${work.id}`}
									key={work.id}
									className="block absolute bottom-0.5 right-3 text-xs text-gray-500 text-right"
								>
									{work.createdAt.toLocaleString()}
								</Link>
							</CardFooter>
						</Card>
					);
				})}
			</div>
		</div>
	);
}
