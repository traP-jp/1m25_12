"use client";

import Image from "next/image";

export default function TraqImage({ fileId }: { fileId: ArrayBuffer }) {
	const file = new Blob([fileId], { type: "image/png" });
	const url = URL.createObjectURL(file);

	return (
		<Image
			src={url}
			width={10}
			height={10}
			alt=""
		/>
	);
}
