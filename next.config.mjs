/** @type {import('next').NextConfig} */

const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "http",
                hostname: "localhost",
                port: "3335"
            },
            {
                protocol: "http",
                hostname: "144.91.80.153",
                port: "3335"
            },
            {
                protocol: "http",
                hostname: "144.91.80.153",
                port: "9999"
            }
        ]
    },
    async redirects() {
        return [
            {
                source: '/coaching/:path*',
                destination: `${process.env.COACHING_DOMAIN}/coaching/:path*`,
                permanent: true
            },
            {
                source: '/monitoring/:path*',
                destination: `${process.env.MONITORING_DOMAIN}/monitoring/:path*`,
                permanent: true
            },
            {
                source: '/workout/:path*',
                destination: `${process.env.WORKOUT_DOMAIN}/workout/:path*`,
                permanent: true
            },
        ]
    },
};

export default nextConfig