import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/tracking/constants";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/login", "/registro"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
