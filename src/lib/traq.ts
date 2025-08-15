import { Api, Client } from "traq-bot-ts";

export const traqClient = new Api({
	baseApiParams: { headers: { Authorization: `Bearer ${process.env.TRAQ_BOT_TOKEN}` } },
});

export const traqBotClient = new Client({ token: process.env.TRAQ_BOT_TOKEN });
