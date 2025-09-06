import { getMe } from "@/actions/getMe";
import LoadChannels from "@/components/admin/LoadChannels";
import LoadUsers from "@/components/admin/LoadUsers";
import LoadWorks from "@/components/admin/LoadWorks";
import { title } from "@/components/primitives";
import { TEAM_LIST } from "@/lib/constants";
import { forbidden } from "next/navigation";

export default async function AdminPage() {
	const { name } = await getMe();

	if (!process.env.ADMINS?.split(";").includes(name)) forbidden();

	return (
		<div>
			<h1 className={title({ size: "sm" })}>{name}</h1>
			<LoadUsers />
			<LoadChannels />

			{TEAM_LIST.map(({ name, id, channelId }) => (
				<LoadWorks
					key={id}
					channelId={channelId}
					category={name}
				/>
			))}
			<LoadWorks category="free" />
		</div>
	);
}
