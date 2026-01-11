import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  canonicalUrl?: string;
  type?: string;
  structuredData?: object | object[];
  calculatorSchema?: {
    name: string;
    inputs: { name: string; description: string }[];
    outputs: { name: string; description: string }[];
  };
  faqSchema?: { question: string; answer: string }[];
  howToSchema?: {
    name: string;
    steps: { name: string; text: string }[];
    estimatedTime?: string;
  };
  articleSchema?: {
    headline: string;
    author: string;
    datePublished: string;
    dateModified?: string;
    image?: string;
  };
}

const SEO = ({ 
  title, 
  description, 
  keywords, 
  canonicalUrl, 
  type = "website", 
  structuredData,
  calculatorSchema,
  faqSchema,
  howToSchema,
  articleSchema
}: SEOProps) => {
  const fullTitle = `${title} | Calculator Page`;

  const isClient = typeof window !== 'undefined';
  const siteUrl = isClient ? window.location.origin : 'https://thecalculatorpage.com'; 
  const currentUrl = canonicalUrl || (isClient ? window.location.href : siteUrl);

  const defaultStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Calculator Page",
    "description": description,
    "url": siteUrl,
  };

  const allSchemas = [
    structuredData || defaultStructuredData,
  ].filter(Boolean);

  const finalStructuredData = allSchemas.length === 1 ? allSchemas[0] : allSchemas;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={currentUrl} />
      
      {/* --- ICON FIXES --- */}
      {/* This forces the browser to look for favicon.png in your public folder */}
      <link rel="icon" type="image/png" href="/favicon.png" />
      <link rel="shortcut icon" type="image/png" href="/favicon.png" />
      <link rel="apple-touch-icon" href="/favicon.png" />
      
      {/* Open Graph and Twitter tags */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:image" content="/favicon.png" />
      <meta name="twitter:image" content="/favicon.png" />
      
      {/* Structured Data Mapping */}
      {Array.isArray(finalStructuredData) ? (
        finalStructuredData.map((data, index) => (
          <script key={index} type="application/ld+json">
            {JSON.stringify(data)}
          </script>
        ))
      ) : (
        <script type="application/ld+json">
          {JSON.stringify(finalStructuredData)}
        </script>
      )}
    </Helmet>
  );
};

export { SEO }; 
export default SEO;