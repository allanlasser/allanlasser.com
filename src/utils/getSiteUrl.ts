export default function getSiteUrl() {
  let protocol = "https";
  let domain = process.env.SITE_URL ?? process.env.NEXT_PUBLIC_SITE_URL;
  let env = process.env.VERCEL_ENV ?? process.env.NEXT_PUBLIC_VERCEL_ENV;
  switch (env) {
    case "preview":
      domain = process.env.VERCEL_URL ?? process.env.NEXT_PUBLIC_VERCEL_URL;
      break;
    case "development":
    case undefined:
      protocol = "http";
      break;
  }
  return `${protocol}://${domain}`;
}
