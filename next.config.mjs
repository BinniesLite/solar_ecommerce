/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, _) => ({
        ...config,
        watchOptions: {
          ...config.watchOptions,
          poll: 800,
          aggregateTimeout: 300,
        },}), 
    images: {
      domains: [
        "res.cloudinary.com"
      ]
    }
};

export default nextConfig;
