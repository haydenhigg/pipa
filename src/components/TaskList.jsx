import { For } from 'solid-js'
import TaskListItem from './TaskListItem/TaskListItem'

export default function TaskList(props) {
	return (
		<ul class="flex flex-col gap-1">
			<For each={props.tasks()}>
				{(task) => <TaskListItem task={task} />}
			</For>
		</ul>
	)
}
