import { getFilePath } from "@/lib/client";
import { Avatar, AvatarProps } from "@heroui/avatar";

type Props = {
	fileId: string;
} & Omit<AvatarProps, "src">;

export default async function TraqAvatar({ fileId, ...props }: Props) {
	return (
		<Avatar
			src={getFilePath(fileId)}
			{...props}
		/>
	);
}
