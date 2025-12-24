import { useState } from "react";
import { useNavigate } from "react-router";

import RepeatableSection from "../components/RepeatableSection";
import { useCVsStore } from "../stores/cVsStore";
import type { CV } from "../types";
import { generateTimeBasedId } from "../utils";

export default function CreateCVPage() {
  const navigate = useNavigate();
  const { createCV } = useCVsStore();

  const [cV, setCV] = useState<CV>({
    id: "",
    cvName: "",
    firstName: "",
    lastName: "",
    middleName: null,
    nickname: null,
    avatar: null,
    contacts: { email: "", phone: "" },
    address: "",
    summary: "",
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
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const id = generateTimeBasedId();

    createCV({
      id,
      cvName: cV.cvName,
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

    navigate(`/edit/${id}`);
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 px-6 py-10">
      <div className="mx-auto max-w-2xl space-y-8">
        <div className="rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-4 py-3 text-sm font-medium text-emerald-300">
          🆕 You are <strong>creating a new CV</strong>
        </div>

        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6 shadow">
          <h1 className="mb-6 text-2xl font-semibold">Create CV</h1>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="mb-1 block text-sm text-zinc-400">
                CV name <span className="text-red-500">*</span>
              </label>
              <input
                value={cV.cvName}
                onChange={(e) => setCV({ ...cV, cvName: e.target.value })}
                required
                placeholder="e.g. Frontend Developer – EN"
                className="w-full rounded-md border border-zinc-700 bg-zinc-800 px-3 py-2 outline-none focus:border-indigo-500"
              />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm text-zinc-400">
                  First name <span className="text-red-500">*</span>
                </label>
                <input
                  value={cV.firstName}
                  onChange={(e) => setCV({ ...cV, firstName: e.target.value })}
                  required
                  placeholder="e.g. John"
                  className="w-full rounded-md border border-zinc-700 bg-zinc-800 px-3 py-2"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm text-zinc-400">
                  Last name <span className="text-red-500">*</span>
                </label>
                <input
                  value={cV.lastName}
                  onChange={(e) => setCV({ ...cV, lastName: e.target.value })}
                  required
                  placeholder="e.g. Doe"
                  className="w-full rounded-md border border-zinc-700 bg-zinc-800 px-3 py-2"
                />
              </div>
            </div>

            <div>
              <label className="mb-1 block text-sm text-zinc-400">
                Middle name
              </label>
              <input
                value={cV.middleName || ""}
                onChange={(e) =>
                  setCV({ ...cV, middleName: e.target.value || null })
                }
                placeholder="e.g. Michael"
                className="w-full rounded-md border border-zinc-700 bg-zinc-800 px-3 py-2"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm text-zinc-400">
                Nickname
              </label>
              <input
                value={cV.nickname || ""}
                onChange={(e) =>
                  setCV({ ...cV, nickname: e.target.value || null })
                }
                placeholder="e.g. Johnny"
                className="w-full rounded-md border border-zinc-700 bg-zinc-800 px-3 py-2"
              />
            </div>

            <div className="pt-4">
              <hr className="border-zinc-700" />
            </div>

            <div>
              <label className="mb-1 block text-sm text-zinc-400">
                Avatar URL
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      setCV({ ...cV, avatar: reader.result as string });
                    };
                    reader.readAsDataURL(file);
                  }
                }}
                className="w-full rounded-md border border-zinc-700 bg-zinc-800 px-3 py-2"
              />
              <div className="flex items-center space-x-4 mt-2">
                <div className="mt-2">
                  {cV.avatar && (
                    <img
                      src={cV.avatar}
                      alt="Avatar Preview"
                      className="h-20 w-20 rounded-full object-cover border border-zinc-700"
                    />
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => setCV({ ...cV, avatar: null })}
                  className="mt-2 text-sm text-red-500 hover:underline"
                >
                  Remove Avatar
                </button>
              </div>
            </div>

            <div className="pt-4">
              <hr className="border-zinc-700" />
            </div>

            <div>
              <label className="mb-1 block text-sm text-zinc-400">
                Contact Email
              </label>
              <input
                type="email"
                value={cV.contacts.email || ""}
                onChange={(e) =>
                  setCV({
                    ...cV,
                    contacts: { ...cV.contacts, email: e.target.value },
                  })
                }
                placeholder="e.g. foo@bar.com"
                className="w-full rounded-md border border-zinc-700 bg-zinc-800 px-3 py-2"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm text-zinc-400">
                Contact Phone
              </label>
              <input
                type="tel"
                value={cV.contacts.phone || ""}
                onChange={(e) =>
                  setCV({
                    ...cV,
                    contacts: { ...cV.contacts, phone: e.target.value },
                  })
                }
                placeholder="e.g. +1 234 567 890"
                className="w-full rounded-md border border-zinc-700 bg-zinc-800 px-3 py-2"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm text-zinc-400">
                Address
              </label>
              <input
                value={cV.address || ""}
                onChange={(e) => setCV({ ...cV, address: e.target.value })}
                placeholder="e.g. 123 Main St, City, Country"
                className="w-full rounded-md border border-zinc-700 bg-zinc-800 px-3 py-2"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm text-zinc-400">
                Summary
              </label>
              <textarea
                value={cV.summary || ""}
                onChange={(e) => setCV({ ...cV, summary: e.target.value })}
                placeholder="A brief summary about yourself"
                className="w-full rounded-md border border-zinc-700 bg-zinc-800 px-3 py-2"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm text-zinc-400">
                Objectives
              </label>
              <textarea
                value={cV.objectives || ""}
                onChange={(e) => setCV({ ...cV, objectives: e.target.value })}
                placeholder="Your career objectives"
                className="w-full rounded-md border border-zinc-700 bg-zinc-800 px-3 py-2"
              />
            </div>

            <div className="pt-4">
              <hr className="border-zinc-700" />
            </div>

            <RepeatableSection<CV["education"][number]>
              title="Education"
              items={cV.education}
              onChange={(education) => setCV({ ...cV, education })}
              emptyItem={{
                institution: "",
                degree: "",
                fieldOfStudy: "",
                startDate: "",
                endDate: null,
                grade: null,
                location: null,
                description: null,
              }}
              fields={[
                {
                  name: "institution",
                  label: "Institution",
                  type: "text",
                  required: true,
                  placeholder: "e.g. University of Example",
                },
                {
                  name: "degree",
                  label: "Degree",
                  type: "text",
                  required: true,
                  placeholder: "e.g. Bachelor of Science",
                },
                {
                  name: "fieldOfStudy",
                  label: "Field of Study",
                  type: "text",
                  required: true,
                  placeholder: "e.g. Computer Science",
                },
                {
                  name: "description",
                  label: "Description",
                  type: "textarea",
                  required: false,
                  placeholder: "A brief description",
                  rowsTextArea: 4,
                },
                {
                  name: "startDate",
                  label: "Start date",
                  type: "month",
                  required: true,
                  placeholder: "e.g. 2020-09",
                },
                {
                  name: "endDate",
                  label: "End date",
                  type: "month",
                  required: false,
                  placeholder: "e.g. 2024-06",
                },
                {
                  name: "location",
                  label: "Location",
                  type: "text",
                  required: false,
                  placeholder: "e.g. City, Country",
                },
                {
                  name: "grade",
                  label: "Grade",
                  type: "text",
                  required: false,
                  placeholder: "e.g. 3.8 GPA",
                },
              ]}
            />

            <div className="pt-4">
              <hr className="border-zinc-700" />
            </div>

            <RepeatableSection<CV["experience"][number]>
              title="Experience"
              items={cV.experience}
              onChange={(experience) => setCV({ ...cV, experience })}
              emptyItem={{
                company: "",
                position: "",
                startDate: "",
                endDate: null,
                responsibilities: null,
                location: null,
              }}
              fields={[
                {
                  name: "company",
                  label: "Company",
                  type: "text",
                  required: true,
                  placeholder: "e.g. Example Corp",
                },
                {
                  name: "position",
                  label: "Position",
                  type: "text",
                  required: true,
                  placeholder: "e.g. Software Engineer",
                },
                {
                  name: "startDate",
                  label: "Start date",
                  type: "month",
                  required: true,
                  placeholder: "e.g. 2020-09",
                },
                {
                  name: "endDate",
                  label: "End date",
                  type: "month",
                  required: false,
                  placeholder: "e.g. 2024-06",
                },
                {
                  name: "location",
                  label: "Location",
                  type: "text",
                  required: false,
                  placeholder: "e.g. City, Country",
                },
                {
                  name: "responsibilities",
                  label: "Responsibilities",
                  type: "textarea",
                  required: false,
                  placeholder:
                    "Describe your responsibilities and achievements",
                  rowsTextArea: 4,
                },
              ]}
            />

            <div className="pt-4">
              <hr className="border-zinc-700" />
            </div>

            <button
              type="submit"
              className="w-full rounded-md bg-indigo-600 px-4 py-2 font-medium transition hover:bg-indigo-500"
            >
              Create CV
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
