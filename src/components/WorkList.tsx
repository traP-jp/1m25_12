
import { prisma } from "@/lib/prisma";
import { traqClient } from "@/lib/traq";
import { Card, CardFooter } from "@heroui/card";
import { UserDetail } from "traq-bot-ts";
import TraqImage from "./TraqImage";
import { Button } from "@heroui/button";
import TrapIcon from "./TrapIcon";

import type { Work } from '@prisma/client';

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

type detail = {
  work: Work;
  fileid: string[];
  iconfileid:string;
};


type Props = {
	workdetails:detail[];
};


export default function WorkList({ workdetails }: Props) {


	return (
		<div>

			<div className="flex flex-wrap items-center justify-center gap-5">
				{workdetails.map(({work,fileid,iconfileid}) => {
					return (
						<Card
							isPressable
							shadow="md"
							className="col-span-12 sm:col-span-12 h-[320px]  w-[200px] overflow-hidden"
							key={work.id}
						>
							
							<TraqImage
								removeWrapper
								className="object-cover h-[200px] w-full rounded-b-none "
								fileId={fileid[0]}
								alt={work.description}
								height={200}
							/>
							<CardFooter className="justify-between   overflow-hidden rounded-middle rounded-t-none z-10 flex-col ">
								<div className="flex items-end absolute bottom-20 left-1 right-1">
									<TrapIcon
										fileId={iconfileid}
										alt={work.authors[0].name}
									/>
									<p className=" font-light mt-3 text-sm text-black/80 dark:text-white/80 ">
										@{work.authors[0].name}
									</p>
								</div>
								<div className="flex items-end absolute  flex-col mt-8 text-left left-4 ">
									<p className="  font-light text-sm text-black/80 dark:text-white/80">
										{work.description}
									</p>
								</div>
								<Button
									size="sm"
									color="secondary"
									startContent={<PenIcon />}
									variant="solid"
									className="font-normal px-2 text-xs absolute bottom-2 right-2"
								>
									レビューを書く
								</Button>
							</CardFooter>
						</Card>
					);
				})}
			</div>
		</div>
	);
}
