/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { hostname: "cdn.example.com" },
      { hostname: "example.com" },
      { hostname: "res.cloudinary.com" },
    ],
  },
};

export default nextConfig;
