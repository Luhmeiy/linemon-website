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

	evolutionTree?: {
		lvl: number;
		name: string;
	}[];
}
