import Link from "next/link";

export const NavItem = ({ path, title }: { path: string; title: string }) => {
	return (
		<Link
			href={`/${path}`}
			className="rounded px-3 py-2 transition-colors hover:bg-zinc-800"
		>
			{title}
		</Link>
	);
};
