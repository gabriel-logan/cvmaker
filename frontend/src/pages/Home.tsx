import { Link } from "react-router";
import { toast } from "react-toastify";

import { useCVsStore } from "../stores/cVsStore";

export default function HomePage() {
  const { cvs, deleteCV } = useCVsStore();

  function handleDelete(cvId: string) {
    if (confirm("Are you sure you want to delete this CV?")) {
      deleteCV(cvId);

      toast.success("CV deleted successfully.");
    } else {
      toast.info("CV deletion cancelled.", { autoClose: 1500 });
    }
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 px-6 py-10">
      <div className="mx-auto max-w-2xl space-y-8">
        <div className="rounded-lg border border-indigo-500/40 bg-indigo-500/10 px-4 py-3 text-sm font-medium text-indigo-300">
          Welcome back. You have{" "}
          <strong>
            {cvs.length} CV{cvs.length !== 1 ? "s" : ""}
          </strong>{" "}
          saved.
        </div>

        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6 shadow space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold">Your CVs</h1>

            <Link
              to="/create"
              className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500 transition"
            >
              Create CV
            </Link>
          </div>

          {cvs.length > 0 ? (
            <ul className="space-y-3">
              {cvs.map((cv) => (
                <li
                  key={cv.id}
                  className="rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-3"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="font-medium text-zinc-100">
                        Name: {cv.cVName}
                      </h2>
                    </div>

                    <div className="flex space-x-5">
                      <Link
                        to={`/edit/${cv.id}`}
                        className="text-sm font-medium text-indigo-400 hover:underline"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(cv.id)}
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
            <div className="rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-6 text-zinc-400 text-sm">
              No CVs yet. Click <strong>Create CV</strong> to get started.
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
