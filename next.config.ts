import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true, // Add this line
  },
  experimental: {
    reactCompiler: true,
  },
}

export default nextConfig