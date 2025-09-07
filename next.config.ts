import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	reactStrictMode: true,
	api: {
		responseLimit: false,
	},
	experimental: {
		authInterrupts: true,
	},
	images: {
		unoptimized: true,
	},
};

export default nextConfig;
