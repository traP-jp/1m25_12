'use client';

import { useRouter, useParams } from 'next/navigation';
import { Pagination } from "@heroui/pagination";

type Props = {
  totalPages: number;
};

export default function Pagination_com({ totalPages }: Props) {
  const router = useRouter();
  const params = useParams();
  const channelId = params.channelId as string;
  const currentPage = Number(params.page) || 1;

  const handleChange = (page: number) => {
    router.push(`/worklist/${channelId}/${page}`);
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