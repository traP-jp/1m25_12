import { Image as ImageImpl, ImageProps as ImageImplProps } from "@heroui/image";
import NextImage, { ImageProps as NextImageProps } from "next/image";

export type ImageProps = Omit<ImageImplProps, "as"> & NextImageProps;

export function Image({ alt, ...props }: ImageProps) {
	return (
		<ImageImpl
			as={NextImage}
			alt={alt}
			{...props}
		/>
	);
}
