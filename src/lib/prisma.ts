import { PrismaClient } from "@/generated/prisma/client";

export const prisma = new PrismaClient({
	datasources: {
		db: {
			url: process.env.DATABASE_URL,
		},
	},
	log:
		process.env.NODE_ENV === "development"
			? ["info", "warn", "error", "query"]
			: ["warn", "error"],
});
