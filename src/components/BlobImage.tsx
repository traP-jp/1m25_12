"use client";

import Image, { ImageProps } from "next/image";
import { useEffect, useState } from "react";

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
