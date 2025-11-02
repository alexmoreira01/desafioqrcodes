import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Configuração para Turbopack (Next.js 16+)
  turbopack: {},
  
  // Configuração para webpack (fallback)
  webpack: (config, { isServer }) => {
    if (isServer) {
      // Para better-sqlite3 funcionar no Next.js
      config.externals.push('better-sqlite3');
    }
    return config;
  },
};

export default nextConfig;
