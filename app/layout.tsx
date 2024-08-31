import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Apple Slides - Explore Apple Event Presentations',
  description: 'Discover the latest Apple event presentations in a unique bento-box style gallery. Filter by time and category to explore each slide in detail.',
  keywords: 'Apple events, presentations, slides, gallery, bento-box, filter, time, category',
  openGraph: {
    title: 'Apple Slides - Explore Apple Event Presentations',
    description: 'Discover the latest Apple event presentations in a unique bento-box style gallery. Filter by time and category to explore each slide in detail.',
    url: 'https://appleslides.com',
    siteName: 'Apple Slides',
    images: [
      {
        url: 'https://appleslides.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Apple Slides',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@your_twitter_handle',
    title: 'Apple Slides - Explore Apple Event Presentations',
    description: 'Discover the latest Apple event presentations in a unique bento-box style gallery. Filter by time and category to explore each slide in detail.',
    images: [
      {
        url: 'https://appleslides.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Apple Slides',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/x-icon" href="/favicon/favicon.ico" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="48x48" href="/favicon/favicon-48x48.png" />
        <link rel="manifest" href="/favicon/manifest.webmanifest" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="theme-color" content="#000000" />
        <meta name="application-name" content="Apple Slides" />
        <link rel="apple-touch-icon" sizes="57x57" href="/favicon/apple-touch-icon-57x57.png" />
        <link rel="apple-touch-icon" sizes="60x60" href="/favicon/apple-touch-icon-60x60.png" />
        <link rel="apple-touch-icon" sizes="72x72" href="/favicon/apple-touch-icon-72x72.png" />
        <link rel="apple-touch-icon" sizes="76x76" href="/favicon/apple-touch-icon-76x76.png" />
        <link rel="apple-touch-icon" sizes="114x114" href="/favicon/apple-touch-icon-114x114.png" />
        <link rel="apple-touch-icon" sizes="120x120" href="/favicon/apple-touch-icon-120x120.png" />
        <link rel="apple-touch-icon" sizes="144x144" href="/favicon/apple-touch-icon-144x144.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/favicon/apple-touch-icon-152x152.png" />
        <link rel="apple-touch-icon" sizes="167x167" href="/favicon/apple-touch-icon-167x167.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon-180x180.png" />
        <link rel="apple-touch-icon" sizes="1024x1024" href="/favicon/apple-touch-icon-1024x1024.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Apple Slides" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="msapplication-TileImage" content="/favicon/mstile-144x144.png" />
        <meta name="msapplication-config" content="/favicon/browserconfig.xml" />

        {/* Google Analytics */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-0BNDZR5F5C"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-0BNDZR5F5C');
            `,
          }}
        />

        {/* Microsoft Clarity */}
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "nvn5quuu5l");
            `,
          }}
        />
      </head>
      <body className="min-h-screen bg-neutral-950">{children}</body>
    </html>
  );
}