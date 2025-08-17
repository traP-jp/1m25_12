import { ImageProps } from "@heroui/image";
import BlobImage from "./BlobImage";
import { traqClient } from "@/lib/traq";

type Props = {
	fileId: string;
} & Omit<ImageProps, "src">;

export default async function TraqImage({ fileId, ...props }: Props) {
	const blob = await traqClient.files
		.getFile(fileId)
		.then(response => response.blob())
		.catch(() => null);

	if (!blob) return <></>;

	return (
		<BlobImage
			blob={blob}
			{...props}
		/>
	);
}
