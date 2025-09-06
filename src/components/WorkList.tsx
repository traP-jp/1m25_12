import { Card, CardFooter } from "@heroui/card";
import TraqImage from "./TraqImage";
import { User, Work } from "@/generated/prisma";
import { FileInfo } from "traq-bot-ts";
import TraqAvatar from "./TraqAvatar";
import { Link } from "./Link";

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
	content: string;
	fileInfos: { fileInfo: FileInfo; extension: string }[];
};

type Props = {
	workDetails: WorkDetail[];
};

export default function WorkList({ workDetails }: Props) {
	return (
		<div>
			<div className="flex flex-wrap items-center justify-center gap-5">
				{workDetails.map(({ work, fileid, content, fileInfos }) => {
					let mediaComponent;

					if (["png", "jpg", "jpeg", "gif", "webp"].includes(fileInfos[0]?.extension)) {
						mediaComponent = (
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
						<Card
							shadow="md"
							className="col-span-12 sm:col-span-12 h-[320px]  w-[200px] overflow-hidden"
							key={work.id}
						>
							<Link
								href={`/works/${work.id}`}
								key={work.id}
							>
								{mediaComponent}
							</Link>
							<CardFooter className="justify-between   overflow-hidden rounded-middle rounded-t-none z-10 flex-col ">
								<Link
									href={`/users/${work.author.name}`}
									className="flex items-end absolute bottom-20 left-1 right-1"
								>
									<TraqAvatar
										username={work.author.name}
										size="lg"
										alt={work.author.name}
									/>
									<p className=" font-light mt-3 text-sm text-black/80 dark:text-white/80 ">
										@{work.author.name}
									</p>
								</Link>

								<div className="flex items-end absolute  flex-col mt-8 text-left left-4 ">
									<Link
										href={`https://q.trap.jp/messages/${work.id}`}
										key={work.id}
									>
										<p className="  font-light text-xs text-black/80 dark:text-white/80">
											{(work.description ?? content).length > 48
												? (work.description ?? content).slice(0, 48) + "..."
												: (work.description ?? content)}
										</p>
									</Link>
								</div>
								<span className="block absolute bottom-0.5 right-3 text-xs text-gray-500 text-right">
									{work.createdAt.toLocaleString()}
								</span>
							</CardFooter>
						</Card>
					);
				})}
			</div>
		</div>
	);
}
