import { Api, Client } from "traq-bot-ts";

if (!process.env.TRAQ_BOT_TOKEN) throw new Error("TRAQ_BOT_TOKEN is not set");

export const traqClient = new Api({
	baseApiParams: { headers: { Authorization: `Bearer ${process.env.TRAQ_BOT_TOKEN}` } },
});

export const traqBotClient = new Client({ token: process.env.TRAQ_BOT_TOKEN });
