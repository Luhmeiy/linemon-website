import figlet from "figlet";
import alligator2 from "figlet/importable-fonts/Alligator2.js";

export const getTitle = (text: string) => {
	figlet.parseFont("Alligator2", alligator2);
	const title = figlet.textSync(text, { font: "Alligator2" });

	const line = "=".repeat((title.length - 13) / 7);

	return (
		<div
			className={`text-[.5rem] ${line.length > 82 ? "md" : "sm"}:text-xs`}
		>
			<p>{line}</p>
			<pre>{title}</pre>
			<p>{line}</p>
		</div>
	);
};
