import { getFilePath } from "@/lib/client";
import { getImageSize } from "@/actions/traq/getImageSize";
import { Avatar, AvatarProps } from "@heroui/avatar";

type Props = {
	fileId: string;
} & Omit<AvatarProps, "src">;

export default async function TraqAvater({ fileId, ...props }: Props) {
	return (
		<Avatar
			src={getFilePath(fileId)}
			{...props}
		/>
	);
}
