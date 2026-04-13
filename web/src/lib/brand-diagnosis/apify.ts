// Instagram scraper via Apify — ported from Jarvis brand-researcher

export interface ApifyPost {
  url: string;
  caption: string;
  likes: number;
  comments: number;
  views?: number;
  published_at: string;
  content_type: "image" | "video" | "reel" | "carousel";
  thumbnail_url?: string;
}

export interface InstagramProfile {
  username: string;
  followers: number;
  following: number;
  bio: string;
  posts_count: number;
  profile_pic_url?: string;
  is_verified: boolean;
  engagement_rate: number;
  recent_posts: ApifyPost[];
}

export interface ApifyAd {
  page_name: string;
  ad_text: string;
  media_type: "image" | "video" | "carousel";
  started_running: string;
  status: "active" | "inactive";
}

const APIFY_BASE = "https://api.apify.com/v2";
const IG_ACTOR = "apify~instagram-profile-scraper";
const ADS_ACTOR = "apify~facebook-ads-library";

export async function scrapeInstagram(
  username: string
): Promise<InstagramProfile | null> {
  const token = process.env.APIFY_API_TOKEN;
  if (!token) return null;

  const clean = username.replace(/^@/, "").trim();
  if (!clean) return null;

  try {
    const res = await fetch(
      `${APIFY_BASE}/acts/${IG_ACTOR}/run-sync-get-dataset-items?token=${token}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ usernames: [clean], resultsLimit: 6 }),
        signal: AbortSignal.timeout(120_000),
      }
    );

    const items = await res.json();
    if (!Array.isArray(items) || items.length === 0) return null;

    const profile = items[0];
    const posts: ApifyPost[] = (profile.latestPosts || []).slice(0, 6).map((p: any) => ({
      url: p.url || (p.shortCode ? `https://www.instagram.com/p/${p.shortCode}/` : ""),
      caption: p.caption || "",
      likes: p.likesCount ?? p.likes ?? 0,
      comments: p.commentsCount ?? p.comments ?? 0,
      views: p.videoViewCount ?? p.videoPlayCount ?? undefined,
      published_at: p.timestamp || p.takenAt || "",
      content_type: resolveType(p.type),
      thumbnail_url: p.displayUrl || p.thumbnailUrl || undefined,
    }));

    const followers = profile.followersCount ?? 0;
    const totalLikes = posts.reduce((s, p) => s + p.likes, 0);
    const totalComments = posts.reduce((s, p) => s + p.comments, 0);
    const er = followers > 0 && posts.length > 0
      ? Math.round(((totalLikes + totalComments) / posts.length / followers) * 10000) / 100
      : 0;

    return {
      username: profile.username || clean,
      followers,
      following: profile.followsCount ?? 0,
      bio: profile.biography || "",
      posts_count: profile.postsCount ?? 0,
      profile_pic_url: profile.profilePicUrl || undefined,
      is_verified: profile.verified ?? false,
      engagement_rate: er,
      recent_posts: posts,
    };
  } catch {
    return null;
  }
}

export async function scrapeAds(brandName: string): Promise<ApifyAd[]> {
  const token = process.env.APIFY_API_TOKEN;
  if (!token) return [];

  try {
    const res = await fetch(
      `${APIFY_BASE}/acts/${ADS_ACTOR}/run-sync-get-dataset-items?token=${token}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          searchTerms: [brandName],
          countryCode: "CO",
          adType: "all",
          maxItems: 10,
        }),
        signal: AbortSignal.timeout(90_000),
      }
    );

    const items = await res.json();
    if (!Array.isArray(items)) return [];

    return items.slice(0, 10).map((ad: any) => ({
      page_name: ad.pageName || ad.page_name || brandName,
      ad_text: ad.adCreativeBody || ad.ad_creative_body || ad.bodyText || "",
      media_type: ad.adCreativeVideoUrl ? "video" : ad.snapshot?.cards ? "carousel" : "image",
      started_running: ad.startDate || ad.ad_delivery_start_time || "",
      status: ad.isActive ? "active" : "inactive",
    }));
  } catch {
    return [];
  }
}

function resolveType(type: string): ApifyPost["content_type"] {
  const t = (type || "").toLowerCase();
  if (t === "video") return "video";
  if (t === "reel") return "reel";
  if (t === "sidecar" || t === "carousel") return "carousel";
  return "image";
}
