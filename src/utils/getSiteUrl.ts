export default function getSiteUrl() {
  let protocol = "https";
  let domain = process.env.SITE_URL;
  switch (process.env.VERCEL_ENV) {
    case "preview":
      domain = process.env.VERCEL_URL;
      break;
    case "development":
    case undefined:
      protocol = "http";
      break;
  }
  return `${protocol}://${domain}`;
}
