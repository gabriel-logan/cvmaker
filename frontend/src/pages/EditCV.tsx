import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";

import FormSection from "../components/FormSection";
import { useCVsStore } from "../stores/cVsStore";
import type { CV } from "../types";
import NotFoundPage from "./NotFound";

export default function EditCVPage() {
  const { t } = useTranslation();

  const { id } = useParams<{ id: string }>();
  const { cVs, updateCV, deleteCV } = useCVsStore();

  const navigate = useNavigate();

  const cVFinded = cVs.find((cV) => cV.id === id);

  const [cV, setCV] = useState<CV>({
    id: cVFinded?.id || "",
    cVName: cVFinded?.cVName || "",
    locale: cVFinded?.locale || "en",
    firstName: cVFinded?.firstName || "",
    lastName: cVFinded?.lastName || "",
    middleName: cVFinded?.middleName || null,
    nickname: cVFinded?.nickname || null,
    avatar: cVFinded?.avatar || null,
    contacts: cVFinded?.contacts || { email: null, phone: null },
    address: cVFinded?.address || null,
    summary: cVFinded?.summary || null,
    objectives: cVFinded?.objectives || null,
    education: cVFinded?.education || [],
    experience: cVFinded?.experience || [],
    skills: cVFinded?.skills || [],
    projects: cVFinded?.projects || [],
    certifications: cVFinded?.certifications || [],
    languages: cVFinded?.languages || [],
    hobbies: cVFinded?.hobbies || [],
    additionalInfo: cVFinded?.additionalInfo || null,
    otherExperiences: cVFinded?.otherExperiences || [],
    references: cVFinded?.references || [],
    links: cVFinded?.links || [],
    createdAt: cVFinded?.createdAt || 0,
    updatedAt: cVFinded?.updatedAt || 0,
  });

  function handleSubmit(e: React.FormEvent, cVFindedId: CV["id"]) {
    e.preventDefault();

    updateCV(cVFindedId, {
      cVName: cV.cVName,
      locale: cV.locale,
      firstName: cV.firstName,
      lastName: cV.lastName,
      middleName: cV.middleName,
      nickname: cV.nickname,
      avatar: cV.avatar,
      contacts: cV.contacts,
      address: cV.address,
      summary: cV.summary,
      objectives: cV.objectives,
      education: cV.education,
      experience: cV.experience,
      skills: cV.skills,
      projects: cV.projects,
      certifications: cV.certifications,
      languages: cV.languages,
      hobbies: cV.hobbies,
      additionalInfo: cV.additionalInfo,
      otherExperiences: cV.otherExperiences,
      references: cV.references,
      links: cV.links,
      updatedAt: Date.now(),
    });

    toast.success(t("CVUpdatedSuccessfully"));
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
    <main className="min-h-screen bg-zinc-950 px-6 py-10 text-zinc-100">
      <title>Edit CV - CV Maker</title>

      <div className="mx-auto max-w-2xl space-y-8 sm:max-w-5xl">
        <div className="rounded-lg border border-yellow-500/40 bg-yellow-500/10 px-4 py-3 text-sm font-medium text-yellow-300">
          ✏️ {t("YouAre'Singular'")} <strong>editing</strong> the CV:
          <span className="ml-1 underline">{cV.cVName}</span>
        </div>

        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6 shadow">
          <div>
            <div className="mb-6 flex items-center justify-between">
              <h1 className="text-2xl font-semibold">{t("EditCV")}</h1>
              <button
                onClick={() => handleDelete(cVFinded.id)}
                className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-500"
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
