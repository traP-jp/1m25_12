'use client';

import { useRouter, useParams } from 'next/navigation';
import { Pagination } from "@heroui/pagination";

type Props = {
  totalPages: number;
};

export default function Pagination_user({ totalPages }: Props) {
  const router = useRouter();
  const params = useParams();
  const name = params.name as string;
  const currentPage = Number(params.page) || 1;

  const handleChange = (page: number) => {
    router.push(`/worklist/user/${name}/${page}`);
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