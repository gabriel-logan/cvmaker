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

export const joinFullName = (
  ...parts: Array<string | null | undefined>
): string => {
  return parts
    .map((p) => p?.trim())
    .filter(Boolean)
    .join(" ");
};

export const formatDate = (v?: string | number | null): string =>
  v ? new Date(v).toLocaleDateString() : "";

const window = new JSDOM("").window;
const purify = DOMPurify(window);

export function sanitizeHtmlString(input: string): {
  result: string;
  error: Error | null;
} {
  if (input.length > 100_000) {
    return {
      result: "",
      error: new Error("Input string is too large to sanitize."),
    };
  }

  /* nosonar
  const emojiRegex = /(\p{Emoji_Presentation}|\p{Extended_Pictographic})/gu;

  if (emojiRegex.test(input)) {
    return {
      result: "",
      error: new Error("Input string contains unsupported emoji characters."),
    };
  }
  */

  input = input.trim();

  const sanitized = purify.sanitize(input, {
    WHOLE_DOCUMENT: true,
  });

  return {
    result: `<!DOCTYPE html>${sanitized}`,
    error: null,
  };
}
