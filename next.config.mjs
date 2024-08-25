/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    webpack: (config) => {
        config.externals.push({
            'utf-8-validate': 'commonjs utf-8-validate',
            'bufferutil': 'commonjs bufferutil',
        })
        return config
    },
    async rewrites() {
        return [
            {
                source: '/socket.io',
                destination: 'http://localhost:3001',
            },
        ];
    },
};

export default nextConfig;
