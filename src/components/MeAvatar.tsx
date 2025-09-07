"use client";

import { useEffect, useState } from "react";
import type { User } from "traq-bot-ts";
import { getMe } from "@/actions/getMe";
import TraqAvatar, { Props as TraqAvatarProps } from "./TraqAvatar";
import { Link } from "./Link";

type Props = Omit<TraqAvatarProps, "username">;

export default function MyAvatar({ ...props }: Props) {
	const [user, setUser] = useState<User | null>(null);

	useEffect(() => {
		(async () => {
			setUser(await getMe());
		})();
	}, []);

	if (!user) return null;

	return (
		<Link href={`/users/${user.name}`}>
			<TraqAvatar
				username={user.name}
				alt={user.displayName}
				{...props}
			/>
		</Link>
	);
}
