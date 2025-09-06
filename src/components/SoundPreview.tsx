"use client";

import { useState, useRef, useEffect } from "react";
import { Play, Pause } from "lucide-react";
import { Image } from "./Image";

type AudioPreviewProps = {
	audioSrc: string;
	imageSrc?: string;
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
		<div className="w-full max-w-lg mx-auto aspect-square relative overflow-hidden">
			<div className="h-12 w-12 relative">
				<Image
					removeWrapper
					src="/MusicBack.svg"
					alt="ジャケット画像"
					fill
					radius="none"
					className="!opacity-60"
					loading="lazy"
				/>
			</div>

			<div className="absolute inset-0 bg-opacity-30 flex justify-center items-center">
				<button
					onClick={handleTogglePlay}
					className="bg-white/30 text-gray-500 rounded-full p-4 hover:bg-white/50 transition-all duration-300 backdrop-blur-sm"
					aria-label={isPlaying ? "Pause" : "Play"}
				>
					{isPlaying ? (
						<Pause
							size={48}
							className="z-10 h-[50%]"
						/>
					) : (
						<Play
							size={48}
							className="translate-x-1 "
						/>
					)}
				</button>
			</div>

			<audio
				ref={audioRef}
				src={audioSrc}
				preload="none"
			/>
		</div>
	);
};

export default AudioPreview;
