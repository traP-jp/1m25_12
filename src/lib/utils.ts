const regExp = new RegExp(
	/https:\/\/q\.trap\.jp\/files\/(?<id>[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})/,
	"g"
);

export function extractFiles(content: string) {
	const matches = content.matchAll(regExp) ?? [];
	return [...matches.map(match => match?.groups?.id).filter(Boolean)] as string[];
}
