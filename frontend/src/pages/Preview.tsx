import { useState } from "react";
import { toast } from "react-toastify";

import apiInstance from "../lib/apiInstance";
import { useCVsStore } from "../stores/cVsStore";
import type { CV, TemplateIds } from "../types";

export default function PreviewPage() {
  const [html, setHtml] = useState<string>("");

  const [selectedCV, setSelectedCV] = useState<CV | null>(null);
  const [selectedTemplateId, setSelectedTemplateId] =
    useState<TemplateIds | null>(null);

  const [isPreviewLoading, setIsPreviewLoading] = useState(false);
  const [isPdfLoading, setIsPdfLoading] = useState(false);

  const { cVs } = useCVsStore();

  async function handleSubmitPreview(selectedCV: CV | null) {
    if (!selectedCV || !selectedTemplateId) return;

    setIsPreviewLoading(true);

    setHtml("");

    try {
      const response = await apiInstance.post("/cvs/preview", {
        templateId: selectedTemplateId,
        ...selectedCV,
      });

      setHtml(response.data);
    } catch (error) {
      console.error("Error generating CV preview:", error);
    } finally {
      setIsPreviewLoading(false);
    }
  }

  async function handleSubmitPdf() {
    if (!selectedCV || !selectedTemplateId) {
      return toast.error("Please select a CV and a template.");
    }

    setIsPdfLoading(true);

    try {
      const response = await apiInstance.post<Blob>(
        "/cvs/pdf",
        {
          templateId: selectedTemplateId,
          ...selectedCV,
        },
        {
          responseType: "blob",
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
    } finally {
      setIsPdfLoading(false);
    }
  }

  const isAnyLoading = isPreviewLoading || isPdfLoading;

  return (
    <main className="flex min-h-screen flex-col items-center bg-zinc-950 px-6 py-10 text-zinc-100">
      <title>Preview - CV Maker</title>

      <h1 className="text-3xl font-semibold">Preview Page</h1>

      <div className="mt-6 flex w-full max-w-md flex-col gap-4">
        <select
          className="w-full rounded-md border border-zinc-700 bg-zinc-900 px-4 py-2 text-zinc-100 focus:border-indigo-500 focus:outline-none"
          value={selectedCV?.id || ""}
          onChange={(e) => {
            const cv = cVs.find((cv) => cv.id === e.target.value) || null;
            setSelectedCV(cv);

            handleSubmitPreview(cv);
          }}
        >
          <option value="" disabled>
            Select a CV to preview
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

            handleSubmitPreview(selectedCV);
          }}
        >
          <option value="" disabled>
            Select a template
          </option>
          <option value="template1">Template 1</option>
          <option value="template2">Template 2</option>
          <option value="template3">Template 3</option>
        </select>

        <button
          className="w-full rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-500 disabled:opacity-50"
          onClick={handleSubmitPdf}
          disabled={!selectedCV || isAnyLoading}
        >
          {isPdfLoading ? "Generating PDF..." : "Download PDF"}
        </button>
      </div>

      <div className="relative mt-6 h-[80vh] w-full sm:max-w-4/5">
        {(isPreviewLoading || !html) && (
          <div className="absolute inset-0 z-10 flex items-center justify-center rounded-lg bg-zinc-900/80">
            <div className="flex flex-col items-center gap-3">
              <div className="h-10 w-10 animate-spin rounded-full border-4 border-indigo-500 border-t-transparent" />
              <span className="text-sm text-zinc-300">
                {isPreviewLoading
                  ? "Generating preview..."
                  : "Preview will appear here"}
              </span>
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
