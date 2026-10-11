import { query } from '@solidjs/router'
import { createMemo, createSignal, For } from 'solid-js'
import { Title } from '@solidjs/meta'
import TaskList from '../../components/TaskList'

const getProject = query(async (id) => {
	const res = await fetch(`http://localhost:8787/projects/${id}`)
  return await res.json()
}, 'project')

export const route = {
  preload: ({ params }) => void getProject(params.id),
}

export default function Project(props) {
  const project = createMemo(() => getProject(props.params.id))

  return (
  	<>
      <Title>{`Project ${props.params.id}`}</Title>
      <h1 class="my-4 text-4xl font-semibold">{project().name}</h1>
      <section class="my-4">
				<div class="flex flex-wrap gap-2">
					<button
						class="flex size-10 items-center justify-center bg-theme-100 text-theme-400 rounded-full border border-theme-200 cursor-pointer"
					>
						<svg viewBox="0 0 24 24" class="size-5" aria-hidden="true">
							<path d="M2 6 22 6" fill="none" stroke="currentColor" stroke-width="4" />
							<path d="M2 12 22 12" fill="none" stroke="currentColor" stroke-width="4" />
							<path d="M2 18 22 18" fill="none" stroke="currentColor" stroke-width="4" />
						</svg>
					</button>
					<For each={project().views}>
						{(view) => (
							<button
								class="px-4 py-2 font-semibold justify-center bg-zinc-100 text-zinc-400 rounded-full border border-zinc-200 cursor-pointer"
							>
								{view.name}
							</button>
						)}
					</For>
				</div>
      </section>
			<section class="my-4 select-none">
				<h2 class="mt-4 font-semibold tracking-tight text-zinc-400">Tasks</h2>
				<TaskList tasks={() => project().tasks} />
      </section>
    </>
  )
}
