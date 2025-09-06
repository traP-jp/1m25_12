"use client";

import { Link } from "@heroui/link";
import clsx from "clsx";

type Props = {
	onPress: () => void;
};

export const Sidebar = ({ onPress }: Props) => {
	return (
		<div className="w-64 h-full p-4">
			<Link
				href="/"
				onPress={onPress}
			>
				<h1 className="flex items-center dark:text-white  text-gray-700 text-2xl font-bold">
					<span className="i-material-symbols-house  mr-2 text-3xl"></span>
					ホーム
				</h1>
			</Link>
			<h1 className="flex items-center  dark:text-white  text-gray-700 text-2xl font-bold mt-8">
				チャンネル
			</h1>
			<ul>
				{[
					{
						path: "channels/team/graphics/progress",
						icon: "i-material-symbols-palette",
					},
					{
						path: "channels/team/sound/progress",
						icon: "i-material-symbols-music-note",
					},
					{
						path: "channels/team/CTF/progress",
						icon: "i-material-symbols-flag",
					},
					{
						path: "channels/team/SysAd/progress",
						icon: "i-material-symbols-computer",
					},
					{
						path: "channels/team/Game/progress",
						icon: "i-material-symbols-stadia-controller",
					},
				].map(({ path, icon }, index) => (
					<li
						key={index}
						className="m-4"
					>
						<Link
							href={`/${path}`}
							onPress={onPress}
						>
							<h2 className="flex items-center dark:text-white text-gray-700 text-xl font-base">
								<span className={clsx([icon, "mr-2 text-2xl"])} /> #{path}
							</h2>
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
};
