import Axios from "axios";

export const client = Axios.create({
	baseURL: "/api",
});
