/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
        {
            // matching all API routes
            source: "/server/(.*)",
            headers: [
                { key: "Access-Control-Allow-Credentials", value: "true" },
            ]
        }
    ]
}
}
  //   experimental: {
  //     appDir: true,
  //     serverComponentsExternalPackages: ["mongoose"],
  //   },
  //   images: {
  //     domains: ['lh3.googleusercontent.com'],
  //   },
  //   webpack(config) {
  //     config.experiments = {
  //       ...config.experiments,
  //       topLevelAwait: true,
  //     }
  //     return config
  //   }
  // }
  
  module.exports = nextConfig