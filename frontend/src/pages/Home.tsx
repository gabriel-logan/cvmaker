import { Link } from "react-router";
import { toast } from "react-toastify";

import { useCVsStore } from "../stores/cVsStore";
import type { CV } from "../types";

export default function HomePage() {
  const { cVs, deleteCV } = useCVsStore();

  function handleDelete(cVId: CV["id"]) {
    if (confirm("Are you sure you want to delete this CV?")) {
      deleteCV(cVId);

      toast.success("CV deleted successfully.");
    } else {
      toast.info("CV deletion cancelled.", { autoClose: 1500 });
    }
  }

  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-10 text-zinc-100">
      <title>Home - CV Maker</title>

      <div className="mx-auto max-w-2xl space-y-8">
        <div className="rounded-lg border border-indigo-500/40 bg-indigo-500/10 px-4 py-3 text-sm font-medium text-indigo-300">
          Welcome back. You have{" "}
          <strong>
            {cVs.length} CV{cVs.length !== 1 ? "s" : ""}
          </strong>{" "}
          saved.
        </div>

        <div className="space-y-6 rounded-xl border border-zinc-800 bg-zinc-900 p-6 shadow">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold">Your CVs</h1>

            <Link
              to="/create"
              className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-500"
            >
              Create CV
            </Link>
          </div>

          {cVs.length > 0 ? (
            <ul className="space-y-3">
              {cVs.map((cV) => (
                <li
                  key={cV.id}
                  className="rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-3"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="font-medium text-zinc-100">
                        Name: {cV.cVName}
                      </h2>
                      <p className="text-sm text-zinc-400">
                        Created At:{" "}
                        {new Date(cV.createdAt).toLocaleDateString(
                          window.navigator.language,
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          },
                        )}
                      </p>
                      <p className="text-sm text-zinc-400">
                        Updated At:{" "}
                        {new Date(cV.updatedAt).toLocaleDateString(
                          window.navigator.language,
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          },
                        )}
                      </p>
                    </div>

                    <div className="flex space-x-5">
                      <Link
                        to={`/edit/${cV.id}`}
                        className="text-sm font-medium text-indigo-400 hover:underline"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(cV.id)}
                        className="text-sm font-medium text-red-500 hover:underline"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-6 text-sm text-zinc-400">
              No CVs yet. Click <strong>Create CV</strong> to get started.
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
