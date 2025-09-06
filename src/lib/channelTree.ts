import { Channel } from "traq-bot-ts";
import { compareStringInsensitive } from "./string";
import { traqClient } from "./traq";

export const rootChannelId = "";
export type RootChannelId = typeof rootChannelId;

export type ChannelLike = Pick<Channel, "id" | "name" | "parentId" | "children" | "archived">;

export interface ChannelTreeNode {
	id: string;
	name: string;
	children: ChannelTreeNode[];
	active: boolean;
	archived: boolean;
	skippedAncestorNames?: string[];
}

export interface ChannelTree {
	children: ChannelTreeNode[];
}

const channelNameSortFunction = (node1: ChannelTreeNode, node2: ChannelTreeNode) => {
	// sort by last ancestor name
	const lastAncestorName1 = node1.skippedAncestorNames?.[node1.skippedAncestorNames?.length - 1];
	const lastAncestorName2 = node2.skippedAncestorNames?.[node2.skippedAncestorNames?.length - 1];
	return compareStringInsensitive(
		lastAncestorName1 ?? node1.name,
		lastAncestorName2 ?? node2.name
	);
};

export const constructTree = (
	channel: ChannelLike,
	channelEntities: Map<string, ChannelLike>,
	subscribedChannels?: Set<string>
): ChannelTreeNode | undefined => {
	const isRootChannel = channel.id === rootChannelId;
	const isSubscribed = isRootChannel || (subscribedChannels?.has(channel.id) ?? true);

	if (channel.children.length === 0) {
		// 葉チャンネル
		return isSubscribed
			? {
					id: channel.id,
					name: channel.name,
					active: true,
					archived: channel.archived,
					children: [],
				}
			: undefined;
	}

	/** 表示しないものをフィルタした子孫チャンネル */
	const children = channel.children
		.flatMap(id => {
			const child = channelEntities.get(id);
			if (!child) {
				return [];
			}
			const result = constructTree(child, channelEntities, subscribedChannels);
			if (result) {
				return [result];
			}
			return [];
		})
		.sort(channelNameSortFunction);
	const unarchivedChildren = children.filter(child => !child.archived);

	if (unarchivedChildren.length === 0 && !isSubscribed) {
		// 購読しておらず子もいなければ表示しない
		return undefined;
	}
	if (unarchivedChildren.length === 1 && !isSubscribed) {
		// 購読していないが1つだけ子を持つ場合は自身のチャンネル名をつなげて子のみを表示する
		const child = unarchivedChildren[0]!;
		const ancestorNames = child.skippedAncestorNames ?? [];
		ancestorNames.push(channel.name);
		return {
			...child,
			skippedAncestorNames: ancestorNames,
		};
	}
	// 購読しているか複数の子を持つ場合は自身を表示する
	return {
		id: channel.id,
		name: channel.name,
		active: isSubscribed,
		archived: channel.archived,
		children,
	};
};

export const constructTreeFromIds = (
	channelIds: string[],
	channelEntities: Map<string, ChannelLike>
) => {
	const treeWithDummyRoot = constructTree(
		{
			id: "",
			name: "",
			parentId: null,
			archived: false,
			children: channelIds,
		},
		channelEntities
	);
	return treeWithDummyRoot?.children ?? [];
};

export const channelPathToId = (
	separatedPath: readonly string[],
	channelTree: Readonly<ChannelTree | ChannelTreeNode>
): string => {
	if (separatedPath[0] === undefined) {
		throw "channelPathToId: Empty path";
	}

	const loweredChildName = separatedPath[0].toLowerCase();
	const nextTree = channelTree.children.find(
		child => child.name.toLowerCase() === loweredChildName
	);
	if (!nextTree) {
		throw `channelPathToId: No channel: ${separatedPath[0]}`;
	}
	if (separatedPath.length === 1) {
		return nextTree.id;
	}

	return channelPathToId(separatedPath.slice(1), nextTree);
};

export const constructChannelTree = async () => {
	const channels = await traqClient.channels
		.getChannels()
		.then(async res => (await res.json()).public as Channel[]);

	const channelsMap = new Map(channels.map(channel => [channel.id, channel]));

	const topLevelChannels = channels.filter(
		channel => channel.parentId === undefined || channel.parentId === null
	);

	const topLevelChannelIds = topLevelChannels.map(channel => channel.id);

	return {
		children:
			constructTree(
				{
					id: rootChannelId,
					name: "",
					parentId: null,
					archived: false,
					children: topLevelChannelIds,
				},
				channelsMap
			)?.children ?? [],
	};
};
