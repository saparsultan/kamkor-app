/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  output: 'export',
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.fondkamkor.kz",
        pathname: "**"
      }
    ]

  },
};

export default nextConfig;
