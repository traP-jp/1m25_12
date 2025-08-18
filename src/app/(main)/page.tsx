import { getMe } from "@/actions/getMe";
import AddUser from "@/components/AddUser";
import UserList from "@/components/UserList";
import { forbidden } from "next/navigation";

export default async function Home() {
	if (
		process.env.AUTHORIZED_USERS &&
		!process.env.AUTHORIZED_USERS.split(";").includes((await getMe()).name)
	) {
		return forbidden();
	}

	return (
		<section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
			<AddUser />
			<UserList />
		</section>
	);
}
