import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FiCpu, FiDownload, FiSend } from "react-icons/fi";
import { toast } from "react-toastify";

import apiInstance from "../lib/apiInstance";
import { useCVsStore } from "../stores/cVsStore";
import type { CV } from "../types";
import getAxiosErrorMessage from "../utils/getAxiosErrorMessage";

export default function AIGeneratePage() {
  const { t } = useTranslation();

  const { cVs } = useCVsStore();

  const [selectedCV, setSelectedCV] = useState<CV | null>(null);
  const [prompt, setPrompt] = useState("");
  const [html, setHtml] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);

  async function handleGenerate() {
    if (!selectedCV) {
      return toast.error(t("PleaseSelectACVToGenerate"));
    }

    if (!prompt.trim()) {
      return toast.error(t("PleaseEnterAPrompt"));
    }

    setIsLoading(true);
    setHtml("");

    try {
      const response = await apiInstance.post<{ html: string }>(
        "/ai/generate-template",
        {
          prompt: prompt.trim(),
          cvData: selectedCV,
        },
      );

      setHtml(response.data.html);
      toast.success(t("TemplateGeneratedSuccessfully"));
    } catch (error) {
      const errorMessage = getAxiosErrorMessage(
        error,
        t("FailedToGenerateTemplate"),
      );

      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleDownloadPdf() {
    if (!html) {
      return toast.error(t("GenerateTemplateFirst"));
    }

    setIsLoading(true);
    setDownloadProgress(0);

    try {
      const response = await apiInstance.post<Blob>(
        "/cvs/pdf-from-static",
        {
          file: new File([html], "template.html", { type: "text/html" }),
        },
        {
          headers: { "Content-Type": "multipart/form-data" },
          responseType: "blob",
          onDownloadProgress: (progressEvent) => {
            if (!progressEvent.total) return;

            const percent = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total,
            );

            setDownloadProgress(percent);
          },
        },
      );

      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = globalThis.URL.createObjectURL(blob);
      const link = document.createElement("a");

      link.href = url;
      link.download = `${selectedCV?.cVName || "cv"}.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      globalThis.URL.revokeObjectURL(url);
    } catch (error) {
      const errorMessage = getAxiosErrorMessage(
        error,
        t("FailedToGeneratePDF"),
      );

      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
      setDownloadProgress(0);
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center bg-zinc-950 px-6 py-10 text-zinc-100">
      <title>AI Generate - CV Maker</title>

      {isLoading && downloadProgress > 0 && (
        <div className="z-50 mt-2 w-full max-w-md">
          <div className="mb-1 flex justify-between text-xs text-zinc-400">
            <span>{t("DownloadingPDF")}</span>
            <span>{downloadProgress}%</span>
          </div>

          <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-800">
            <div
              className="h-full bg-indigo-500 transition-all duration-150"
              style={{ width: `${downloadProgress}%` }}
            />
          </div>
        </div>
      )}

      <h1 className="text-3xl font-semibold">{t("AiGeneratePageTitle")}</h1>
      <p className="mt-2 text-zinc-400">{t("AiGeneratePageDescription")}</p>

      <div className="mt-6 flex w-full max-w-md flex-col gap-4">
        <select
          className="w-full rounded-md border border-zinc-700 bg-zinc-900 px-4 py-2 text-zinc-100 focus:border-indigo-500 focus:outline-none"
          value={selectedCV?.id || ""}
          onChange={(e) => {
            const cv = cVs.find((cv) => cv.id === e.target.value) || null;

            setSelectedCV(cv);
          }}
        >
          <option value="" disabled>
            {t("SelectACV")}
          </option>
          {cVs.map((cv) => (
            <option key={cv.id} value={cv.id}>
              {cv.cVName}
            </option>
          ))}
        </select>

        <textarea
          className="min-h-[120px] w-full resize-y rounded-md border border-zinc-700 bg-zinc-900 px-4 py-3 text-zinc-100 placeholder-zinc-500 focus:border-indigo-500 focus:outline-none"
          placeholder={t("PromptPlaceholder")}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />

        <button
          className="flex items-center justify-center gap-2 rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-500 disabled:opacity-50"
          onClick={handleGenerate}
          disabled={!selectedCV || !prompt.trim() || isLoading}
        >
          {isLoading ? (
            <>
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              {t("GeneratingTemplate")}
            </>
          ) : (
            <>
              <FiCpu />
              {t("GenerateTemplate")}
            </>
          )}
        </button>

        {html && (
          <button
            className="flex items-center justify-center gap-2 rounded-md bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-500 disabled:opacity-50"
            onClick={handleDownloadPdf}
            disabled={isLoading}
          >
            <FiDownload />
            {t("DownloadPDF")}
          </button>
        )}
      </div>

      <div className="relative mt-6 h-[80vh] w-full sm:max-w-4/5">
        {!html && !isLoading && (
          <div className="flex h-full items-center justify-center rounded-lg border border-dashed border-zinc-700">
            <div className="flex flex-col items-center gap-3 text-zinc-500">
              <FiSend size={32} />
              <span className="text-sm">{t("NoTemplateGeneratedYet")}</span>
            </div>
          </div>
        )}

        {isLoading && !html && (
          <div className="flex h-full items-center justify-center rounded-lg bg-zinc-900/80">
            <div className="flex flex-col items-center gap-3">
              <div className="h-10 w-10 animate-spin rounded-full border-4 border-indigo-500 border-t-transparent" />
              <span className="text-sm text-zinc-300">
                {t("GeneratingTemplate")}
              </span>
            </div>
          </div>
        )}

        {html && (
          <iframe
            title="AI Generated CV"
            srcDoc={html}
            className="h-full w-full rounded-lg border border-zinc-800 bg-white shadow-lg"
          />
        )}
      </div>
    </main>
  );
}
