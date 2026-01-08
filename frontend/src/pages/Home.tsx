import { useTranslation } from "react-i18next";
import { FiCalendar, FiEdit2, FiEye, FiPlus, FiTrash2 } from "react-icons/fi";
import { Link } from "react-router";
import { toast } from "react-toastify";

import { useCVsStore } from "../stores/cVsStore";
import { useUserStore } from "../stores/userStore";
import type { CV } from "../types";

export default function HomePage() {
  const { t } = useTranslation();

  const { locale } = useUserStore();

  const { cVs, deleteCV } = useCVsStore();

  function handleDelete(cVId: CV["id"]) {
    if (
      confirm(
        t("DeleteCVConfirmation", {
          cvName: cVs.find((cV) => cV.id === cVId)?.cVName || "",
        }),
      )
    ) {
      deleteCV(cVId);

      toast.success(t("DeleteCVSuccess"));
    } else {
      toast.info(t("DeleteCVCancelled"), { autoClose: 1500 });
    }
  }

  return (
    <main className="min-h-screen bg-zinc-950 px-4 py-8 text-zinc-100">
      <title>Home - CV Maker</title>

      <div className="mx-auto max-w-3xl space-y-8">
        <div className="rounded-lg border border-indigo-500/40 bg-indigo-500/10 px-4 py-3 text-sm text-indigo-300">
          {t("WelcomeBackMsg", { count: cVs.length })}
        </div>

        <div className="rounded-lg border border-yellow-500/40 bg-yellow-500/10 px-4 py-3 text-sm text-yellow-300">
          {t("PreviewButtonMsg")}
        </div>

        <div className="flex justify-center">
          <Link
            to="/preview"
            className="inline-flex items-center gap-2 rounded-md bg-yellow-500 px-5 py-2 text-sm font-medium text-yellow-900 transition hover:bg-yellow-400"
          >
            <FiEye />
            {t("SeePreviews")}
          </Link>
        </div>

        <section className="space-y-6 rounded-xl border border-zinc-800 bg-zinc-900 p-5 shadow">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <h1 className="text-xl font-semibold">{t("YourCVs")}</h1>

            <Link
              to="/create"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-500"
            >
              <FiPlus />
              {t("CreateCV")}
            </Link>
          </div>

          {cVs.length > 0 ? (
            <ul className="space-y-4">
              {cVs.map((cV) => (
                <li
                  key={cV.id}
                  className="rounded-lg border border-zinc-800 bg-zinc-950 p-4"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="space-y-1">
                      <h2 className="font-medium text-zinc-100">{cV.cVName}</h2>

                      <p className="flex items-center gap-2 text-sm text-zinc-400">
                        <FiCalendar size={14} />
                        {t("CreatedAtColonSpace")}
                        {new Date(cV.createdAt).toLocaleDateString(locale, {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>

                      <p className="flex items-center gap-2 text-sm text-zinc-400">
                        <FiCalendar size={14} />
                        {t("UpdatedAtColonSpace")}
                        {new Date(cV.updatedAt).toLocaleDateString(locale, {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>

                    <div className="flex gap-4 sm:gap-5">
                      <Link
                        to={`/edit/${cV.id}`}
                        className="inline-flex items-center gap-1 text-sm font-medium text-indigo-400 hover:underline"
                      >
                        <FiEdit2 size={14} />
                        {t("Edit")}
                      </Link>

                      <button
                        onClick={() => handleDelete(cV.id)}
                        className="inline-flex items-center gap-1 text-sm font-medium text-red-500 hover:underline"
                      >
                        <FiTrash2 size={14} />
                        {t("Delete")}
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-6 text-center text-sm text-zinc-400">
              No CVs yet. Click <strong>Create CV</strong> to get started.
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
