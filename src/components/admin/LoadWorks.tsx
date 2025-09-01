"use client";

import { loadWorks } from "@/actions/loadWorks";
import Form from "next/form";

export default function LoadWorks() {
	return (
		<Form action={loadWorks}>
			<input
				name="channel_id"
				title="channel_id"
			/>
			<button type="submit">load works</button>
		</Form>
	);
}
