import React from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

interface GameSchemaProps {
  gameTitle: string;
  description: string;
  url: string;
  image?: string;
  datePublished?: string | null;
  dateModified?: string | null;
  platforms: string[];
  averageScore: number;
  verdict: string;
  faqs: FAQItem[];
}

export function GameSchema({
  gameTitle,
  description,
  url,
  image,
  datePublished,
  dateModified,
  platforms,
  averageScore,
  verdict,
  faqs
}: GameSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "VideoGame",
        "@id": `${url}#game`,
        "name": gameTitle,
        "description": description,
        "image": image,
        "operatingSystem": platforms.join(", "),
        "applicationCategory": "Game",
        "genre": "Action RPG" // Mock as currently in page.tsx
      },
      {
        "@type": "Review",
        "@id": `${url}#review`,
        "itemReviewed": {
          "@type": "VideoGame",
          "@id": `${url}#game`
        },
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": averageScore,
          "bestRating": 100,
          "worstRating": 0
        },
        "author": {
          "@type": "Organization",
          "name": "Metric Gamer",
          "url": "https://www.metricgamer.com"
        },
        "publisher": {
          "@type": "Organization",
          "name": "Metric Gamer",
          "logo": {
            "@type": "ImageObject",
            "url": "https://www.metricgamer.com/logo.png" // Update when logo is available
          }
        },
        "datePublished": datePublished,
        "dateModified": dateModified,
        "reviewBody": verdict
      },
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        "mainEntity": faqs.map(faq => ({
          "@type": "Question",
          "name": faq.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.answer
          }
        }))
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
