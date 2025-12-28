type Order = "asc" | "desc";

export function sortByDate<T>(
  items: T[],
  getDate: (item: T) => string | number | null | undefined,
  order: Order = "asc",
): T[] {
  return [...items].sort((a, b) => {
    const da = getDate(a) ? new Date(getDate(a)!).getTime() : 0;
    const db = getDate(b) ? new Date(getDate(b)!).getTime() : 0;

    return order === "asc" ? da - db : db - da;
  });
}
