import { query } from '@solidjs/router'
import { createMemo, createStore, createEffect, createSignal, For, Show } from 'solid-js'
import { Title } from '@solidjs/meta'
import TaskList from '../../components/TaskList'

const getProject = query(async (id) => {
	const res = await fetch(`http://localhost:8787/projects/${id}`)
  return await res.json()
}, 'project')

const patchProject = async (id, patch) => {
	const res = await fetch(`http://localhost:8787/projects/${id}`, {
		method: 'PATCH',
		body: JSON.stringify(patch),
		headers: {
			'Content-Type': 'application/json'
		}
	})

	return res.ok
}

export const route = {
  preload: ({ params }) => void getProject(params.id),
}

export default function Project(props) {
	const project = createMemo(() => getProject(props.params.id))
	const [store, setStore] = createStore({})

	createEffect(
		() => project(),
		(v) => void setStore(() => v)
	)

	const [patches, setPatches] = createSignal({})
	const [savedAt, setSavedAt] = createSignal(null)
	let timeout

	createEffect(
		() => patches(),
		(v) => {
			if (timeout) clearTimeout(timeout)
			timeout = setTimeout(() => {
				patchProject(props.params.id, v)
				setSavedAt(new Date())
			}, 1000)
		},
		{ defer: true }
	)

  return (
  	<>
      <Title>{`Project ${props.params.id}`}</Title>
      <h1 class="my-4 text-4xl font-semibold">{store.name}</h1>
      <section class="my-4">
				<div class="flex flex-wrap gap-2">
					<button class="flex size-10 items-center justify-center bg-theme-100 text-theme-400 rounded-full border border-theme-200 cursor-pointer">
						<svg viewBox="0 0 24 24" class="size-5" aria-hidden="true">
							<path d="M2 6 22 6" fill="none" stroke="currentColor" stroke-width="4" />
							<path d="M2 12 22 12" fill="none" stroke="currentColor" stroke-width="4" />
							<path d="M2 18 22 18" fill="none" stroke="currentColor" stroke-width="4" />
						</svg>
					</button>
					<For each={store.views}>
						{(view) => (
							<button class="px-4 py-2 font-semibold justify-center bg-zinc-100 text-zinc-400 rounded-full border border-zinc-200 cursor-pointer">
								{view.name}
							</button>
						)}
					</For>
				</div>
      </section>
			<section class="my-4 select-none">
				<div class="flex justify-between mt-4 text-zinc-400">
					<h2 class="font-semibold tracking-tight">Tasks</h2>
					<Show when={savedAt()}>
						<span class="font-sm">Saved at {savedAt().toLocaleTimeString(undefined, {
							hour: 'numeric',
							minute: '2-digit',
							second: '2-digit'
						})}</span>
					</Show>
				</div>
				<TaskList tasks={store.tasks} setStore={setStore} setPatches={setPatches} />
      </section>
    </>
  )
}
