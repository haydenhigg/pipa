import { Title } from '@solidjs/meta';
import { query } from '@solidjs/router';
import { createMemo, For } from 'solid-js';
import projects from '../../data/projects.json';

const getProject = query(async (id) => {
  return (
    projects.find((project) => String(project.id) === id) ?? {
      name: 'Unknown',
      tasks: [],
    }
  );
}, 'project');

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
			<ul>
				<For each={project().tasks}>
					{(task) => (
						<span>{task.name}</span>
					)}
				</For>
			</ul>
      {/* <p class="my-4">
        <a
          class="font-semibold text-rose-300 underline decoration-rose-500 decoration-2 underline-offset-4 transition-colors hover:text-rose-100 focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rose-500"
          href={paths.projects(Number(props.params.id) + 1)}
        >
          Next project
        </a>
      </p>*/}
    </section>
  );
}
