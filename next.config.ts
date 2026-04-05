import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Разрешаем SVG через Image компонент
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
