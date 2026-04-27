/** @type {import('next').NextConfig} */
const nextConfig = {
    // 允许 API 代理或跨域
    async rewrites() {
        return [
          {
            source: '/api/:path*',
            destination: 'http://backend:8000/api/:path*',
          },
        ];
      },
};

export default nextConfig;
