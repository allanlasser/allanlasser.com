function getPageTitle({ title, htmlTitle }: Record<string, string>) {
  const defaultTitle = "Allan Lasser";
  if (htmlTitle) return htmlTitle;
  if (title) return `${title} • ${defaultTitle}`;
  return defaultTitle;
}

export default async function Head({ params }) {
  return (
    <>
      <title>{getPageTitle(params)}</title>
      <meta name='viewport' content='width=device-width, initial-scale=1' />
      <link rel='icon' type='image/x-icon' href='/static/favicon.ico' />
    </>
  );
}
