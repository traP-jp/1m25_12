"use server";

import { traqClient } from "@/lib/traq";
import { FileInfo } from "traq-bot-ts";

export async function getFileMeta(fileId: string) {
	return traqClient.files
		.getFileMeta(fileId)
		.then(response => response.json() as Promise<FileInfo>);
}
