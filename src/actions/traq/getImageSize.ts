import { getImageSize as getImageSizeImpl } from "next/dist/server/image-optimizer";
import { getFileBlob } from "./getFileBlob";

export async function getImageSize(id: string) {
	return getImageSizeImpl(
		Buffer.from(
			await getFileBlob(id)
				.then(blob => blob.arrayBuffer())
				.catch(error => {
					throw error;
				})
		)
	);
}
