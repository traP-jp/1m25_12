import Axios from "axios";

export const client = Axios.create({
	baseURL: "/api",
});

type Option = {
	thumbnail?: boolean;
};

export const getFilePath = (fileId: string, { thumbnail = false }: Option = {}): string => {
	if (thumbnail) return `${getFilePath(fileId)}?thumbnail=true`;
	return `https://1m25-12-repeater.trap.show/files/${fileId}`;
};
