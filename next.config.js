module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "blocket-clone.ams3.cdn.digitaloceanspaces.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "8080",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "marketplace-api.johros.dev",
        port: "",
        pathname: "/**",
      },
    ],
  },
};
