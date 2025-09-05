"use client";

import { loadWorks } from "@/actions/loadWorks";
import Form from "next/form";

type Props ={
	channelId:string;
	category:string;
}

export default function LoadWorks({ channelId,category }: Props) {
	return (
		<Form action={loadWorks}>
			<input
				name="channel_id"
				title="channel_id"
				defaultValue={channelId}
			/>
			<button type="submit">{category} : load works</button>
		</Form>
		

	);
}
