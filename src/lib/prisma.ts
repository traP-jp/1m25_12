// Prisma Clientのインポート
import { PrismaClient } from "@/generated/prisma/client";

const prismaClientSingleton = () => {
	return new PrismaClient({
		datasources: {
			db: {
				url: process.env.DATABASE_URL,
			},
		},
		log: ["query"],
	});
};

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

const globalForPrisma = globalThis as unknown as {
	prisma: PrismaClientSingleton | undefined;
};

const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
