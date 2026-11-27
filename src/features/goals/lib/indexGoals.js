/**
 * Stamp each goal with its 1-based position in the full list (`number`), so a
 * goal keeps its number — and a stable React key — when the list is filtered.
 */
const indexGoals = (goals) => goals.map((goal, i) => ({ ...goal, number: i + 1 }));

export default indexGoals;
