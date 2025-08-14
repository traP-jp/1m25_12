"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AddUser() {
	const router = useRouter();

	const fetchAsyncAddUser = async () => {
		const response = await fetch("/api/me");

		const clientUser = await response.json();

		console.log(clientUser);

		await fetch("/api/user", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				name: clientUser.userId ?? "unknown",
			}),
		});

		router.refresh();
	};

	useEffect(() => {
		fetchAsyncAddUser();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return <></>;
}
