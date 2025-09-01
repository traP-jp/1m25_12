"use server";

import { getChannelPath } from "@/actions/traq/channels";
import { getMessage } from "@/actions/traq/messages";
import { getUserInfo } from "@/actions/traq/users";
import TraqImage from "@/components/TraqImage";
import { prisma } from "@/lib/prisma";
import { extractFiles } from "@/lib/utils";
import { notFound } from "next/navigation";

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
		category,
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

	return (
		<div>
			<h1>{name}</h1>
			<p>{description ?? content}</p>
			<p>{path}</p>
			<p>{category}</p>
			<p>{updatedAt.toLocaleString()}</p>
			<ul>
				{await Promise.all(
					authors.map(async ({ id, name }) => {
						const { displayName } = await getUserInfo(id);
						return (
							<li key={id}>
								{displayName} @{name}
							</li>
						);
					})
				)}
			</ul>
			{files.map(id => (
				<TraqImage
					key={id}
					alt={id}
					fileId={id}
				/>
			))}
		</div>
	);
}
