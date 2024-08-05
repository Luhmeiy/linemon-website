"use client";

import { useState, createContext, useContext, useEffect } from "react";

import { List } from "@/components/List";
import { Evolution, Linemon } from "@/interface/Linemon";
import { getTitle } from "@/utils/getTitle";

const LinemonsContext = createContext<Linemon[]>([]);
export function useLinemonsContext() {
	return useContext(LinemonsContext);
}

const getEvolutions = (
	linemons: Linemon[],
	evolutionStage: number,
	evolutionFamily: string,
	evolvesAt: number
) => {
	let linemonEvolvesAt: number | undefined;

	return linemons.reduce((results: Evolution[], linemon) => {
		if (
			linemon.info.evolutionFamily === evolutionFamily &&
			linemon.info.evolutionStage > evolutionStage
		) {
			const evolution = {
				id: linemon.id,
				lvl: linemonEvolvesAt || evolvesAt,
				name: linemon.info.name,
			};

			linemonEvolvesAt = linemon.info.evolvesAt;

			results.push(evolution);
		}

		return results;
	}, []);
};

export default function LinemonsContextProvider() {
	const [searchInput, setSearchInput] = useState("");
	const [linemons, setLinemons] = useState<Linemon[]>();

	useEffect(() => {
		const dataFetch = async () => {
			const data = await fetch(
				"https://luhmeiy.github.io/Linemon/src/data/linemons.json"
			);
			const linemons = (await data.json()) as Linemon[];

			linemons.map((linemon) => {
				if (linemon.info.evolutionFamily && linemon.info.evolvesAt) {
					linemon.evolutionTree = getEvolutions(
						linemons,
						linemon.info.evolutionStage,
						linemon.info.evolutionFamily,
						linemon.info.evolvesAt
					);
				}
			});

			setLinemons(linemons);
		};

		dataFetch();
	}, []);

	function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
		setSearchInput(e.target.value.toLowerCase());
	}

	if (!linemons) return;

	return (
		<LinemonsContext.Provider
			value={
				searchInput
					? linemons.filter(
							({ info: { name, type } }) =>
								type.toLowerCase().includes(searchInput) ||
								name.toLowerCase().includes(searchInput)
					  )
					: linemons
			}
		>
			<main className="flex flex-col items-center py-10">
				{getTitle("Linepedia")}

				<hr className="w-56 h-1 mx-auto my-14 bg-zinc-800 border-0 rounded" />

				<input
					className="w-96 max-sm:w-72 bg-zinc-800 px-3 py-2 mb-8 rounded placeholder:text-zinc-700"
					type="search"
					placeholder="Search..."
					onChange={handleChange}
				/>

				<List />
			</main>
		</LinemonsContext.Provider>
	);
}
