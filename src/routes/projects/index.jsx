import { Title } from '@solidjs/meta';
import { For } from 'solid-js';
import projects from '../../data/projects.json';
import { paths } from '../../router';

// The layout's index page: what /projects itself renders inside projects.tsx.
// Without an index, /projects would fall through to the [...404] catch-all.
export default function ProjectsIndex() {
  return (
    <section>
      <Title>Projects</Title>
      <ul class="space-y-2">
        <For each={projects}>
          {(project) => (
            <li>
              <a
                class="font-semibold text-rose-300 underline decoration-rose-500 decoration-2 underline-offset-4 transition-colors hover:text-rose-100 focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rose-500"
                href={paths.projects(Number(project.id))}
              >
                {project.name}
              </a>
            </li>
          )}
        </For>
      </ul>
    </section>
  );
}
