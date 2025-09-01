"use client";

import { loadUsers } from "@/actions/loadUsers";
import Form from "next/form";

export default function LoadUsers() {
	return (
		<Form action={loadUsers}>
			<button type="submit">load users</button>
		</Form>
	);
}
