import { Card, CardFooter } from "@heroui/card";
import TraqImage from "./TraqImage";
import Link from "next/link";
import { User, Work } from "@/generated/prisma";
import { FileInfo } from "traq-bot-ts";
import TraqAvatar from "./TraqAvatar";

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
	work: Work & { author: User };
	fileid: string[];
	iconfileid: string;
	content: string;
	fileInfos: { fileInfo: FileInfo; extension: string }[];
};

type Props = {
	workdetails: WorkDetail[];
};

export default function WorkList({ workdetails }: Props) {
	return (
		<div>
			<div className="flex flex-wrap items-center justify-center gap-5">
				{workdetails.map(({ work, fileid, iconfileid, content, fileInfos }) => {
					console.log(work, fileid, iconfileid, content, fileInfos[0]);

					let mediaComponent;

					if (["png", "jpg", "jpeg", "gif", "webp"].includes(fileInfos[0]?.extension)) {
						mediaComponent = (
							<div className="h-[200px] w-full relative">
								<TraqImage
									removeWrapper
									className="object-cover w-full rounded-b-none"
									fileId={fileid[0]}
									fill
									placeholder="empty"
									alt={work.description ?? ""}
									priority
								/>
							</div>
						);
					} else if (
						["mp3", "wav", "ogg", "flac", "aac", "m4a", "wma"].includes(
							fileInfos[0]?.extension
						)
					) {
						mediaComponent = (
							<div className="object-cover h-[200px] w-full rounded-b-none flex items-center justify-center bg-gray-200">
								<span className="text-gray-500 text-sm">music</span>
							</div>
						);
					} else {
						mediaComponent = (
							<div className="object-cover h-[200px] w-full rounded-b-none flex items-center justify-center bg-gray-200">
								<span className="text-gray-500 text-sm">No Preview</span>
							</div>
						);
					}

					return (
						<Link
							href={`/works/${work.id}`}
							key={work.id}
						>
							<Card
								isPressable
								shadow="md"
								className="col-span-12 sm:col-span-12 h-[320px]  w-[200px] overflow-hidden"
								key={work.id}
							>
								{mediaComponent}
								<CardFooter className="justify-between   overflow-hidden rounded-middle rounded-t-none z-10 flex-col ">
									<div className="flex items-end absolute bottom-20 left-1 right-1">
										<TraqAvatar
											fileId={iconfileid}
											size="lg"
											alt={work.author.name}
											loading="lazy"
										/>
										<p className=" font-light mt-3 text-sm text-black/80 dark:text-white/80 ">
											@{work.author.name}
										</p>
									</div>
									<div className="flex items-end absolute  flex-col mt-8 text-left left-4 ">
										<p className="  font-light text-xs text-black/80 dark:text-white/80">
											{(work.description ?? content).length > 64
												? (work.description ?? content).slice(0, 64) + "..."
												: (work.description ?? content)}
										</p>
									</div>
								</CardFooter>
							</Card>
						</Link>
					);
				})}
			</div>
		</div>
	);
}
