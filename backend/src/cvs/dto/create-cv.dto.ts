import { IsString } from "class-validator";

export class CreateCvDto {
  @IsString()
  public templateId: string;

  public id: string;
  public cVName: string;

  public firstName: string;
  public middleName: string | null;
  public lastName: string;
  public nickname: string | null;
  public avatar: string | null;
  public contacts: {
    email: string | null;
    phone: string | null;
  };
  public address: string | null;
  public summary: string | null;
  public objectives: string | null;
  public education: Array<{
    institution: string;
    degree: string;
    fieldOfStudy: string;
    startDate: string;
    endDate: string | null;
    grade: string | null;
    description: string | null;
    location: string | null;
  }>;
  public pexperience: Array<{
    company: string;
    position: string;
    startDate: string;
    endDate: string | null;
    responsibilities: string | null;
    location: string | null;
  }>;
  public skills: Array<{
    name: string;
    level: string | null;
  }>;
  public projects: Array<{
    name: string;
    description: string;
    startDate: string;
    endDate: string | null;
    link: string | null;
    location: string | null;
  }>;
  public certifications: Array<{
    name: string;
    issuingOrganization: string;
    issueDate: string;
    expirationDate: string | null;
    credentialID: string | null;
    credentialURL: string | null;
  }>;
  public languages: Array<{
    name: string;
    proficiency: string;
  }>;
  public hobbies: Array<{
    description: string;
  }>;
  public additionalInfo: string | null;
  public otherExperiences: Array<{
    title: string;
    description: string;
    startDate: string | null;
    endDate: string | null;
    location: string | null;
  }>;
  public references: Array<{
    name: string;
    relationship: string | null;
    contactInfo: string | null;
  }>;
  public links: Array<{
    label: string;
    url: string;
  }>;

  public createdAt: number;
  public updatedAt: number;
}
