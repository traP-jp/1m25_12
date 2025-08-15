import { NextResponse } from "next/server";

export function middleware(request: Request) {
	const requestHeaders = new Headers(request.headers);
	if (process.env.NODE_ENV === "development" && process.env.USER_NAME) {
		requestHeaders.set("X-Forwarded-User", process.env.USER_NAME);
	}

	return NextResponse.next({
		request: {
			headers: requestHeaders,
		},
	});
}
