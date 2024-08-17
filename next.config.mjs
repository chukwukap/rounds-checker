/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.resolve.fallback = { fs: false, net: false, tls: false };
    config.externals.push("pino-pretty", "encoding");
    return config;
  },
  images: {
    remotePatterns: [
      {
        hostname: "avatars.farcaster.xyz",
        pathname: "/**",
        protocol: "https",
      },
      {
        hostname: "farcaster.xyz",
        pathname: "/**",
        protocol: "https",
      },
      {
        hostname: "i.pravatar.cc",
        pathname: "/**",
      },
      {
        hostname: "i.imgur.com",
        pathname: "/**",
        protocol: "https",
      },
    ],
  },
};

export default nextConfig;
