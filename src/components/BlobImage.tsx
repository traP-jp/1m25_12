"use client";

import { useEffect, useState } from "react";
import { Image, ImageProps } from "@heroui/image";

type Props = {
	blob: Blob;
} & Omit<ImageProps, "src">;

export default function BlobImage({ blob, alt, ...props }: Props) {
	const [url, setUrl] = useState("/favicon.ico");

	useEffect(() => {
		setUrl(URL.createObjectURL(blob));
		return () => URL.revokeObjectURL(url);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<Image
			src={url}
			alt={alt}
			{...props}
		/>
	);
}
