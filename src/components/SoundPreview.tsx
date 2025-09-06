"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Play, Pause } from "lucide-react";

type AudioPreviewProps = {
	audioSrc: string;
	imageSrc: string;
};

const AudioPreview = ({ audioSrc }: AudioPreviewProps) => {
	//再生state
	const [isPlaying, setIsPlaying] = useState(false);

	// --- audioRef定義---
	const audioRef = useRef<HTMLAudioElement>(null);

	// isPlayingの状態が変わった時に、実際に音声の再生/停止を切り替えます
	useEffect(() => {
		if (isPlaying) {
			// isPlayingがtrueなら再生
			audioRef.current?.play();
		} else {
			// isPlayingがfalseなら停止
			audioRef.current?.pause();
		}
	}, [isPlaying]); // isPlayingが変化した時だけこの中身を実行する

	const handleTogglePlay = () => {
		// isPlayingの状態を切り替え
		setIsPlaying(!isPlaying);
	};

	return (
		<div className="w-full max-w-lg mx-auto aspect-square relative shadow-lg rounded-lg overflow-hidden">
			<Image
				src="@/MusicBack.svg"
				alt="ジャケット画像"
				fill
				className="object-cover"
				priority
			/>

			<div className="absolute inset-0 bg-black bg-opacity-30 flex justify-center items-center">
				<button
					onClick={handleTogglePlay}
					className="bg-white/30 text-white rounded-full p-4 hover:bg-white/50 transition-all duration-300 backdrop-blur-sm"
					aria-label={isPlaying ? "Pause" : "Play"}
				>
					{/* 3. isPlayingの状態に応じてアイコンを切り替える */}
					{isPlaying ? (
						<Pause size={48} />
					) : (
						<Play
							size={48}
							className="translate-x-1"
						/>
					)}
				</button>
			</div>

			<audio
				ref={audioRef} // 1. 作成したRefをaudio要素に紐付ける
				src={audioSrc}
				preload="auto"
			/>
		</div>
	);
};

export default AudioPreview;
