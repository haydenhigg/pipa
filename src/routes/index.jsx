import { Title } from '@solidjs/meta';
import projects from '../data/projects.json';
import { paths } from '../router';
import { For } from 'solid-js';

export default function Home() {
  return (
		<main class="px-24 py-12">
			<Title>Projects</Title>
			<h1 class="text-2xl font-bold">Projects</h1>
			<section>
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
    </main>
  );
}
