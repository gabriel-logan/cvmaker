import type { NextFunction, Request, Response } from "express";
import { join } from "node:path";

export function fallbackSpaMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  if (req.url.startsWith("/api")) {
    return next();
  }

  const clientPath = join(process.cwd(), "..", "frontend", "dist");

  // Fallback To index.html for SPA routing
  return res.sendFile(join(clientPath, "index.html"));
}
