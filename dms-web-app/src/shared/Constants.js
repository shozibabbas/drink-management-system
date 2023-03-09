export const MONTHS = new Array(12).fill(0).map((_, i) => {
	return {
		id: i + 1,
		name: new Date(`${i + 1}/1`).toLocaleDateString(undefined, {month: "short"})
	};
});