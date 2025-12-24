import type { NextFunction, Request, Response } from "express";
import { join } from "node:path";
import { clientDistPath } from "src/shared/constants";

export function fallbackSpaMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  if (req.url.startsWith("/api")) {
    return next();
  }

  // Fallback To index.html for SPA routing
  return res.sendFile(join(clientDistPath, "index.html"));
}
