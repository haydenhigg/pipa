import { Title } from '@solidjs/meta';
import { query } from '@solidjs/router';
import { createMemo } from 'solid-js';
import projects from '../../data/projects.json';
import { paths } from '../../router';

// Async data loading: a query (cached per key) read through a memo — the
// surrounding <Loading> boundary (in App.tsx) shows its fallback until the
// promise settles. The data is a local JSON module here; swap the body for
// any API call — an absolute URL, or a server function (see the `fullstack`
// template). Avoid fetching your own origin during SSR: behind a proxy the
// incoming Host header rarely routes back to this server.
const getProject = query(async (id) => {
  return (
    projects.find((project) => String(project.id) === id) ?? {
      name: 'Unknown',
      tasks: [],
    }
  );
}, 'project');

// Starts the fetch as soon as navigation begins, before the page renders.
export const route = {
  preload: ({ params }) => void getProject(params.id),
} ;

export default function Project(props) {
  const project = createMemo(() => getProject(props.params.id));

  return (
    <section>
      <Title>{`Project ${props.params.id}`}</Title>
      <h2 class="my-2 text-2xl font-semibold text-zinc-100">{project().name}</h2>
      <p class="text-zinc-400">{project().tasks.length} tasks</p>
      <p class="my-4">
        <a
          class="font-semibold text-rose-300 underline decoration-rose-500 decoration-2 underline-offset-4 transition-colors hover:text-rose-100 focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rose-500"
          href={paths.projects(Number(props.params.id) + 1)}
        >
          Next project
        </a>
      </p>
    </section>
  );
}
