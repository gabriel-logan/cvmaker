import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import { toast } from "react-toastify";

import { useCVsStore } from "../stores/cVsStore";
import { useUserStore } from "../stores/userStore";
import type { CV, locale } from "../types";

export default function SettingsPage() {
  const { t, i18n } = useTranslation();

  const { cVs, createCV, updateCV, deleteCV, deleteAllCVs } = useCVsStore();
  const { setLocale } = useUserStore();

  const handleImportCVs = async (e: React.FormEvent) => {
    e.preventDefault();
    const inputRaw = document.getElementById("cv-backup");

    if (!inputRaw) return;

    const input = inputRaw as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const text = await file.text();

      try {
        const importedCVs: CV[] = JSON.parse(text);

        importedCVs.forEach((cv) => {
          const exists = cVs.find((existing) => existing.id === cv.id);

          if (exists) updateCV(cv.id, cv);
          else createCV(cv);
        });

        toast.success(t("CVsImportedSuccessfully"));
      } catch (error) {
        console.error(error);
        toast.error(t("ErrorImportingCVs"));
      }
    }
  };

  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-10 text-zinc-100">
      <title>Settings - CV Maker</title>

      <div className="mx-auto max-w-2xl space-y-8">
        <h1 className="text-2xl font-semibold">{t("Settings")}</h1>

        <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-6 shadow">
          <h2 className="mb-4 text-lg font-medium">{t("UserSettings")}</h2>
          <div className="space-y-4">
            <div>
              <label className="mb-1 block font-medium" htmlFor="language">
                {t("Language")}
              </label>
              <select
                id="language"
                className="w-full cursor-pointer rounded-md border border-zinc-700 bg-zinc-800 px-3 py-2 text-zinc-100"
                value={i18n.language}
                onChange={(e) => {
                  i18n.changeLanguage(e.target.value);
                  setLocale(e.target.value as locale);
                }}
              >
                <option value="en">English</option>
                <option value="pt">Português</option>
                <option value="de">Deutsch</option>
              </select>
              <p className="mt-2 text-sm text-zinc-400">
                {t("SelectYourPreferredLanguage")}
              </p>
              <p className="mt-2 text-sm text-zinc-400">
                <span className="font-semibold">{t("NOTEColonSpace")}</span>
                {t("NoteMsg")}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <h2 className="mb-4 text-lg font-medium">{t("CVsManagement")}</h2>

          <div className="mb-6 flex flex-wrap gap-4">
            <button
              className="rounded-md bg-red-600 px-4 py-2 text-white hover:bg-red-700"
              onClick={() => {
                if (window.confirm(t("ConfirmDeleteAllCVsMessage"))) {
                  deleteAllCVs();
                  toast.success(t("AllCVsDeletedSuccessfully"));
                }
              }}
            >
              {t("DeleteAllCVs")}
            </button>

            <button
              className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
              onClick={() => {
                const dataStr =
                  "data:text/json;charset=utf-8," +
                  encodeURIComponent(JSON.stringify(cVs));

                const downloadAnchorNode = document.createElement("a");
                downloadAnchorNode.setAttribute("href", dataStr);
                downloadAnchorNode.setAttribute(
                  "download",
                  "cvmaker_backup.json",
                );
                document.body.appendChild(downloadAnchorNode);
                downloadAnchorNode.click();
                downloadAnchorNode.remove();
              }}
            >
              {t("DownloadCVsBackup")}
            </button>
          </div>

          <form
            id="upload-cv-backup-form"
            className="mb-6 flex flex-col gap-2"
            onSubmit={async (e) => handleImportCVs(e)}
          >
            <label className="mb-1 block font-medium" htmlFor="cv-backup">
              {t("UploadCVsBackup")}
            </label>

            <input
              type="file"
              id="cv-backup"
              accept=".json,application/json"
              className="w-full cursor-pointer rounded-md border border-zinc-700 bg-zinc-800 px-3 py-2 text-zinc-100"
            />

            <button
              type="submit"
              className="mt-2 w-fit rounded-md bg-green-600 px-4 py-2 text-white hover:bg-green-700"
            >
              {t("Upload")}
            </button>
          </form>

          <div className="grid gap-4">
            {cVs.length === 0 ? (
              <p className="text-zinc-400">{t("NoCVsFound")}</p>
            ) : (
              cVs.map((cv) => (
                <div
                  key={cv.id}
                  className="flex items-center justify-between rounded-lg border border-zinc-700 bg-zinc-800 p-4 shadow-sm"
                >
                  <div>
                    <p className="font-medium text-white">{cv.cVName}</p>
                    <p className="text-sm text-zinc-400">
                      {cv.firstName} {cv.lastName} • {cv.locale.toUpperCase()}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Link
                      className="rounded-md bg-yellow-600 px-3 py-1 text-white hover:bg-yellow-700"
                      to={`/edit/${cv.id}`}
                    >
                      {t("Edit")}
                    </Link>
                    <button
                      className="rounded-md bg-red-600 px-3 py-1 text-white hover:bg-red-700"
                      onClick={() => {
                        if (
                          window.confirm(
                            t("ConfirmDeleteCVMessage", { cvName: cv.cVName }),
                          )
                        ) {
                          deleteCV(cv.id);
                          toast.success(
                            t("CVDeletedSuccessfully", { cvName: cv.cVName }),
                          );
                        }
                      }}
                    >
                      {t("Delete")}
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
