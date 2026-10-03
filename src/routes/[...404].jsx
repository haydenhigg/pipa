import { httpStatus } from '@solidjs/web'
import { Title } from '@solidjs/meta'

// The catch-all route. httpStatus() is a no-op in the browser and takes
// effect when SSR is enabled it runs in preload so the status code is set
// before the response head flushes.
export const route = {
  preload: () => httpStatus(404),
}

export default function NotFound() {
  return (
    <main class="px-32 py-16">
      <Title>Not Found</Title>
      <h1 class="text-2xl font-bold">Not Found</h1>
    </main>
  )
}
