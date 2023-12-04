/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  env: {
    REACT_APP_USER_NAME: process.env.REACT_APP_USER_NAME,
    REACT_APP_USER_PASSWORD: process.env.REACT_APP_USER_PASSWORD,
  }
};

module.exports = nextConfig;
