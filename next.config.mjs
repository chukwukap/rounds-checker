/** @type {import('next').NextConfig} */
const nextConfig = {
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
    ],
  },
};

export default nextConfig;
