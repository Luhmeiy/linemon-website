import { House } from "@phosphor-icons/react/dist/ssr";

import { LocationProps } from "@/interface/LocationProps";
import { getTitle } from "@/utils/getTitle";

const formatCell = (type: string | null) => {
	switch (type) {
		case "route-top":
			return "!border-b-0";
		case "route-bottom":
			return "!border-t-0";
		case "route-left":
			return "!border-r-0";
		case "route-right":
			return "!border-l-0";
	}
};

interface Direction {
	x: number[];
	y: number[];
	directions: Array<"up" | "down" | "left" | "right">;
}

const switchDirection = (direction: string): Direction | undefined => {
	switch (direction) {
		case "up":
			return {
				x: [-2, 0, +1],
				y: [-1, -2, -1],
				directions: ["left", "up", "right"],
			};
		case "down":
			return {
				x: [-2, +2, +1],
				y: [-1, +1, -1],
				directions: ["left", "down", "right"],
			};
		case "left":
			return {
				x: [0, -2, 0],
				y: [0, -1, -2],
				directions: ["down", "left", "up"],
			};
		case "right":
			return {
				x: [0, +1, 0],
				y: [0, -1, -2],
				directions: ["down", "right", "up"],
			};
	}
};

const generateMap = (data: LocationProps[]) => {
	const map: LocationProps[][] = Array.from({ length: 11 }, () =>
		Array(11).fill(null)
	);
	const visited = new Set();

	const placeLocation = (
		location: LocationProps,
		x: number,
		y: number,
		direction: "up" | "down" | "left" | "right"
	) => {
		if (visited.has(location.id)) return;
		visited.add(location.id);

		let nextY = y;
		let nextX = x;

		if (location.type === "route") {
			if (direction === "left" || direction === "right") {
				map[y][x] = { ...location, style: "route-left" };
				map[y][x + 1] = { ...location, style: "route-right" };

				nextX = direction === "left" ? nextX - 2 : nextX + 2;
			} else {
				map[y][x] = { ...location, style: "route-top" };
				map[y + 1][x] = { ...location, style: "route-bottom" };

				nextY = direction === "up" ? nextY - 2 : nextY + 2;
			}
		} else {
			map[y][x] = { ...location, style: "city" };
			nextY += 1;
		}

		// Place connected routes/cities
		location.routes.forEach((route: string, index) => {
			const trimmedLocation = route.split("/").at(-1);

			const nextLocation = data.find((loc) => loc.id === trimmedLocation);
			if (!nextLocation) return;

			if (location.routes.length > 2) {
				const directions = switchDirection(direction);

				if (directions) {
					if (index === 0) {
						placeLocation(
							nextLocation,
							(nextX += directions.x[0]),
							(nextY += directions.y[0]),
							directions.directions[0]
						);
					} else if (index === 1) {
						placeLocation(
							nextLocation,
							(nextX += directions.x[1]),
							(nextY += directions.y[1]),
							directions.directions[1]
						);
					} else {
						placeLocation(
							nextLocation,
							(nextX += directions.x[2]),
							(nextY += directions.y[2]),
							directions.directions[2]
						);
					}
				}
			} else {
				placeLocation(nextLocation, nextX, nextY, direction);
			}
		});
	};

	// Start with the first city
	const startLocation = data.find((loc) => loc.type === "city");
	if (startLocation) {
		placeLocation(startLocation, Math.floor(map[0].length / 2), 0, "down");
	}

	return map;
};

export default async function Map() {
	const data = await fetch(
		"https://luhmeiy.github.io/Linemon/src/data/locations.json"
	);
	const locations = await data.json();

	const map = generateMap(locations);

	return (
		<main className="flex flex-col items-center py-10">
			{getTitle("Map")}

			<hr className="w-56 h-1 mx-auto my-14 bg-zinc-800 border-0 rounded" />

			<div className="flex flex-col">
				{map &&
					map.map((row, rowIndex) => (
						<div className="flex" key={rowIndex}>
							{row.map((cell, colIndex) => {
								return (
									<div
										className={`${
											cell ? "map-box" : "empty-box"
										} ${
											cell && cell.style
												? formatCell(cell.style)
												: ""
										}`}
										key={`${rowIndex}-${colIndex}`}
									>
										{cell && cell.style === "city" && (
											<House
												size={22}
												weight="bold"
												className="text-zinc-500"
											/>
										)}
										{cell && cell.type === "route" && (
											<p className="text-zinc-500">
												{cell.id}
											</p>
										)}
									</div>
								);
							})}
						</div>
					))}
			</div>
		</main>
	);
}
