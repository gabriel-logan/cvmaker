import { useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

import apiInstance from "../lib/apiInstance";
import { useCVsStore } from "../stores/cVsStore";
import type { CV, TemplateIds } from "../types";

export default function PreviewPage() {
  const { t } = useTranslation();

  const { cVs } = useCVsStore();

  const [isLoading, setIsLoading] = useState(false);

  const [html, setHtml] = useState<string>("");
  const [selectedCV, setSelectedCV] = useState<CV | null>(null);
  const [downloadProgress, setDownloadProgress] = useState<number>(0);
  const [selectedTemplateId, setSelectedTemplateId] =
    useState<TemplateIds | null>(null);

  async function handleSubmitPreview(
    selectedCV: CV | null,
    selectedTemplateId: TemplateIds | null,
  ) {
    if (!selectedCV || !selectedTemplateId) return;

    setIsLoading(true);
    setHtml("");

    try {
      const response = await apiInstance.post("/cvs/preview", {
        ...selectedCV,
        templateId: selectedTemplateId,
      });

      setHtml(response.data);
    } catch (error) {
      console.error("Error generating CV preview:", error);
      if (error instanceof AxiosError) {
        toast.error(
          error.response?.data.message || t("FailedToGeneratePreview"),
        );
      } else {
        toast.error(t("FailedToGeneratePreview"));
      }
    } finally {
      setIsLoading(false);
    }
  }

  async function handleSubmitPdf() {
    if (!selectedCV || !selectedTemplateId) {
      return toast.error(t("PleaseSelectACVAndTemplate"));
    }

    setIsLoading(true);
    setDownloadProgress(0);

    try {
      const response = await apiInstance.post<Blob>(
        "/cvs/pdf",
        {
          templateId: selectedTemplateId,
          ...selectedCV,
        },
        {
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

      const blob = new Blob([response.data], {
        type: "application/pdf",
      });

      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `${selectedCV.cVName || "cv"}.pdf`;
      document.body.appendChild(link);
      link.click();

      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error generating CV pdf:", error);
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message || t("FailedToGeneratePDF"));
      } else {
        toast.error(t("FailedToGeneratePDF"));
      }
    } finally {
      setIsLoading(false);
      setDownloadProgress(0);
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center bg-zinc-950 px-6 py-10 text-zinc-100">
      <title>Preview - CV Maker</title>

      {isLoading && downloadProgress > 0 && (
        <div className="z-50 mt-2 w-full">
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

      <h1 className="text-3xl font-semibold">{t("PreviewPageTitle")}</h1>
      <p className="mt-2 text-zinc-400">{t("PreviewPageDescription")}</p>

      <div className="mt-6 flex w-full max-w-md flex-col gap-4">
        <select
          className="w-full rounded-md border border-zinc-700 bg-zinc-900 px-4 py-2 text-zinc-100 focus:border-indigo-500 focus:outline-none"
          value={selectedCV?.id || ""}
          onChange={(e) => {
            const cv = cVs.find((cv) => cv.id === e.target.value) || null;
            setSelectedCV(cv);

            handleSubmitPreview(cv, selectedTemplateId);
          }}
        >
          <option value="" disabled>
            {t("SelectACVToPreview")}
          </option>
          {cVs.map((cv) => (
            <option key={cv.id} value={cv.id}>
              {cv.cVName}
            </option>
          ))}
        </select>

        <select
          className="w-full rounded-md border border-zinc-700 bg-zinc-900 px-4 py-2 text-zinc-100 focus:border-indigo-500 focus:outline-none"
          value={selectedTemplateId ?? ""}
          onChange={(e) => {
            const templateId = e.target.value as TemplateIds;
            setSelectedTemplateId(templateId);

            handleSubmitPreview(selectedCV, templateId);
          }}
        >
          <option value="" disabled>
            {t("SelectATemplate")}
          </option>
          <option value="template1">Template 1</option>
          <option value="template2">Template 2</option>
          <option value="template3">Template 3</option>
          <option value="template4">Template 4</option>
        </select>

        <button
          className="w-full rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-500 disabled:opacity-50"
          onClick={handleSubmitPdf}
          disabled={!selectedCV || isLoading}
        >
          {isLoading ? t("GeneratingPDFDotDotDot") : t("DownloadPDF")}
        </button>
      </div>

      <div className="relative mt-6 h-[80vh] w-full sm:max-w-4/5">
        {(isLoading || !html) && (
          <div className="absolute inset-0 z-10 flex items-center justify-center rounded-lg bg-zinc-900/80">
            <div className="flex flex-col items-center gap-3">
              {isLoading ? (
                <>
                  <div className="h-10 w-10 animate-spin rounded-full border-4 border-indigo-500 border-t-transparent" />
                  <span className="text-sm text-zinc-300">
                    {t("GeneratingPDFDotDotDot")}
                  </span>
                </>
              ) : (
                <span className="text-sm text-zinc-300">
                  {t("PreviewWillAppearHere")}
                </span>
              )}
            </div>
          </div>
        )}

        <iframe
          title="CV Preview"
          srcDoc={html}
          className="h-full w-full rounded-lg border border-zinc-800 bg-white shadow-lg"
        />
      </div>
    </main>
  );
}
