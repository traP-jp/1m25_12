import Image from "next/image";

const TeamIcon = ({ teamName }: { teamName: string }) => {
	const iconPath = `/icons/traPavillion${teamName}.svg`;
	return (
		<Image
			src={iconPath}
			alt={`${teamName}のアイコン`}
			className="w-12 h-12"
		/>
	);
};

export default TeamIcon;
