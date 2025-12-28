import DOMPurify from "dompurify";
import { JSDOM } from "jsdom";

export function sortByDate<T>(
  items: T[],
  getDate: (item: T) => string | number | null | undefined,
  order: "asc" | "desc" = "asc",
): T[] {
  return [...items].sort((a, b) => {
    const da = getDate(a) ? new Date(getDate(a)!).getTime() : 0;
    const db = getDate(b) ? new Date(getDate(b)!).getTime() : 0;

    return order === "asc" ? da - db : db - da;
  });
}

const window = new JSDOM("").window;
const purify = DOMPurify(window);

export function sanitizeHtmlString(input: string): string {
  input = input.trim();

  return purify.sanitize(input);
}
