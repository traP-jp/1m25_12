"use client";

import { loadChannels } from "@/actions/loadChannels";
import Form from "next/form";

export default function LoadChannels() {
	return (
		<Form
			action={() => {
				loadChannels();
			}}
		>
			<button type="submit">load channels</button>
		</Form>
	);
}
