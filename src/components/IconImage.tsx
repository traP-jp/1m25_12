"use client";

import { useEffect, useState } from "react";
import {ImageProps } from "@heroui/image";
import { Avatar } from "@heroui/avatar";

type Props = {
	blob: Blob;
} & Omit<ImageProps, "src">;

export default function IConImage({ blob, alt, ...props }: Props) {
	const [url, setUrl] = useState("/favicon.ico");

	useEffect(() => {
		setUrl(URL.createObjectURL(blob));
		return () => URL.revokeObjectURL(url);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
        <Avatar
			size="lg"
			className="m-1 mr-2 "
			name={alt}
			src={url}
            {...props}
		/>
	);
}
