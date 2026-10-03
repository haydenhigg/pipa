import { HydrationScript } from '@solidjs/web'

export default function Document(props) {
  return (
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <title>Pipa</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Clarity+City:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet" />
        <HydrationScript />
      </head>
      <body class="min-h-screen bg-zinc-950 font-sans antialiased">
        {props.children}
      </body>
    </html>
  )
}
