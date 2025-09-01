import { prisma } from "@/lib/prisma";
import { traqClient } from "@/lib/traq";
import { Card, CardHeader, CardFooter } from "@heroui/card";
import { UserDetail } from "traq-bot-ts";
import TraqImage from "./TraqImage";
import { title } from "@/components/primitives";

export default async function UserList() {
	const usersRaw = (await prisma.user.findMany()).toReversed();

	const users = await Promise.all(
		usersRaw.map(({ id, name }) => {
			return traqClient.users
				.getUser(name ?? "")
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
				}));
		})
	);

	return (
		<div>
			<div className="mb-2">
				<h2 className={title({ size: "sm" })}>Users</h2>
			</div>

			<div className="flex flex-wrap items-center justify-center gap-4">
				{users.map(({ key, name, displayName, iconFileId }) => {
					return (
						<Card
							isFooterBlurred
							shadow="md"
							className="col-span-12 sm:col-span-4 h-[220px] w-[220px]"
							key={key}
						>
							<TraqImage
								removeWrapper
								className="z-0 w-full h-full object-cover relative"
								fileId={iconFileId}
								alt={displayName}
								loading="lazy"
								fill={true}
							/>
							<CardHeader className="absolute z-10 top-1 flex-col items-start!">
								<p className="text-tiny text-black/60 uppercase font-bold">
									{name}
								</p>
								<h4 className="text-black font-medium text-large">{displayName}</h4>
							</CardHeader>
							<CardFooter className="justify-between border-white/20 border-1 overflow-hidden py-1 absolute rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10 ">
								<p className="text-tiny text-black/80">No. {key}</p>
								<p className="text-tiny text-white/80 w-fit flex gap-1"></p>
							</CardFooter>
						</Card>
					);
				})}
			</div>
		</div>
	);
}
