import { useState } from "react";
import { toast } from "react-toastify";

import apiInstance from "../lib/apiInstance";

export default function SendStaticPage() {
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    if (!file) {
      toast.info(
        "Please upload a static HTML template file before submitting.",
      );
      return;
    }

    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("template", file);

      const response = await apiInstance.post<Blob>(
        "/cvs/pdf-from-static",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          responseType: "blob",
        },
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "cv.pdf");
      document.body.appendChild(link);
      link.click();
      link.parentNode?.removeChild(link);
      window.URL.revokeObjectURL(url);

      setFile(null);

      toast.success("PDF generated successfully from static HTML template!");
    } catch (error) {
      console.error("Error generating PDF from static HTML template:", error);
      toast.error(
        "Failed to generate PDF from static HTML template. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center bg-zinc-950 px-6 py-10 text-zinc-100">
      <h1 className="mb-6 text-3xl font-semibold">Send Static Page</h1>
      <p>This is the Send Static page.</p>
      <p>Here you can send static html template file to generate your PDF cv</p>
      <div className="mt-6 w-full max-w-md rounded-md border-2 border-dashed border-zinc-700 p-6 text-center">
        <form
          className="flex flex-col items-center"
          onSubmit={handleSubmit}
          aria-disabled={isLoading}
        >
          <label
            htmlFor="file-upload"
            className="cursor-pointer rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
          >
            Upload Static HTML Template
            <input
              id="file-upload"
              type="file"
              accept=".html"
              className="sr-only"
              disabled={isLoading}
              onChange={(e) =>
                setFile(e.target.files ? e.target.files[0] : null)
              }
            />
          </label>
          {file && (
            <p className="mt-4 text-zinc-300">Selected file: {file.name}</p>
          )}

          <button
            type="submit"
            className="mt-4 rounded-md bg-green-600 px-4 py-2 text-white hover:bg-green-700"
            disabled={isLoading}
          >
            Download PDF
          </button>
        </form>
      </div>
    </main>
  );
}
