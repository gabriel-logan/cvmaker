import { BadRequestException, Injectable } from "@nestjs/common";
import puppeteer from "puppeteer";
import cvTemplates from "src/templates";
import type { Locale, Locales } from "src/templates/locales";

import { CreateCVDto } from "./dto/create-cv.dto";

@Injectable()
export class CvsService {
  private validateLocale(locale: string): boolean {
    const supportedLocales: Locales = ["en", "pt"];

    return supportedLocales.includes(locale as Locale);
  }

  createCVPreview(createCVDto: CreateCVDto): string {
    if (!this.validateLocale(createCVDto.locale)) {
      throw new BadRequestException(
        `Unsupported locale: ${createCVDto.locale}. Supported locales are "en" and "pt".`,
      );
    }

    const htmlPreview = cvTemplates(createCVDto, createCVDto.locale as Locale);

    return htmlPreview;
  }

  async createCVPdf(
    createCVDto: CreateCVDto,
  ): Promise<Uint8Array<ArrayBufferLike>> {
    if (!this.validateLocale(createCVDto.locale)) {
      throw new BadRequestException(
        `Unsupported locale: ${createCVDto.locale}. Supported locales are "en" and "pt".`,
      );
    }

    const html = cvTemplates(createCVDto, createCVDto.locale as Locale);

    const pdfBuffer = await this.createPDFfromStatic(html);

    return pdfBuffer;
  }

  async createPDFfromStatic(
    content: string,
  ): Promise<Uint8Array<ArrayBufferLike>> {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.setContent(content, {
      waitUntil: "networkidle0",
    });

    const pdfBuffer = await page.pdf({ format: "A4", printBackground: true });

    await browser.close();

    return pdfBuffer;
  }
}
