declare module "next-pwa" {
  import type { NextConfig } from "next";

  type RuntimeCaching = {
    urlPattern: RegExp | string;
    handler: string;
    options?: Record<string, unknown>;
  };

  type PWAOptions = {
    dest?: string;
    register?: boolean;
    skipWaiting?: boolean;
    disable?: boolean;
    buildExcludes?: (RegExp | string)[];
    importScripts?: string[];
    fallbacks?: { document?: string; image?: string; font?: string };
    runtimeCaching?: RuntimeCaching[];
  };

  export default function withPWAInit(
    options: PWAOptions
  ): (config: NextConfig) => NextConfig;
}
