export interface Evolution {
	id: string;
	lvl: number;
	name: string;
}

export interface Linemon {
	id: string;

	info: {
		name: string;
		description: string;
		evolvesAt?: number;
		evolutionFamily?: string;
		evolutionStage: number;
		type: string;
		catchRate: number;
	};

	evolutionTree?: Evolution[];
}
