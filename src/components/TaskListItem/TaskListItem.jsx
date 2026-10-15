import { createSignal, Show } from 'solid-js'
import TaskList from '../TaskList'
import styles from './TaskListItem.module.css'

function countSubtasks(task) {
	let count = 0

	for (const subtask of task.tasks) {
		count += Math.max(countSubtasks(subtask), 1)
	}

	return count
}

export default function TaskListItem(props) {
	const hasSubtasks = () => props.task.tasks && props.task.tasks.length > 0
	const [isExpanded, setIsExpanded] = createSignal(false)

	const modifyTask = async (id, patch) => {
		// set store (to update the UI)
		const searchAndModify = (task) => {
			if (task.id === id) {
				Object.assign(task, patch)
				return true
			}

			return searchTasksAndModify(task.tasks)
		}

		const searchTasksAndModify = (tasks) => {
			if (tasks && tasks.length > 0) {
				for (const task of tasks) {
					if (searchAndModify(task)) return true
				}
			}

			return false
		}


		props.setStore((draft) => void searchTasksAndModify(draft.tasks))

		// set patches (to update the database, debounced)
		props.setPatches((oldPatches) => ({
		  ...oldPatches,
		  [id]: {
		    ...oldPatches[id],
		    ...patch
		  }
		}))
	}

	return (
		<li class="rounded-lg">
			<div
				class="flex items-center bg-zinc-100 transition-colors duration-100 rounded-lg"
				onClick={() => void setIsExpanded((v) => !v && hasSubtasks())}>
				<div
					class="flex self-stretch items-center px-4 py-2 rounded-l-lg cursor-pointer"
					onClick={(e) => {
						e.stopPropagation()
						modifyTask(props.task.id, {
							'status': ({
								'unstarted': 'started',
								'started': 'done',
								'done': 'unstarted'
							}[props.task.status])
						})
						return false
					}}>
					<div
						class={[
							'size-4 rounded-full border border-zinc-100 outline outline-theme-400 transition-colors duration-100',
							styles.statusToggle,
							{
								'bg-[linear-gradient(to_right,var(--color-theme-400)_50%,transparent_50%)]': props.task.status === 'started',
								'bg-theme-400 ': props.task.status === 'done'
							}
						]}
					/>
				</div>
				<span class={['py-2 select-text', { 'line-through text-zinc-400': props.task.status === 'done' }]}>{props.task.title}</span>
				<Show when={hasSubtasks()}>
					<span
						class={[
							'flex self-stretch items-center gap-2 ml-auto mr-4 my-2 px-2 py-0.5 font-semibold text-xs rounded-full transition-all duration-100',
							{
								'bg-theme-400 text-zinc-100': !isExpanded(),
								'bg-theme-200 text-theme-400': isExpanded(),
							}
						]}>
						{/* <Show when={!isExpanded()}>*/}
							{countSubtasks(props.task)}
						{/* </Show>*/}
						<svg
							class={[
								'size-4 transition-transform duration-100',
								{ 'rotate-180': isExpanded() }
							]}
							viewBox="0 0 24 24"
							fill="currentColor">
							<path fillRule="evenodd" d="M12.53 16.28a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 0 1 1.06-1.06L12 14.69l6.97-6.97a.75.75 0 1 1 1.06 1.06l-7.5 7.5Z" clipRule="evenodd"
						/>
					</svg>
				</span>
				</Show>
			</div>
			<Show when={isExpanded()}>
				<div class={`pl-2.5 ml-1 mt-1 border-l border-zinc-200 hover:border-theme-200 ${styles.subtaskList}`}>
					<TaskList
						tasks={props.task.tasks}
						setStore={props.setStore}
						setPatches={props.setPatches}
					/>
				</div>
			</Show>
		</li>
	)
}
