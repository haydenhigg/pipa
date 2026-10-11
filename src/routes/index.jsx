import { query } from '@solidjs/router'
import { createMemo, For } from 'solid-js'
import { Title } from '@solidjs/meta'
import { paths } from '../router'

const getProjects = query(async () => {
	const res = await fetch(`http://localhost:8787/projects`)
  return await res.json()
}, 'projects')

export const route = {
  preload: () => void getProjects(),
}

export default function Home() {
	const projects = createMemo(() => getProjects())

  return (
		<main class="px-32 py-4">
			<Title>Projects</Title>
			<h1 class="my-4 text-4xl font-semibold">Projects</h1>
			<section class="my-4">
	      <ul>
	        <For each={projects()}>
	          {(project) => (
	            <li>
	              <a
	                class="text-2xl font-semibold"
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
  )
}
