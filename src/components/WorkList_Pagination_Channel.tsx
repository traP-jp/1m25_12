"use client";

import { useRouter, useParams, useSearchParams } from "next/navigation";
import { Pagination } from "@heroui/pagination";

type Props = {
	totalPages: number;
};

export default function Pagination_channel({ totalPages }: Props) {
	const router = useRouter();

	const { path } = useParams();
	const page = useSearchParams().get("page") ?? "1";

	const currentPage = Number(page);

	const handleChange = (page: number) => {
		router.push(`/channels/${(path as string[]).join("/")}?page=${page}`);
	};

	return (
		<Pagination
			color="secondary"
			page={currentPage}
			total={totalPages}
			onChange={handleChange}
		/>
	);
}
