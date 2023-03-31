/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        appDir: true,
    },
    images: {
        domains: ['jungjung261.blob.core.windows.net', 'shopvnb.com'],
    },
    env: {
        SERVER_URL: process.env.SERVER_URL,
    },
};

module.exports = nextConfig;
