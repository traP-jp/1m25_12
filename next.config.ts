import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	reactStrictMode: true,
	webpack: config => {
		config.watchOptions = {
			poll: 1000,
			aggregateTimeout: 300,
		};
		return config;
	},
	experimental: {
		authInterrupts: true,
	},
	images: {
		unoptimized: true,
	},
};

export default nextConfig;
