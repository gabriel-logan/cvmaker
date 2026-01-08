import type { CV } from "./types";

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
