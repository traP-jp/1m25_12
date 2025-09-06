import Image from "next/image";

const TeamIcon = ({ teamName }: { teamName: string }) => {
	const iconPath = `/icons/traPavilion_${teamName}.svg`;
	return (
		<Image
			src={iconPath}
			alt={`${teamName}のアイコン`}
			width={30}
			height={30}
			className="w-12 h-12 object-contain"
		/>
	);
};

export default TeamIcon;
