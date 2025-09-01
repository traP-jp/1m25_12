import { ImageProps } from "@heroui/image";
import BlobImage from "./BlobImage";
import { traqClient } from "@/lib/traq";
import IConImage from "./IconImage";

type Props = {
	fileId: string;
} & Omit<ImageProps, "src">;

export default async function TraqIcon({ fileId, ...props }: Props) {
	const blob = await traqClient.files
		.getFile(fileId)
		.then(response => response.blob())
		.catch(() => null);

	if (!blob) return <></>;

	return (
		<IConImage
			blob={blob}
			{...props}
		/>
	);
}

