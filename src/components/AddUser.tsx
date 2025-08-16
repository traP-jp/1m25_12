"use client";

import { addUser } from "@/actions/addUser";
import { client } from "@/lib/client";
import { useEffect } from "react";

export default function AddUser() {
	useEffect(() => {
		(async () => {
			const clientUser = await client.me.get();
			addUser(clientUser.id);
		})();
	}, []);

	return <></>;
}
