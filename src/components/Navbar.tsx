"use client";

import { useState } from "react";
import Link from "next/link";
import { List, X } from "@phosphor-icons/react/dist/ssr";

import { NavItem } from "./NavItem";

export const Navbar = () => {
	const [active, setActive] = useState(false);

	return (
		<nav className="flex items-center flex-wrap bg-zinc-950 px-3 py-3 xs:px-8 sm:px-16">
			<Link
				href="/"
				className="rounded p-2 transition-colors hover:bg-zinc-800"
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
				} w-full flex flex-col gap-x-2 md:w-auto md:inline-flex md:flex-row md:ml-auto`}
			>
				<NavItem path="list" title="Linemon list" />
				<NavItem path="map" title="Map" />
			</div>
		</nav>
	);
};
