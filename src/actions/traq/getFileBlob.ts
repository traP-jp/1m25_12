"use server";

import { traqClient } from "@/lib/traq";

export async function getFileBlob(fileId: string) {
	return traqClient.files.getFile(fileId).then(response => response.blob());
}
