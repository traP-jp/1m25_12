import { $Enums } from "@/generated/prisma";
export const { Category } = $Enums;

export type User = {
	id: string;
	name: string;
	createdAt: Date;
	updatedAt: Date;
	channels: Channel[];
	reviews: Review[];
	works: Work[];
	tags: Tag[];
	bookmarks: Work[];
};

export type Channel = {
	id: string;
	owner: User;
	allowReviews: boolean;
	nsfw: boolean;
};

export type Review = {
	id: string;
	author: User;
	work: Work;
	parent?: Review;
	children: Review[];
	contents: string;
	createdAt: Date;
	updatedAt: Date;
	hiddenAt?: Date;
	deletedAt?: Date;
};

export type Work = {
	id: string;
	authors: string[];
	name?: string;
	description?: string;
	links: string[];
	category?: keyof typeof Category;
	viewCount: number;
	bookmarkUsers: string[];
	allowReviews: boolean;
	reviews: string[];
	tags: string[];
	createdAt: Date;
	updatedAt: Date;
	deletedAt?: Date;
};

export type Tag = {
	id: string;
	author: User;
	official: boolean;
	color: string;
	works: Work[];
	createdAt: Date;
	updatedAt: Date;
};
