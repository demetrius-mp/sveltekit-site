export default function stall(ms: number) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}
