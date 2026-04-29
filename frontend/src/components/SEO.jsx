import { Helmet } from 'react-helmet-async';

const SITE_URL = 'https://rescue-plus.vercel.app';
const SITE_NAME = 'RescueNet';
const DEFAULT_DESCRIPTION =
  'RescueNet connects animal rescuers, shelters, volunteers, adopters, and donors through a rapid animal emergency support network.';

function buildCanonical(path = '/') {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${SITE_URL}${normalizedPath}`;
}

export default function SEO({
  title = 'RescueNet | Rapid Animal Emergency Network',
  description = DEFAULT_DESCRIPTION,
  path = '/',
  image = '/icons.svg',
  noIndex = false,
  schema,
}) {
  const canonical = buildCanonical(path);
  const imageUrl = image.startsWith('http') ? image : `${SITE_URL}${image}`;
  const jsonLd =
    schema ||
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: title,
      description,
      url: canonical,
      isPartOf: {
        '@type': 'WebSite',
        name: SITE_NAME,
        url: SITE_URL,
      },
    };

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      {noIndex ? <meta name="robots" content="noindex,nofollow" /> : null}

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={imageUrl} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />

      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
    </Helmet>
  );
}
