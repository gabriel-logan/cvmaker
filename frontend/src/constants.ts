import type { CV, TemplateIds } from "./types";

export const cVsStorageKey = "cvs-storage";

export const userStorageKey = "user-storage";

export const maxTimeoutMs = 4 * 60000; // 4 minutes

export const emptyCV: CV = {
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
};

export const templatesOptions: Array<{ id: TemplateIds; name: string }> = [
  {
    id: "template1",
    name: "Template 1",
  },
  {
    id: "template2",
    name: "Template 2",
  },
  {
    id: "template3",
    name: "Template 3",
  },
  {
    id: "template4",
    name: "Template 4",
  },
  {
    id: "template5",
    name: "Template 5 - Gabriel Logan",
  },
];
