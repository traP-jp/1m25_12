import { Link as LinkImpl, LinkProps as LinkImplProps } from "@heroui/link";
import NextLink from "next/link";

export type LinkProps = Omit<LinkImplProps, "as">;

export function Link(props: LinkProps) {
	return (
		<LinkImpl
			as={NextLink}
			{...props}
		/>
	);
}
