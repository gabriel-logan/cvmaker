import { Injectable } from "@nestjs/common";
import { cvExample1Template } from "src/templates/examples/example1";

import { CreateCvDto } from "./dto/create-cv.dto";

@Injectable()
export class CvsService {
  createCVPreview(createCvDto: CreateCvDto): string {
    const htmlPreview = cvExample1Template(createCvDto);

    return htmlPreview;
  }

  async createCVPdf(
    createCvDto: CreateCvDto,
  ): Promise<Uint8Array<ArrayBufferLike>> {
    const html = cvExample1Template(createCvDto);

    await new Promise((resolve) => setTimeout(() => resolve(html), 100));

    const pdfBuffer = new Uint8Array(); // Placeholder for PDF generation logic

    // PDF generation logic would go here, using a library like Puppeteer or PDFKit

    return pdfBuffer;
  }
}
