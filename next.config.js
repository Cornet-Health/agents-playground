const createNextPluginPreval = require("next-plugin-preval/config");
const withNextPluginPreval = createNextPluginPreval();

/** @type {import('next').NextConfig} */
const normalizedBasePath = process.env.NEXT_PUBLIC_BASE_PATH
  ? process.env.NEXT_PUBLIC_BASE_PATH.replace(/\/$/, "")
  : "";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  ...(normalizedBasePath && {
    basePath: normalizedBasePath,
    assetPrefix: normalizedBasePath,
  }),
};

module.exports = withNextPluginPreval(nextConfig);
