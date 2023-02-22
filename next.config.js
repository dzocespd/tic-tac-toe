// If using ionic
// const withTM = require("next-transpile-modules")([
//   '@ionic/react',
//   '@ionic/core',
//   '@stencil/core',
//   'ionicons'
// ])
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {unoptimized: true},
  webpack: (config) => {
    config.resolve.alias['@'] = false;
    config.resolve.alias['src'] = false;
    return config;
  },
  

}

// module.exports = withTM(nextConfig)

module.exports = nextConfig
