import { getFilePath } from "@/lib/client";
import { Image, ImageProps } from "@heroui/image";

type Props = {
	fileId: string;
} & Omit<ImageProps, "src">;

export default async function TraqImage({ fileId, alt, ...props }: Props) {
	return (
		<Image
			src={getFilePath(fileId)}
			alt={alt}
			{...props}
		/>
	);
}
