/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        appDir: true,
    },
    images: {
        domains: ['jungjung261.blob.core.windows.net'],
    },
};

module.exports = nextConfig;
