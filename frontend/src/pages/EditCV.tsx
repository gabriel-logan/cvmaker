import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";

import FormSection from "../components/FormSection";
import { useCVsStore } from "../stores/cVsStore";
import { type CV, emptyCV } from "../types";
import { generateTimeBasedId } from "../utils/generals";
import { validateCVFormSubmit } from "../utils/validations";
import NotFoundPage from "./NotFound";

export default function EditCVPage() {
  const { t } = useTranslation();

  const navigate = useNavigate();

  const { id } = useParams<{ id: string }>();

  const { cVs, updateCV, deleteCV, createCV } = useCVsStore();

  const cVFinded = cVs.find((cV) => cV.id === id);

  const [cV, setCV] = useState<CV>(emptyCV);

  function handleSubmit(e: React.FormEvent, cVFindedId: CV["id"]) {
    e.preventDefault();

    try {
      const validation = validateCVFormSubmit(cV);

      if (!validation.valid) {
        validation.errors.forEach((error) => {
          toast.error(error);
        });
        return;
      }

      updateCV(cVFindedId, { ...cV, updatedAt: Date.now() });

      toast.success(t("CVUpdatedSuccessfully"));
    } catch {
      toast.error("Error updating CV");
    }
  }

  function handleDelete(cvFindedId: CV["id"]) {
    if (confirm(t("DeleteCVConfirmation", { cvName: cV.cVName }))) {
      deleteCV(cvFindedId);

      toast.success(t("DeleteCVSuccess"));

      navigate("/");
    } else {
      toast.info(t("DeleteCVCancelled"), { autoClose: 1000 });
    }
  }

  const handleCloneCV = () => {
    try {
      const newId = generateTimeBasedId();

      createCV({
        ...cV,
        id: newId,
        cVName: `${cV.cVName} (Clone)`,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      });

      toast.success(t("CloneCVSuccess"));
      navigate(`/edit/${newId}`);

      // Reload to ensure the cloned CV data is fully loaded
      setTimeout(() => window.location.reload(), 750);
    } catch {
      toast.error("Error cling CV");
    }
  };

  if (!cVFinded) {
    return (
      <NotFoundPage
        title={t("CVNotFound")}
        subtitle={t("CVDoesNotExist")}
        description={t("TheCVYouAreLookingForDoesNotExist")}
      />
    );
  }

  return (
    <main className="min-h-screen bg-zinc-950 px-4 py-6 text-zinc-100 sm:px-6 sm:py-10">
      <title>Edit CV - CV Maker</title>

      <div className="mx-auto max-w-5xl space-y-6">
        <div className="rounded-lg border border-yellow-500/40 bg-yellow-500/10 px-4 py-3 text-sm font-medium text-yellow-300">
          ✏️ {t("YouAre'SingularState'")} <strong>editing</strong>:
          <span className="ml-1 underline">{cV.cVName}</span>
        </div>

        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4 shadow sm:p-6">
          <div className="mb-4 border-b border-zinc-800 pb-4">
            <button
              onClick={() => navigate("/")}
              className="inline-flex items-center gap-2 text-sm text-zinc-400 transition hover:text-zinc-200"
            >
              <span className="text-lg">←</span>
              {t("GoBackHome")}
            </button>
          </div>

          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <h1 className="text-2xl font-semibold">{t("EditCV")}</h1>

            <div className="flex flex-col gap-2 sm:flex-row sm:gap-3">
              <button
                onClick={(e) => handleSubmit(e, cVFinded.id)}
                className="inline-flex w-full items-center justify-center rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-500 active:scale-[0.98] sm:w-auto"
              >
                {t("UpdateCVData")}
              </button>

              <button
                onClick={handleCloneCV}
                className="inline-flex w-full items-center justify-center rounded-lg border border-zinc-700 bg-zinc-800 px-5 py-2.5 text-sm font-medium text-zinc-200 transition hover:bg-zinc-700 active:scale-[0.98] sm:w-auto"
              >
                {t("CloneCV")}
              </button>

              <button
                onClick={() => handleDelete(cVFinded.id)}
                className="inline-flex w-full items-center justify-center rounded-lg border border-red-500/40 bg-red-500/10 px-5 py-2.5 text-sm font-medium text-red-400 transition hover:bg-red-500/20 active:scale-[0.98] sm:w-auto"
              >
                {t("DeleteCV")}
              </button>
            </div>
          </div>

          <FormSection
            cV={cV}
            setCV={setCV}
            handleSubmit={(e) => handleSubmit(e, cVFinded.id)}
            buttonTitle={t("UpdateCVData")}
          />
        </div>
      </div>
    </main>
  );
}
