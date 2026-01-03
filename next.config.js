/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // Optimize for production builds
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  // Image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  
  // Webpack configuration for Three.js optimization
  webpack: (config, { isServer }) => {
    // Don't bundle Three.js on server side
    if (isServer) {
      config.externals = [...(config.externals || []), 'three'];
    }
    
    // Optimize Three.js tree-shaking
    config.module.rules.push({
      test: /\.glsl$/,
      loader: 'raw-loader',
    });
    
    return config;
  },
};

module.exports = nextConfig;
