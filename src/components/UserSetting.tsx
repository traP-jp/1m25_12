"use client";

import { Switch } from "@heroui/switch";
import { Input } from "@heroui/input";

export default function WorkList() {
	return (
		<div>
			<div className="flex flex-row items-center gap-4">
				<h2>自分の作品に対するレビューを許可</h2>
				<Switch />
			</div>
			<div>
				<h2>個人プログレスチャンネル</h2>
				<Input
					placeholder="個人のプログレスチャンネルを追加"
					type="text"
				/>
			</div>
		</div>
	);
}
