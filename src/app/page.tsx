import Link from "next/link";
import { GithubLogo } from "@phosphor-icons/react/dist/ssr";

import { getTitle } from "@/utils/getTitle";

export default function Home() {
	return (
		<main className="flex flex-1 flex-col justify-center items-center gap-4">
			{getTitle("Linemon")}

			<p>A text-based monster taming CLI game.</p>

			<Link
				href="https://github.com/Luhmeiy/Linemon"
				target="_blank"
				className="bg-zinc-800 flex items-center gap-2 px-3 py-2 rounded hover:bg-zinc-700 transition-colors"
			>
				<GithubLogo size={20} weight="fill" />
				Download it now!
			</Link>
		</main>
	);
}
