import { getMe } from "@/actions/getMe";
import LoadUsers from "@/components/admin/LoadUsers";
import LoadWorks from "@/components/admin/LoadWorks";
import { title } from "@/components/primitives";
import { forbidden } from "next/navigation";

export default async function AdminPage() {
	const { name } = await getMe();

	if (!process.env.ADMINERS?.split(";").includes(name)) forbidden();

	return (
		<div>
			<h1 className={title({ size: "sm" })}>{name}</h1>
			<LoadUsers />
			<LoadWorks />
		</div>
	);
}
