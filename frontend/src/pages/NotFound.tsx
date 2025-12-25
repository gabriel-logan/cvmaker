import { Link } from "react-router";

interface NotFoundPageProps {
  title?: string;
  subtitle?: string;
  description?: string;
  redirectTo?: string;
  redirectLabel?: string;
}

export default function NotFoundPage({
  title = "404 — Page not found",
  subtitle = "This page doesn't exist",
  description = "The URL you tried to access is invalid or was removed.",
  redirectTo = "/",
  redirectLabel = "Go back home",
}: NotFoundPageProps) {
  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-10 text-zinc-100">
      <title>{title} - CV Maker</title>

      <div className="mx-auto max-w-2xl space-y-8">
        <div className="rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm font-medium text-red-300">
          {title}
        </div>

        <div className="space-y-6 rounded-xl border border-zinc-800 bg-zinc-900 p-6 shadow">
          <div className="space-y-2">
            <h1 className="text-2xl font-semibold text-zinc-100">{subtitle}</h1>
            <p className="text-sm text-zinc-400">{description}</p>
          </div>

          <div className="flex justify-end">
            <Link
              to={redirectTo}
              className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-500"
            >
              {redirectLabel}
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
