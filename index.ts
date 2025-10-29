// index.ts
interface Env {
  X_URL: string;
  GITHUB_URL: string;
  INSTAGRAM_URL: string;
  YOUTUBE_URL: string;
  MASTODON_URL: string;
  LINKEDIN_URL: string;
  BLUESKY_URL: string;
  STRAVA_URL: string;
  PAYPAL_URL: string;
  TELEGRAM_URL: string;
  NOT_FOUND_URL: string;
}

const REDIRECT_MAP = (env: Env): Record<string, string> => ({
  x: env.X_URL, twitter: env.X_URL, t: env.X_URL,
  github: env.GITHUB_URL, gh: env.GITHUB_URL,
  instagram: env.INSTAGRAM_URL, ig: env.INSTAGRAM_URL,
  youtube: env.YOUTUBE_URL, yt: env.YOUTUBE_URL,
  mastodon: env.MASTODON_URL, masto: env.MASTODON_URL,
  linkedin: env.LINKEDIN_URL, li: env.LINKEDIN_URL,
  bluesky: env.BLUESKY_URL, bsky: env.BLUESKY_URL,
  strava: env.STRAVA_URL,
  paypal: env.PAYPAL_URL, pay: env.PAYPAL_URL,
  telegram: env.TELEGRAM_URL, tg: env.TELEGRAM_URL,
});

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const path = url.pathname.slice(1).trim().toLowerCase();
    const target = REDIRECT_MAP(env)[path];

    if (target) {
      return Response.redirect(target, 301);
    }

    return Response.redirect(env.NOT_FOUND_URL, 302);
  },
};
