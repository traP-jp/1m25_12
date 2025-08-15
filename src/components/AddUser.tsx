"use client";

import { client } from "@/lib/client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AddUser() {
	const router = useRouter();

	const fetchAsyncAddUser = async () => {
		const clientUser = await client.me.get();

		console.log(clientUser);

		await fetch("/api/user", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(clientUser),
		});

		router.refresh();
	};

	useEffect(() => {
		fetchAsyncAddUser();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return <></>;
}
