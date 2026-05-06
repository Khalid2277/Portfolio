// Tiny helper that emits a <script type="application/ld+json"> with serialised
// schema-org payload. Identical output shape to the legacy site's hand-written
// blocks; verified during the SEO parity audit in phase 9.
//
// Usage:
//   <JsonLd data={termsJsonLd} />
// or for a multi-graph payload:
//   <JsonLd data={{ '@context': 'https://schema.org', '@graph': [...] }} />

interface JsonLdProps {
  data: Record<string, unknown> | Record<string, unknown>[];
  // Some pages emit multiple disjoint blocks (Organization + WebPage + Breadcrumb).
  // Pass an array to render one <script> per block.
}

export function JsonLd({ data }: JsonLdProps) {
  const blocks = Array.isArray(data) ? data : [data];
  return (
    <>
      {blocks.map((block, i) => (
        <script
          key={i}
          type="application/ld+json"
          // JSON.stringify is safe for content that doesn't include user input;
          // all our payloads are static.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(block) }}
        />
      ))}
    </>
  );
}
