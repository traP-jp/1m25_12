"use server";

import {
	channelPathToId as channelPathToIdImpl,
	ChannelTree,
	constructChannelTree,
} from "@/lib/channelTree";

let channelTree: ChannelTree | null = null;

export async function loadChannels() {
	return (channelTree = await constructChannelTree());
}

export async function getChannelTree() {
	if (channelTree) return channelTree;
	return await loadChannels();
}

export async function channelPathToId(path: string[]) {
	return channelPathToIdImpl(path, await getChannelTree());
}
