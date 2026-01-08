export type locale = "en" | "pt" | "de";

export type locales = locale[];

export interface CV {
  id: string;
  cVName: string;

  locale: locale;

  firstName: string;
  middleName: string | null;
  lastName: string;
  nickname: string | null;
  avatar: string | null;
  contacts: {
    email: string | null;
    phone: string | null;
  };
  address: string | null;
  summary: string | null;
  objectives: string | null;
  education: Array<{
    institution: string;
    degree: string;
    fieldOfStudy: string;
    startDate: string;
    endDate: string | null;
    grade: string | null;
    description: string | null;
    location: string | null;
  }>;
  experience: Array<{
    company: string;
    position: string;
    startDate: string;
    endDate: string | null;
    responsibilities: string | null;
    location: string | null;
  }>;
  skills: Array<{
    name: string;
    level: string | null;
  }>;
  projects: Array<{
    name: string;
    description: string;
    startDate: string;
    endDate: string | null;
    link: string | null;
    location: string | null;
  }>;
  certifications: Array<{
    name: string;
    issuingOrganization: string;
    issueDate: string;
    expirationDate: string | null;
    credentialID: string | null;
    credentialURL: string | null;
  }>;
  languages: Array<{
    name: string;
    proficiency: string;
  }>;
  hobbies: Array<{
    description: string;
  }>;
  additionalInfo: string | null;
  otherExperiences: Array<{
    title: string;
    description: string;
    startDate: string | null;
    endDate: string | null;
    location: string | null;
  }>;
  references: Array<{
    name: string;
    relationship: string | null;
    contactInfo: string | null;
  }>;
  links: Array<{
    label: string;
    url: string;
  }>;

  createdAt: number;
  updatedAt: number;
}

export type TemplateIds = "template1" | "template2" | "template3" | "template4";
