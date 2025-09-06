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
			<LoadWorks
				channelId=""
				category="free"
			/>
			<LoadWorks
				channelId="858ae414-21ec-40d8-be6a-012620db8edf"
				category="graphics"
			/>
			<LoadWorks
				channelId="7dc7d0e1-a7b9-4294-ba3e-1149a4c42c71"
				category="ctf"
			/>
			<LoadWorks
				channelId="112446e4-a8b5-4618-9813-75f08377ccc5"
				category="SysAd"
			/>
			<LoadWorks
				channelId="9e822ec2-634e-4b9c-af30-41707f537426"
				category="Algo"
			/>
			<LoadWorks
				channelId="8bd9e07a-2c6a-49e6-9961-4f88e83b4918"
				category="Sound"
			/>
			<LoadWorks
				channelId="cde0fe1b-f225-415a-b302-0c7a7ab754e2"
				category="Game"
			/>
		</div>
	);
}
