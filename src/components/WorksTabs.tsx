"use client";

import React from "react";
import { Tabs, Tab } from "@heroui/tabs";

// --- ここからアイコン定義 ---
const GalleryIcon = (props: React.SVGProps<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="24"
		height="24"
		viewBox="0 0 24 24"
		fill="currentColor"
		stroke="currentColor"
		strokeWidth="1"
		strokeLinecap="round"
		strokeLinejoin="round"
		{...props}
	>
		<path d="M22,3a1,1,0,0,0-1-1H3A1,1,0,0,0,2,3V21a1,1,0,0,0,1,1H21a1,1,0,0,0,1-1ZM20,20H4V17.481L7.926,14.34l2.367,2.367a1,1,0,0,0,1.414,0l4.367-4.367L20,15.481Zm0-7.081-3.375-2.7a1,1,0,0,0-1.332.074L11,14.586,8.707,12.293a1,1,0,0,0-1.332-.074L4,14.919V4H20ZM6,8a2,2,0,1,1,2,2A2,2,0,0,1,6,8Z" />
	</svg>
);
const MusicIcon = (props: React.SVGProps<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="24"
		height="24"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
		strokeLinecap="round"
		strokeLinejoin="round"
		{...props}
	>
		<path d="M9 18V5l12-2v13" />
		<circle
			cx="6"
			cy="18"
			r="3"
		/>
		<circle
			cx="18"
			cy="16"
			r="3"
		/>
	</svg>
);
const VideoIcon = (props: React.SVGProps<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="28"
		height="28"
		viewBox="0 0 24 20"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
		strokeLinecap="round"
		strokeLinejoin="round"
		{...props}
	>
		<path d="M16.5 7.29v6.659a.301.301 0 0 1-.448.298L11.606 12.4v1.525a1.135 1.135 0 0 1-1.131 1.131H1.63A1.135 1.135 0 0 1 .5 13.925v-6.61a1.135 1.135 0 0 1 1.131-1.132h8.844a1.135 1.135 0 0 1 1.131 1.132v1.524l4.446-1.847a.301.301 0 0 1 .448.299z" />
	</svg>
);
const AppIcon = (props: React.SVGProps<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="24"
		height="24"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="1"
		strokeLinecap="round"
		strokeLinejoin="round"
		{...props}
	>
		<path d="M20.501 6.028V6h-.02A10.28 10.28 0 0 0 4.519 6H4.5v.028a10.262 10.262 0 0 0 0 12.944V19h.02a10.28 10.28 0 0 0 15.962 0h.021v-.028a10.262 10.262 0 0 0 0-12.944zM13 6V3.272A4.533 4.533 0 0 1 15.54 6zm2.935 1a16.827 16.827 0 0 1 .853 5H13V7zM12 3.272V6H9.46A4.533 4.533 0 0 1 12 3.272zM12 7v5H8.212a16.827 16.827 0 0 1 .853-5zm-4.787 5H3.226a9.234 9.234 0 0 1 1.792-5h2.984a17.952 17.952 0 0 0-.79 5zm0 1a17.952 17.952 0 0 0 .789 5H5.018a9.234 9.234 0 0 1-1.792-5zm1 0H12v5H9.065a16.827 16.827 0 0 1-.853-5zM12 19v2.728A4.533 4.533 0 0 1 9.46 19zm1 2.728V19h2.54A4.533 4.533 0 0 1 13 21.728zM13 18v-5h3.788a16.827 16.827 0 0 1-.853 5zm4.787-5h3.987a9.234 9.234 0 0 1-1.792 5h-2.984a17.952 17.952 0 0 0 .79-5zm0-1a17.952 17.952 0 0 0-.789-5h2.984a9.234 9.234 0 0 1 1.792 5zm1.352-6h-2.501a8.524 8.524 0 0 0-1.441-2.398A9.306 9.306 0 0 1 19.139 6zM9.803 3.602A8.524 8.524 0 0 0 8.363 6H5.86a9.306 9.306 0 0 1 3.942-2.398zM5.861 19h2.501a8.524 8.524 0 0 0 1.441 2.398A9.306 9.306 0 0 1 5.861 19zm9.336 2.398A8.524 8.524 0 0 0 16.637 19h2.502a9.306 9.306 0 0 1-3.942 2.398z" />
	</svg>
);
const GameIcon = (props: React.SVGProps<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="32"
		height="32"
		viewBox="0 0 24 18"
		fill="none"
		stroke="currentColor"
		strokeWidth="1"
		strokeLinecap="round"
		strokeLinejoin="round"
		{...props}
	>
		<path d="M9 3.988v-2.988h-1v2.988c-3.564 0.105-8 1.282-8 2.487v7.041c0 0.827 0.673 1.5 1.5 1.5h1.79l1.996-3.931c0.567 0.104 1.713 0.274 3.173 0.274 1.479 0 2.694-0.174 3.288-0.277l1.908 3.934h1.845c0.827 0 1.5-0.673 1.5-1.5v-7.041c0-1.205-4.437-2.383-8-2.487zM16 13.516c0 0.275-0.225 0.5-0.5 0.5h-1.218l-1.976-4.070-0.386 0.085c-0.015 0.003-1.515 0.329-3.462 0.329-1.941 0-3.315-0.323-3.329-0.327l-0.384-0.093-2.068 4.075h-1.177c-0.275 0-0.5-0.225-0.5-0.5v-6.915c0.502-0.437 3.38-1.518 7-1.611v0.011h1v-0.013c3.619 0.094 6.498 1.175 7 1.612v6.917zM5 7.020h0.998v1h-0.998v1.020h-1v-1.020h-1v-1h1v-1.020h1v1.020zM12.5 9.020c0.827 0 1.5-0.673 1.5-1.5s-0.673-1.5-1.5-1.5-1.5 0.672-1.5 1.5 0.673 1.5 1.5 1.5zM12.5 7.020c0.275 0 0.5 0.225 0.5 0.5s-0.225 0.5-0.5 0.5-0.5-0.225-0.5-0.5 0.225-0.5 0.5-0.5z" />
	</svg>
);

// --- ここまでアイコン定義 ---

export const WorksTabs = () => {
	return (
		<div className="flex w-full flex-col mt-8">
			<Tabs aria-label="投稿作品一覧">
				<Tab
					key="photos"
					title={
						<div className="flex items-center space-x-2">
							<GalleryIcon />
							<span>Photos</span>
						</div>
					}
				>
					{/* Photosタブが選択された時に表示されるコンテンツ */}
					<div className="p-4">
						<h2 className="text-lg font-bold">写真作品一覧</h2>
						<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
							<div className="aspect-square bg-gray-200 rounded-lg"></div>
							<div className="aspect-square bg-gray-200 rounded-lg"></div>
						</div>
					</div>
				</Tab>

				<Tab
					key="music"
					title={
						<div className="flex items-center space-x-2">
							<MusicIcon />
							<span>Music</span>
						</div>
					}
				>
					{/* Musicタブが選択された時に表示されるコンテンツ */}
					<div className="p-4">
						<h2 className="text-lg font-bold">音楽作品一覧</h2>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
							<div className="h-24 bg-gray-200 rounded-lg"></div>
						</div>
					</div>
				</Tab>

				<Tab
					key="videos"
					title={
						<div className="flex items-center space-x-2">
							<VideoIcon />
							<span>Videos</span>
						</div>
					}
				>
					{/* Videosタブが選択された時に表示されるコンテンツ */}
					<div className="p-4">
						<h2 className="text-lg font-bold">動画作品一覧</h2>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
							<div className="aspect-video bg-gray-200 rounded-lg"></div>
						</div>
					</div>
				</Tab>

				<Tab
					key="apps"
					title={
						<div className="flex items-center space-x-2">
							<AppIcon />
							<span>Apps</span>
						</div>
					}
				>
					{/* WebAppsタブが選択された時に表示されるコンテンツ */}
					<div className="p-4">
						<h2 className="text-lg font-bold">Webアプリ一覧</h2>
						<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
							<div className="aspect-square bg-gray-200 rounded-lg"></div>
							<div className="aspect-square bg-gray-200 rounded-lg"></div>
						</div>
					</div>
				</Tab>

				<Tab
					key="games"
					title={
						<div className="flex items-center space-x-2">
							<GameIcon />
							<span>Games</span>
						</div>
					}
				>
					{/* Gamesタブが選択された時に表示されるコンテンツ */}
					<div className="p-4">
						<h2 className="text-lg font-bold">ゲーム作品一覧</h2>
						<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
							<div className="aspect-square bg-gray-200 rounded-lg"></div>
							<div className="aspect-square bg-gray-200 rounded-lg"></div>
						</div>
					</div>
				</Tab>
			</Tabs>
		</div>
	);
};
