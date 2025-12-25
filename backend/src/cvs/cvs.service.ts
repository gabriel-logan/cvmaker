import { Injectable } from "@nestjs/common";
import puppeteer from "puppeteer";
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

    const browser = await puppeteer.launch({
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();

    await page.setContent(html, {
      waitUntil: "networkidle2",
    });

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
    });

    await browser.close();

    return pdfBuffer;
  }
}
