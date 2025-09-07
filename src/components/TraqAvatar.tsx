import { getIconPath } from "@/lib/client";
import { Avatar, AvatarProps } from "@heroui/avatar";

export type Props = {
	username: string;
} & Omit<AvatarProps, "src">;

export default function TraqAvatar({ username, ...props }: Props) {
	return (
		<Avatar
			src={getIconPath(username)}
			{...props}
		/>
	);
}
