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
	const { task } = props
	const hasSubtasks = task.tasks && task.tasks.length > 0

	const [isExpanded, setIsExpanded] = createSignal(false)
	const [isDone, setIsDone] = createSignal(false)

	return (
		<li class="rounded-lg">
			<div
				class="flex items-center gap-4 px-4 py-2 bg-zinc-100 border border-zinc-100 hover:border-theme-200 transition-colors duration-100 rounded-lg cursor-pointer"
				onClick={() => void setIsExpanded((v) => !v && hasSubtasks)}
			>
				<div class={[
					'size-4 rounded-full border-2 border-zinc-100 outline-2 hover:outline-theme-200 cursor-pointer transition-colors duration-100',
					{
						'outline-zinc-400': !isDone(),
						'bg-theme-400 outline-theme-400': isDone()
					}
				]} onClick={(e) => {
					e.stopPropagation()
					setIsDone((v) => !v)
					return false
				}}></div>
				<span class={['select-text', { 'line-through text-zinc-400': isDone() }]}>{task.title}</span>
				<Show when={hasSubtasks}>
					<span class="ml-auto">{countSubtasks(task)}</span>
					<svg
						class={[
							'size-6 text-theme-400 transition-transform duration-100',
							{ 'rotate-180': isExpanded() }
						]}
						viewBox="0 0 24 24"
						fill="currentColor"
						aria-hidden="true"
					>
						<path fillRule="evenodd" d="M12.53 16.28a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 0 1 1.06-1.06L12 14.69l6.97-6.97a.75.75 0 1 1 1.06 1.06l-7.5 7.5Z" clipRule="evenodd" />
					</svg>
				</Show>
			</div>
			<Show when={isExpanded()}>
				<div class={`pl-2.5 ml-1 mt-1 border-l border-zinc-200 hover:border-theme-200 ${styles.parent}`}>
					<TaskList tasks={() => task.tasks} />
				</div>
			</Show>
		</li>
	)
}
