import { getIconPath } from "@/lib/traq";
import { Avatar, AvatarProps } from "@heroui/avatar";

type Props = {
	username: string;
} & Omit<AvatarProps, "src">;

export default async function TraqAvatar({ username, ...props }: Props) {
	return (
		<Avatar
			src={getIconPath(username)}
			{...props}
		/>
	);
}
