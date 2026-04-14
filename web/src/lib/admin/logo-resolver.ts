// Resuelve el logo de una marca con cascada:
// 1. Si hay manualUrl ya guardada → úsala
// 2. Intenta Instagram profile picture
// 3. Fallback: Clearbit Logo API si hay dominio
// 4. null → UI muestra iniciales

interface ResolveInput {
  manualUrl?: string | null;
  instagramHandle?: string | null;
  website?: string | null;
}

const IG_USER_AGENT =
  "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 Instagram 300.0.0.0";

export async function resolveLogoUrl(input: ResolveInput): Promise<string | null> {
  if (input.manualUrl && input.manualUrl.trim().length > 0) {
    return input.manualUrl;
  }

  const igHandle = sanitizeHandle(input.instagramHandle);
  if (igHandle) {
    const ig = await fetchInstagramAvatar(igHandle);
    if (ig) return ig;
  }

  const domain = extractDomain(input.website);
  if (domain) {
    return `https://logo.clearbit.com/${domain}`;
  }

  return null;
}

function sanitizeHandle(raw: string | null | undefined): string | null {
  if (!raw) return null;
  const cleaned = raw.replace(/^@/, "").trim().toLowerCase();
  if (!/^[a-z0-9._]{1,30}$/.test(cleaned)) return null;
  return cleaned;
}

function extractDomain(raw: string | null | undefined): string | null {
  if (!raw) return null;
  try {
    const url = raw.startsWith("http") ? raw : `https://${raw}`;
    const u = new URL(url);
    return u.hostname.replace(/^www\./, "");
  } catch {
    return null;
  }
}

/**
 * Intenta obtener el avatar de IG via el endpoint público minimal.
 * Si IG bloquea o no responde, devuelve null.
 */
async function fetchInstagramAvatar(handle: string): Promise<string | null> {
  try {
    const url = `https://www.instagram.com/${handle}/?__a=1&__d=dis`;
    const res = await fetch(url, {
      headers: {
        "User-Agent": IG_USER_AGENT,
        Accept: "application/json",
      },
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) return null;
    const json = (await res.json()) as {
      graphql?: { user?: { profile_pic_url_hd?: string; profile_pic_url?: string } };
    };
    const u = json?.graphql?.user;
    return u?.profile_pic_url_hd ?? u?.profile_pic_url ?? null;
  } catch {
    return null;
  }
}
