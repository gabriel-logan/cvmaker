import { Link } from "react-router";

export default function NotFoundPage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 px-6 py-10">
      <div className="mx-auto max-w-2xl space-y-8">
        <div className="rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm font-medium text-red-300">
          404 — Page not found
        </div>

        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6 shadow space-y-6">
          <div className="space-y-2">
            <h1 className="text-2xl font-semibold text-zinc-100">
              This page doesn’t exist
            </h1>
            <p className="text-sm text-zinc-400">
              The URL you tried to access is invalid or was removed.
            </p>
          </div>

          <div className="flex justify-end">
            <Link
              to="/"
              className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500 transition"
            >
              Go back home
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
