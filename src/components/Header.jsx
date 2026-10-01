import { paths } from '../router';

export default function Header() {
	return (
		<nav class="fixed left-1/2 top-2 z-50 flex -translate-x-1/2 items-center rounded-full border border-zinc-800 bg-zinc-900/95 p-2 shadow-lg shadow-zinc-950/50 backdrop-blur">
			<a
				class="mx-0.5 inline-block rounded-full px-3 py-1.5 font-semibold text-rose-300 no-underline transition-colors hover:bg-zinc-800 hover:text-rose-100 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rose-500"
				href={paths()}
			>
				Home
			</a>
			<a
				class="mx-0.5 inline-block rounded-full px-3 py-1.5 font-semibold text-rose-300 no-underline transition-colors hover:bg-zinc-800 hover:text-rose-100 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rose-500"
				href={paths.projects()}
			>
				Projects
			</a>
		</nav>
	);
}
