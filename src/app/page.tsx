import AddUser from "@/components/addUser";
import UserList from "@/components/userList";
export default async function Home() {
	return (
		<div>
			<AddUser />
			<UserList />
		</div>
	);
}
