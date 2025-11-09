
import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
    ],
  },
  allowedDevOrigins: [
    "https://*.cluster-zumahodzirciuujpqvsniawo3o.cloudworkstations.dev",
    "6000-firebase-studio-1753798712946.cluster-zumahodzirciuujpqvsniawo3o.cloudworkstations.dev"
  ]
};

export default nextConfig;
