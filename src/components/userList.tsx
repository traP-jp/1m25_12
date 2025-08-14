"use client";

import { useEffect, useState } from "react";

export default function UserList() {
	const [data, setData] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			const res = await fetch("/api/user", {
				cache: "no-store",
			});
			const data = await res.json();
			setData(data);

			setTimeout(fetchData, 1000);
		};

		fetchData();
	}, []);

	return (
		<div>
			<h2>Users</h2>
			{data.map(({ id, name }, index) => (
				<div key={index}>
					{id} {name}
				</div>
			))}
		</div>
	);
}
