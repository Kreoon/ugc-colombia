// Perplexity web search — ported from Jarvis shared/perplexity.ts

export async function searchWeb(
  query: string
): Promise<{ result: string; citations: string[] }> {
  const apiKey = process.env.PERPLEXITY_API_KEY;
  if (!apiKey) throw new Error("PERPLEXITY_API_KEY not configured");

  const res = await fetch("https://api.perplexity.ai/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "sonar",
      messages: [{ role: "user", content: query }],
    }),
    signal: AbortSignal.timeout(20_000),
  });

  const data = await res.json();
  return {
    result: data?.choices?.[0]?.message?.content ?? "",
    citations: data?.citations ?? [],
  };
}

// Social profile parser from Perplexity text
export interface SocialProfile {
  platform: string;
  username: string;
  url: string;
  followers?: number;
  engagement_rate?: number;
  bio?: string;
}

export function parseSocialProfiles(text: string): SocialProfile[] {
  const profiles: SocialProfile[] = [];
  const seen = new Set<string>();

  const patterns: { platform: string; regex: RegExp }[] = [
    { platform: "instagram", regex: /https?:\/\/(?:www\.)?instagram\.com\/([A-Za-z0-9_.]+)\/?/gi },
    { platform: "tiktok", regex: /https?:\/\/(?:www\.)?tiktok\.com\/@([A-Za-z0-9_.]+)\/?/gi },
    { platform: "youtube", regex: /https?:\/\/(?:www\.)?youtube\.com\/(?:@|c\/|channel\/|user\/)([A-Za-z0-9_.-]+)\/?/gi },
  ];

  for (const { platform, regex } of patterns) {
    let match: RegExpExecArray | null;
    while ((match = regex.exec(text)) !== null) {
      const username = match[1];
      const key = `${platform}:${username.toLowerCase()}`;
      if (seen.has(key)) continue;
      seen.add(key);
      profiles.push({ platform, username, url: match[0].replace(/\/$/, "") });
    }
  }

  return profiles;
}

export function parseIndustry(text: string): string {
  const patterns = [
    /industria[:\s]+([^\n.]{3,60})/i,
    /sector[:\s]+([^\n.]{3,60})/i,
    /se dedica[n]?\s+a\s+([^\n.]{3,80})/i,
  ];
  for (const p of patterns) {
    const m = text.match(p);
    if (m) return m[1].trim();
  }
  return "No identificada";
}
