import { useEffect, useState } from "react";

import apiInstance from "../lib/apiInstance";
import { useCVsStore } from "../stores/cVsStore";

export default function PreviewPage() {
  const [html, setHtml] = useState<string>("");
  const { cVs } = useCVsStore();

  useEffect(() => {
    async function loadPreview() {
      const response = await apiInstance.post("/cvs/preview", {
        ...cVs[0],
        templateId: "awd",
      });

      setHtml(response.data);
    }

    loadPreview();
  }, [cVs]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-zinc-950 px-6 py-10 text-zinc-100">
      <title>Preview - CV Maker</title>
      <h1 className="text-3xl font-semibold">Preview Page</h1>
      <iframe
        title="CV Preview"
        srcDoc={html}
        className="mt-6 h-[80vh] w-full rounded-lg border border-zinc-800 bg-white p-4 shadow-lg"
      ></iframe>
    </main>
  );
}
