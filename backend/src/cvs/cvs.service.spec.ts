import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";
import { locales } from "src/templates/locales";

import { CvsService } from "./cvs.service";
import type { CreateCVDto } from "./dto/create-cv.dto";

jest.mock("puppeteer");

const cvDefaultMockData: CreateCVDto = {
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

  describe("validateLocale", () => {
    it("should throw BadRequestException for unsupported locale", () => {
      const invalidLocaleData = { ...cvDefaultMockData, locale: "fr" };

      expect(() => {
        service.createCVPreview(invalidLocaleData);
      }).toThrow(
        new RegExp(
          `Unsupported locale: fr. Supported locales are ${locales.join(", ")}.`,
        ),
      );
    });
  });

  describe("createCVPreview", () => {
    it("should create a CV preview", () => {
      const preview = service.createCVPreview(cvDefaultMockData);

      expect(preview).toBeDefined();

      const expectedPreviewStart = "<!DOCTYPE html>";

      expect(preview.trim().startsWith(expectedPreviewStart)).toBeTruthy();

      const expectedPreviewEnd = "</html>";

      expect(preview.trim().endsWith(expectedPreviewEnd)).toBeTruthy();
    });
  });

  describe("createCVPdf", () => {
    it("should create a CV PDF buffer", async () => {
      const pdfBuffer = await service.createCVPdf(cvDefaultMockData);

      expect(pdfBuffer).toBeInstanceOf(Uint8Array);

      expect(pdfBuffer.length).toBeGreaterThan(0);
    });
  });

  describe("createPDFfromStatic", () => {
    it("should create a PDF buffer from static HTML content", async () => {
      const htmlContent = `
        <!DOCTYPE html>
        <html>
          <head>
            <title>Test PDF</title>
          </head>
          <body>
            <h1>Hello, PDF!</h1>
            <p>This is a test PDF generated from static HTML content.</p>
          </body>
        </html>
      `;

      const pdfBuffer = await service.createPDFfromStatic(htmlContent);

      expect(pdfBuffer).toBeInstanceOf(Uint8Array);

      expect(pdfBuffer.length).toBeGreaterThan(0);
    });
  });
});
