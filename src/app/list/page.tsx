import { Linemon } from "@/interface/Linemon";

export const formatType = (type: string) => {
	switch (type) {
		case "fire":
			return "bg-[#FB5A56]";
		case "ground":
			return "bg-[#954535]";
		case "grass":
			return "bg-[#59F68D] text-[#27272A]";
		case "water":
			return "bg-[#56C6FE] text-[#27272A]";
		case "air":
			return "bg-[#000000]";
		case "electric":
			return "bg-[#F2F89C] text-[#27272A]";
		case "normal":
			return "bg-[#58585A]";
	}
};

export default async function List() {
	const data = await fetch(
		"https://luhmeiy.github.io/Linemon/src/data/linemons.json"
	);
	const linemons = (await data.json()) as Linemon[];

	return (
		<main className="flex flex-col items-center py-10">
			<h1 className="text-6xl font-extrabold mb-14">Linemons</h1>

			<div className="w-3/4 grid grid-cols-2 lg:grid-cols-3 gap-8">
				{linemons &&
					linemons.map((linemon) => (
						<div
							className="flex flex-col items-start bg-zinc-950 rounded px-4 py-3"
							key={linemon.id}
						>
							<h2 className="text-xl font-bold">
								{linemon.info.name}
							</h2>
							<p
								className={`bg-slate-500 flex-shrink text-sm px-2 mb-2 ${formatType(
									linemon.info.type
								)}`}
							>
								{linemon.info.type[0].toLocaleUpperCase() +
									linemon.info.type.slice(1)}
							</p>

							<p>{linemon.info.description}</p>
						</div>
					))}
			</div>
		</main>
	);
}
