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
const AppIcon = (props: React.SVGProps<SVGSVGElement>) => (
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
const GameIcon = (props: React.SVGProps<SVGSVGElement>) => (
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
