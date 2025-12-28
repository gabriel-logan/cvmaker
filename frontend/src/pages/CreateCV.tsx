import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

import FormSection from "../components/FormSection";
import { useCVsStore } from "../stores/cVsStore";
import type { CV } from "../types";
import { generateTimeBasedId } from "../utils";

export default function CreateCVPage() {
  const { t } = useTranslation();

  const navigate = useNavigate();
  const { createCV } = useCVsStore();

  const [cV, setCV] = useState<CV>({
    id: "",
    cVName: "",
    locale: "en",
    firstName: "",
    lastName: "",
    middleName: null,
    nickname: null,
    avatar: null,
    contacts: { email: null, phone: null },
    address: null,
    summary: null,
    objectives: null,
    education: [],
    experience: [],
    skills: [],
    projects: [],
    certifications: [],
    languages: [],
    hobbies: [],
    additionalInfo: null,
    otherExperiences: [],
    references: [],
    links: [],
    createdAt: 0,
    updatedAt: 0,
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const id = generateTimeBasedId();

    const now = Date.now();

    createCV({
      id,
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
      createdAt: now,
      updatedAt: now,
    });

    toast.success(t("CVCreatedSuccessfully"));

    navigate(`/edit/${id}`);
  }

  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-10 text-zinc-100">
      <title>Create CV - CV Maker</title>

      <div className="mx-auto max-w-2xl space-y-8 sm:max-w-5xl">
        <div className="rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-4 py-3 text-sm font-medium text-emerald-300">
          🆕 {t("YouAre'Singular'")} <strong>{t("CreatingANewCV")}</strong>
        </div>

        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6 shadow">
          <h1 className="mb-6 text-2xl font-semibold">{t("CreateCV")}</h1>
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
