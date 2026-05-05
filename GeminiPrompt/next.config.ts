import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  serverExternalPackages: [
    "playwright",
    "playwright-core",
    "playwright-extra",
    "puppeteer-extra-plugin-stealth",
    "selenium-webdriver",
  ],
};
export default nextConfig;
