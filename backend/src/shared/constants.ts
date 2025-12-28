import { join } from "node:path";

export const apiPrefix = "api";

export const clientDistPath = join(
  __dirname,
  "..",
  "..",
  "..",
  "frontend",
  "dist",
);

export const maxTimeoutMs = 60000; // 60 seconds
