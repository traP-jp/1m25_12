"use client";

import { useRouter, useParams, useSearchParams } from "next/navigation";
import { Pagination } from "@heroui/pagination";

type Props = {
	totalPages: number;
};

export default function Pagination_user({ totalPages }: Props) {
	const router = useRouter();

	const { name } = useParams();
	const page = useSearchParams().get("page") ?? "1";

	const currentPage = Number(page);

	const handleChange = (page: number) => {
		router.push(`/users/${name}?page=${page}`);
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
