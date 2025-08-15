import Axios from "axios";
import { User } from "traq-bot-ts";

const axios = Axios.create({
	baseURL: "/api",
});

export const client = {
	me: {
		async get() {
			const user = await axios.get("/me");
			return user.data as User;
		},
	},
};
