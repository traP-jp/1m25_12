import AddUser from "@/components/AddUser";
import UserList from "@/components/UserList";

export default async function Home() {
	return (
		<section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
			<AddUser />
			<UserList />
		</section>
	);
}
