import Link from "next/link";
import figlet from "figlet";
import alligator2 from "figlet/importable-fonts/Alligator2.js";
import { GithubLogo } from "@phosphor-icons/react/dist/ssr";

export default async function Home() {
	figlet.parseFont("Alligator2", alligator2);
	const linemon = figlet.textSync("Linemon", { font: "Alligator2" });

	return (
		<main className="flex flex-1 flex-col justify-center items-center gap-4">
			<div className="text-[.5rem] sm:text-xs">
				<p>
					==================================================================================
				</p>
				<pre>{linemon}</pre>
				<p>
					==================================================================================
				</p>
			</div>

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
