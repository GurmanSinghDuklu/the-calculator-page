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
  const siteUrl = 'https://www.thecalculatorpage.com'; 
  
  // FIX: Force removal of trailing slash to match sitemap and avoid duplicate errors
  const cleanCanonical = canonicalUrl 
    ? canonicalUrl.replace(/\/$/, "") 
    : siteUrl;

  const fullTitle = `${title} | The Calculator Page`;

  // Base Schema
  const baseSchema = {
    "@context": "https://schema.org",
    "@type": type === "article" ? "Article" : "WebPage",
    "name": title,
    "description": description,
    "url": cleanCanonical,
  };

  // Combine all schemas into an array
  const allSchemas: any[] = [baseSchema];

  if (structuredData) allSchemas.push(structuredData as any);
  
  if (calculatorSchema) {
    allSchemas.push({
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": calculatorSchema.name,
      "applicationCategory": "FinanceApplication",
      "operatingSystem": "Any",
      "description": description
    });
  }

  if (faqSchema) {
    allSchemas.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqSchema.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": { "@type": "Answer", "text": faq.answer }
      }))
    });
  }

  return (
    <Helmet>
      {/* Standard Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      
      {/* CRITICAL FIX: data-rh="true" ensures react-helmet-async 
          replaces the tag instead of duplicating it.
      */}
      <link rel="canonical" href={cleanCanonical} data-rh="true" />
      
      {/* Favicons (Using PNG as specified in your icons fix) */}
      <link rel="icon" type="image/png" href="/favicon.png" />
      <link rel="apple-touch-icon" href="/favicon.png" />

      {/* Social Meta Tags */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={cleanCanonical} />
      <meta property="og:image" content={`${siteUrl}/og-image.png`} />
      
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${siteUrl}/og-image.png`} />

      {/* Injecting Structured Data */}
      {allSchemas.map((schema, index) => (
        <script key={`schema-${index}`} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
};

export { SEO };
export default SEO;