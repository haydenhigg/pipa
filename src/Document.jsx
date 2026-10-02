
import { HydrationScript } from '@solidjs/web';

// The document shell (the index.html replacement), picked up by the
// src/Document.* convention; it must render the full <html> and ships no
// client JS. <HydrationScript /> is stripped from the prerendered shell in
// client mode and activates under `ssr: true`. Delete this file to fall
// back to the plugin's built-in shell.
export default function Document(props) {
  return (
    <html lang="en" class="bg-zinc-950">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <title>pipa</title>
        <HydrationScript />
      </head>
      <body class="min-h-screen bg-zinc-950 font-sans text-zinc-100 antialiased">
        {props.children}
      </body>
    </html>
  );
}
