import { HydrationScript } from '@solidjs/web';

export default function Document(props) {
  return (
    <html lang="en" class="bg-zinc-950">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <title>Pipa</title>
        <HydrationScript />
      </head>
      <body class="min-h-screen bg-zinc-950 font-sans text-zinc-100 antialiased">
        {props.children}
      </body>
    </html>
  );
}
