import { query } from '@solidjs/router'
import { createMemo, For } from 'solid-js'
import { Title } from '@solidjs/meta'

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
      <h1 class="mb-2 text-4xl font-semibold">{project().name}</h1>
      <section class="mb-8">
	      <h2 class="mb-1 text-xs font-extrabold tracking-wider text-zinc-400">VIEWS</h2>
				<div class="flex flex-wrap gap-2">
					<button
						class="flex size-10 items-center justify-center rounded-full border border-zinc-700 bg-zinc-800 text-zinc-400"
						role="img"
						aria-label="No view"
					>
						<svg viewBox="0 0 24 24" class="size-5" aria-hidden="true">
							<path d="M1 6 23 6" fill="none" stroke="currentColor" stroke-width="2" />
							<path d="M1 12 23 12" fill="none" stroke="currentColor" stroke-width="2" />
							<path d="M1 18 23 18" fill="none" stroke="currentColor" stroke-width="2" />
						</svg>
					</button>
					<For each={project().views}>
						{(view) => (
							<button class="px-4 py-2 rounded-full bg-zinc-800 border border-zinc-700">{view.name} {view.is_default ? '(DEFAULT)' : ''}</button>
						)}
					</For>
				</div>
      </section>
      <section class="my-8">
				<h2 class="mb-1 text-xs font-extrabold tracking-wider text-zinc-400">TASKS</h2>
				<ul>
					<For each={project().sections}>
						{(section) => (
							<div class="w-full rounded border border-zinc-700">
								{section.name}
								<For each={section.tasks}>
									{(task) => (
										<div class="w-full px-2 py-1 border-b border-zinc-700">{task.content}</div>
									)}
								</For>
							</div>
						)}
					</For>
				</ul>
      </section>
    </>
  )
}
