import AddUser from "@/components/AddUser";
import UserList from "@/components/UserList";
export default async function Home() {
	return (
		<div>
			<AddUser />
			<UserList />
		</div>
	);
}
