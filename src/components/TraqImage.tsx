import { getFilePath } from "@/lib/client";
import { Image, ImageProps } from "@/components/Image";
import { getImageSize } from "@/actions/traq/getImageSize";

type Props = {
	fileId: string;
} & Omit<ImageProps, "src">;

export default async function TraqImage({ fileId, alt, width, height, fill, ...props }: Props) {
	if (!fill && (!width || !height)) {
		const { width: defaultWidth, height: defaultHeight } = await getImageSize(fileId);
		width ??= defaultWidth;
		height ??= defaultHeight;
	}

	return (
		<Image
			src={getFilePath(fileId)}
			{...{ alt, fill, width, height }}
			{...props}
		/>
	);
}
