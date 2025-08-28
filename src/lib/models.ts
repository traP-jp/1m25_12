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
	authors: User[];
	name: string;
	description: string;
	source: string;
	links: string;
	category: Category;
	viewCount: number;
	bookmarkUsers: User[];
	allowReviews: boolean;
	reviews: Review[];
	tags: Tag[];
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

export enum Category {
	PICTURE,
	MOVIE,
	SOUND,
	GAME,
	WEB_APP,
	OTHERS,
}
