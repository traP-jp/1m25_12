"use client";

import { useState } from "react";
import { Modal, ModalContent, ModalBody, useDisclosure, ModalHeader } from "@heroui/modal";
import { Image } from "@heroui/image";

// UserPageから画像のIDリストを受け取る
type Props = {
	filepaths: string[];
	blurredFilePaths: string[];
	width: number[];
	height: number[];
};

export default function ImageGallery({ filepaths, blurredFilePaths, width, height }: Props) {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [selectedImageId, setSelectedImageId] = useState<string | null>(null);

	// 画像がクリックされたときの処理
	const handleImageClick = (fileId: string) => {
		setSelectedImageId(fileId);
		onOpen();
	};

	// 選択された画像のインデックスを探す
	const selectedIndex = selectedImageId ? filepaths.indexOf(selectedImageId) : -1;

	return (
		<div>
			{/* 画像ギャラリーの表示エリア */}
			<div className="flex flex-col items-start gap-2 overflow-x-auto rounded-t-sm p-2">
				{filepaths.map((id, index) => (
					<div
						key={id}
						className=""
					>
						<button
							type="button"
							onClick={() => handleImageClick(id)}
							className="cursor-pointer appearance-none border-none bg-transparent p-0"
						>
							<Image
								alt="画像プレビュー"
								classNames={{
									wrapper: "bg-no-repeat bg-center",
								}}
								src={filepaths[index]}
								fallbackSrc={blurredFilePaths[index]}
								height={800}
								className="object-contain p-4 my-auto rounded-none " // 高さを固定して見た目を揃える
								loading="lazy"
							/>
						</button>
					</div>
				))}
			</div>

			{/* 画像表示用モーダル */}
			<Modal
				size="5xl"
				isOpen={isOpen}
				onClose={onClose}
				placement="center"
			>
				<ModalContent className="bg-black/80 text-white">
					<ModalBody className=" flex items-center justify-center p-4">
						{/* ✅ 選択された画像の情報を正しく渡す */}
						{selectedImageId && selectedIndex !== -1 && (
							<Image
								alt={selectedImageId}
								src={selectedImageId}
								width={width[selectedIndex]}
								height={height[selectedIndex]}
								className="rounded-none max-h-[80vh] w-auto object-contain"
							/>
						)}
					</ModalBody>
				</ModalContent>
			</Modal>
		</div>
	);
}
