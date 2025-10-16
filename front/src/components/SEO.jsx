import React from 'react';
import { Helmet } from 'react-helmet-async';

/**
 * SEO component - Manages meta tags and structured data for better SEO
 * Features: Dynamic meta tags, Open Graph, Twitter Cards, structured data
 */
const SEO = ({ 
  title = "Graziella - Артизанальные итальянские сыры",
  description = "Откройте для себя изысканную коллекцию артизанальных итальянских сыров. От нежной моцареллы до роскошной бурраты — мы приносим вам подлинные вкусы Италии.",
  keywords = "итальянские сыры, моцарелла, буррата, страчителла, артизанальные сыры, свежие сыры, доставка сыров",
  image = "/images/PSX_one.png",
  url = "",
  type = "website",
  structuredData = null
}) => {
  const fullUrl = url ? `https://graziella-cheese.com${url}` : "https://graziella-cheese.com";
  const fullImageUrl = image.startsWith('http') ? image : `https://graziella-cheese.com${image}`;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Graziella Cheese" />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={fullUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:site_name" content="Graziella" />
      <meta property="og:locale" content="ru_RU" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={fullUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImageUrl} />

      {/* Additional SEO */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="theme-color" content="#6B7C32" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="Graziella" />

      {/* Favicon */}
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      <link rel="icon" type="image/png" href="/favicon.png" />
      <link rel="manifest" href="/site.webmanifest" />

      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
