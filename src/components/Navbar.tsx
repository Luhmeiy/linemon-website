"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, List, X } from "@phosphor-icons/react/dist/ssr";

import { NavItem } from "./NavItem";

export const Navbar = () => {
	const [active, setActive] = useState(false);

	return (
		<nav className="w-3/4 flex items-center flex-wrap bg-zinc-800 rounded-lg px-3 py-2 mt-4">
			<Link
				href="/"
				className="rounded p-2 transition-colors hover:bg-zinc-700"
			>
				Linemon
			</Link>

			<button
				className="p-2 rounded ml-auto transition-colors md:hidden hover:bg-zinc-800"
				onClick={() => setActive(!active)}
			>
				{active ? (
					<X size={24} weight="bold" />
				) : (
					<List size={24} weight="bold" />
				)}
			</button>

			<div
				className={`${
					active ? "" : "hidden"
				} w-full flex flex-col gap-x-1 md:w-auto md:inline-flex md:flex-row md:items-center md:ml-auto`}
			>
				<NavItem path="list" title="Linemon list" />
				<span className="hidden md:inline">/</span>
				<NavItem path="map" title="Map" />
				<Link
					href="https://github.com/Luhmeiy/Linemon"
					target="_blank"
					className="flex justify-between items-center gap-2 rounded border px-3 py-2 transition-colors hover:bg-zinc-700 md:py-1"
				>
					GitHub
					<ArrowUpRight size={14} />
				</Link>
			</div>
		</nav>
	);
};
