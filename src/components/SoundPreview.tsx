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
			const playPromise = audioRef.current?.play();
			if (playPromise !== undefined) {
				playPromise.catch(error => {
					if (error.name === "AbortError") {
						console.log("Audio play was interrupted.");
					} else {
						console.error("Audio play failed:", error);
					}
				});
			}
		} else {
			audioRef.current?.pause();
		}
	}, [isPlaying]);

	const handleTogglePlay = () => {
		// isPlayingの状態を切り替え
		setIsPlaying(!isPlaying);
	};

	return (
		<div className="w-full max-w-lg mx-auto aspect-square relative overflow-hidden">
			<Image
				removeWrapper
				src="/MusicBack.svg"
				alt="ジャケット画像"
				fill
				radius="none"
				className="object-cover !opacity-10"
				loading="lazy"
			/>

			<div className="absolute inset-0 bg-opacity-30 flex justify-center items-center z-10">
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
