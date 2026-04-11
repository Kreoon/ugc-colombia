export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://ugccolombia.co";

export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID ?? "GTM-PT9JR4ZN";
export const GA4_ID = process.env.NEXT_PUBLIC_GA4_ID ?? "G-2TRCVHXJBR";
export const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID ?? "";
export const TIKTOK_PIXEL_ID = process.env.NEXT_PUBLIC_TIKTOK_PIXEL_ID ?? "";
export const LINKEDIN_PARTNER_ID =
  process.env.NEXT_PUBLIC_LINKEDIN_PARTNER_ID ?? "";
export const BING_UET_ID = process.env.NEXT_PUBLIC_BING_UET_ID ?? "";
export const HOTJAR_ID = process.env.NEXT_PUBLIC_HOTJAR_ID ?? "";

export const BRAND = {
  name: "UGC Colombia",
  url: "https://ugccolombia.co",
  logo: "https://ugccolombia.co/brand/logo-dark-bg.png",
  instagram: "https://www.instagram.com/agenciaugccolombia",
  tiktok: "https://www.tiktok.com/@agenciaugccolombia",
} as const;

export const CONSENT_STORAGE_KEY = "ugc_cookie_consent";
export const UTM_STORAGE_KEY = "ugc_utm_params";
export const UTM_EXPIRY_DAYS = 30;
