export function sortByStartDateAsc<
  T extends { startDate?: string | number | null },
>(items: T[], order: "asc" | "desc" = "asc"): T[] {
  return [...items].sort((a, b) => {
    const da = a.startDate ? new Date(a.startDate).getTime() : 0;
    const db = b.startDate ? new Date(b.startDate).getTime() : 0;

    return order === "asc" ? da - db : db - da;
  });
}
