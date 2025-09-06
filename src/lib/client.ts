import Axios from "axios";

export const client = Axios.create({
	baseURL: "/api",
});

type Option = {
	thumbnail?: boolean;
};

export const getFilePath = (fileId: string, { thumbnail = false }: Option = {}) => {
	if (thumbnail) return `/api/files/${fileId}?thumbnail=true`;
	return `/api/files/${fileId}`;
};
