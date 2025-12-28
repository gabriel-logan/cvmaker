import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";

import { CvsService } from "./cvs.service";
import type { CreateCVDto } from "./dto/create-cv.dto";

describe("CvsService", () => {
  let service: CvsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CvsService],
    }).compile();

    service = module.get<CvsService>(CvsService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("createCVPreview", () => {
    it("should create a CV preview", () => {
      const cvData: CreateCVDto = {
        id: "1",
        templateId: "template1",
        locale: "en",
        cVName: "John's CV",
        firstName: "John",
        lastName: "Doe",
        middleName: null,
        nickname: null,
        contacts: {
          email: null,
          phone: null,
        },
        address: null,
        avatar: null,
        experience: [],
        education: [],
        skills: [],
        projects: [],
        certifications: [],
        languages: [],
        hobbies: [],
        summary: null,
        additionalInfo: null,
        links: [],
        objectives: null,
        otherExperiences: [],
        references: [],
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };

      const preview = service.createCVPreview(cvData);

      expect(preview).toBeDefined();

      const expectedPreviewStart = "<!DOCTYPE html>";

      expect(preview.trim().startsWith(expectedPreviewStart)).toBeTruthy();

      const expectedPreviewEnd = "</html>";

      expect(preview.trim().endsWith(expectedPreviewEnd)).toBeTruthy();
    });
  });
});
