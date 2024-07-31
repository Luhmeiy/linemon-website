import Link from "next/link";
import { useLinemonsContext } from "@/app/list/page";

const formatType = (type: string) => {
	switch (type) {
		case "fire":
			return "bg-[#FB5A56]";
		case "ground":
			return "bg-[#954535]";
		case "grass":
			return "bg-[#59F68D] text-[#27272A]";
		case "water":
			return "bg-[#56C6FE] text-[#27272A]";
		case "wind":
			return "bg-[#F4F4F5] text-[#27272A]";
		case "electric":
			return "bg-[#F2F89C] text-[#27272A]";
		case "normal":
			return "bg-[#58585A]";
	}
};

export const List = () => {
	const linemons = useLinemonsContext();

	return (
		<div className="w-3/4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
			{linemons &&
				linemons.map((linemon) => (
					<div
						className="flex flex-col items-start bg-zinc-950 rounded px-4 py-3"
						id={linemon.id}
						key={linemon.id}
					>
						<h2 className="text-xl font-bold mb-1">
							{linemon.info.name}
						</h2>
						<p
							className={`flex-shrink text-sm px-2 mb-2 ${formatType(
								linemon.info.type
							)}`}
						>
							{linemon.info.type[0].toLocaleUpperCase() +
								linemon.info.type.slice(1)}
						</p>

						<p>{linemon.info.description}</p>

						<div className="mt-3">
							{linemon.evolutionTree ? (
								<>
									<h3 className="font-semibold">
										Evolves to:
									</h3>
									<div className="flex flex-wrap gap-2 mt-1">
										{linemon.evolutionTree.map(
											(evolution) => (
												<p
													className="bg-zinc-800 px-2 py-1 rounded"
													key={evolution.name}
												>
													<strong>
														Lvl. {evolution.lvl}:
													</strong>{" "}
													<Link
														href={`#${evolution.id}`}
													>
														{evolution.name}
													</Link>
												</p>
											)
										)}
									</div>
								</>
							) : (
								<p className="text-zinc-600">No evolutions.</p>
							)}
						</div>
					</div>
				))}
		</div>
	);
};
