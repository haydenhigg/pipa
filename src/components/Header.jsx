import { paths } from '../router';
import logo from '../logo.svg';

export default function Header() {
	return (
		<nav class="fixed left-1/2 top-6 z-50 -translate-x-1/2 flex items-center rounded-full border border-zinc-800 p-2 shadow-lg shadow-zinc-950/50 backdrop-blur">
			<a
				class="mx-0.5 inline-block rounded-full px-4 py-2 font-semibold text-rose-300 no-underline transition-colors hover:bg-zinc-800 hover:text-rose-100 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rose-500"
				href="/"
			>
				Projects
			</a>
		</nav>
	);
}
