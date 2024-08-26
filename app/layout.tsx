// app/layout.tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>Apple Bento Slides</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css"
          rel="stylesheet"
        />
        <link rel="stylesheet" href="/globals.css" />
      </head>
      <body className="min-h-screen bg-gray-100 flex">
        {children}
      </body>
    </html>
  );
}