import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

import FormSection from "../components/FormSection";
import { useCVsStore } from "../stores/cVsStore";
import { type CV, emptyCV } from "../types";
import { generateTimeBasedId } from "../utils/generals";
import { validateCVFormSubmit } from "../utils/validations";

export default function CreateCVPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { createCV } = useCVsStore();

  const [cV, setCV] = useState<CV>(emptyCV);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const validation = validateCVFormSubmit(cV);

      if (!validation.valid) {
        validation.errors.forEach((error) => {
          toast.error(error);
        });
        return;
      }

      const id = generateTimeBasedId();
      const now = Date.now();

      createCV({ ...cV, id, createdAt: now, updatedAt: now });

      toast.success(t("CVCreatedSuccessfully"));
      navigate(`/edit/${id}`);
    } catch {
      toast.error("Error Creating CV");
    }
  }

  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-10 text-zinc-100">
      <title>Create CV - CV Maker</title>

      <div className="mx-auto max-w-2xl space-y-8 sm:max-w-5xl">
        <div className="rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-4 py-3 text-sm font-medium text-emerald-300">
          🆕 {t("YouAre'SingularState'")} <strong>{t("CreatingANewCV")}</strong>
        </div>

        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6 shadow">
          <div className="mb-4 border-b border-zinc-800 pb-4">
            <button
              onClick={() => navigate("/")}
              className="text-zinc-400 transition hover:text-zinc-200"
            >
              ← {t("GoBackHome")}
            </button>
          </div>

          <div className="mb-6 flex items-center justify-between">
            <h1 className="mb-6 text-2xl font-semibold">{t("CreateCV")}</h1>

            <button
              onClick={(e) => handleSubmit(e)}
              className="mr-4 rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-500"
            >
              {t("CreateCVData")}
            </button>
          </div>

          <FormSection
            cV={cV}
            setCV={setCV}
            handleSubmit={handleSubmit}
            buttonTitle={t("CreateCVData")}
          />
        </div>
      </div>
    </main>
  );
}
