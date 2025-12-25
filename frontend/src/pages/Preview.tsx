import { useState } from "react";

import apiInstance from "../lib/apiInstance";
import { useCVsStore } from "../stores/cVsStore";
import type { CV } from "../types";

export default function PreviewPage() {
  const [html, setHtml] = useState<string>("");

  const [selectedCV, setSelectedCV] = useState<CV | null>(null);

  const { cVs } = useCVsStore();

  async function handleSubmitPreview() {
    if (!selectedCV) return;

    try {
      const response = await apiInstance.post("/cvs/preview", {
        templateId: selectedCV.id,
        ...selectedCV,
      });

      setHtml(response.data);
    } catch (error) {
      console.error("Error generating CV preview:", error);
    }
  }

  async function handleSubmitPdf() {
    if (!selectedCV) return;

    try {
      const response = await apiInstance.post<Blob>(
        "/cvs/pdf",
        {
          templateId: selectedCV.id,
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
      console.error("Error generating CV preview:", error);
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-zinc-950 px-6 py-10 text-zinc-100">
      <title>Preview - CV Maker</title>
      <h1 className="text-3xl font-semibold">Preview Page</h1>
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
            Select a CV to preview
          </option>
          {cVs.map((cv) => (
            <option key={cv.id} value={cv.id}>
              {cv.cVName}
            </option>
          ))}
        </select>
        <button
          className="w-full rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-500 disabled:opacity-50"
          onClick={handleSubmitPreview}
          disabled={!selectedCV}
        >
          Preview CV
        </button>

        <button
          className="w-full rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-500 disabled:opacity-50"
          onClick={handleSubmitPdf}
          disabled={!selectedCV}
        >
          Download PDF
        </button>
      </div>

      <iframe
        title="CV Preview"
        srcDoc={html}
        className="mt-6 h-[80vh] w-full rounded-lg border border-zinc-800 bg-white p-4 shadow-lg sm:max-w-4/5"
      ></iframe>
    </main>
  );
}
