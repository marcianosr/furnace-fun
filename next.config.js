/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	async rewrites() {
		return [
			{
				source: "/api/questions",
				destination: "https://furnace-fun.vercel.app/api/questions",
			},
		];
	},
};

module.exports = nextConfig;
