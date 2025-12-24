import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";

import FormSection from "../components/FormSection";
import { useCVsStore } from "../stores/cVsStore";
import type { CV } from "../types";

export default function EditCVPage() {
  const { id } = useParams<{ id: string }>();
  const { cvs, updateCV, deleteCV } = useCVsStore();

  const navigate = useNavigate();

  const cVFinded = cvs.find((cv) => cv.id === id);

  const [cV, setCV] = useState<CV>({
    id: cVFinded?.id || "",
    cVName: cVFinded?.cVName || "",
    firstName: cVFinded?.firstName || "",
    lastName: cVFinded?.lastName || "",
    middleName: cVFinded?.middleName || null,
    nickname: cVFinded?.nickname || null,
    avatar: cVFinded?.avatar || null,
    contacts: cVFinded?.contacts || { email: "", phone: "" },
    address: cVFinded?.address || "",
    summary: cVFinded?.summary || "",
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
  });

  function handleSubmit(e: React.FormEvent, cVFindedId: CV["id"]) {
    e.preventDefault();

    updateCV(cVFindedId, {
      cVName: cV.cVName,
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
    });

    toast.success("CV updated successfully.");
  }

  function handleDelete(cvFindedId: CV["id"]) {
    if (confirm("Are you sure you want to delete this CV?")) {
      deleteCV(cvFindedId);

      toast.success("CV deleted successfully.");

      navigate("/");
    } else {
      toast.info("CV deletion cancelled.", { autoClose: 1000 });
    }
  }

  if (!cVFinded) {
    return (
      <main className="min-h-screen bg-zinc-950 text-zinc-100 p-10">
        CV not found
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 px-6 py-10">
      <div className="mx-auto sm:max-w-5xl max-w-2xl space-y-8">
        <div className="rounded-lg border border-yellow-500/40 bg-yellow-500/10 px-4 py-3 text-sm font-medium text-yellow-300">
          ✏️ You are <strong>editing</strong> the CV:
          <span className="ml-1 underline">{cV.cVName}</span>
        </div>

        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6 shadow">
          <div>
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-semibold">Edit CV</h1>
              <button
                onClick={() => handleDelete(cVFinded.id)}
                className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-500 transition"
              >
                Delete CV
              </button>
            </div>
          </div>

          <FormSection
            cV={cV}
            setCV={setCV}
            handleSubmit={(e) => handleSubmit(e, cVFinded.id)}
            buttonTitle="Update CV Data"
          />
        </div>
      </div>
    </main>
  );
}
