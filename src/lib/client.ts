import Axios from "axios";

export const client = Axios.create({
	baseURL: "/api",
});

export const getFilePath = (fileId: string) => {
	return `/api/files/${fileId}`;
};
