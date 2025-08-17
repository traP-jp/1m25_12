"use client";

import { addUser } from "@/actions/addUser";
import { getMe } from "@/actions/getMe";
import { useEffect } from "react";

export default function AddUser() {
	useEffect(() => {
		(async () => {
			const clientUser = await getMe();
			addUser(clientUser.id);
		})();
	}, []);

	return <></>;
}
