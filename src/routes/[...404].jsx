import { Title } from '@solidjs/meta';

import { httpStatus } from '@solidjs/web';

// The catch-all route. httpStatus() is a no-op in the browser and takes
// effect when SSR is enabled; it runs in preload so the status code is set
// before the response head flushes.
export const route = {
  preload: () => httpStatus(404),
} ;

export default function NotFound() {
  return (
    <main class="px-4 py-12">
      <Title>Not Found</Title>
      <h1 class="my-4 text-4xl font-bold">Page Not Found</h1>
      <p class="my-4 text-zinc-400">
        Visit{' '}
        <a
          class="font-semibold text-rose-300 underline decoration-rose-500 decoration-2 underline-offset-4 transition-colors hover:text-rose-100 focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rose-500"
          href="https://docs.solidjs.com"
          target="_blank"
          rel="noreferrer"
        >
          docs.solidjs.com
        </a>{' '}
        to learn how to build Solid apps.
      </p>
    </main>
  );
}
