import { BadRequestException, Injectable } from "@nestjs/common";
import puppeteer from "puppeteer";
import { maxTimeoutMs } from "src/shared/constants";
import cvTemplates from "src/templates";
import type { Locale, Locales } from "src/templates/locales";

import { CreateCVDto } from "./dto/create-cv.dto";

@Injectable()
export class CvsService {
  private validateLocale(locale: string): void {
    const supportedLocales: Locales = ["en", "pt"];

    const isValid = supportedLocales.includes(locale as Locale);

    if (!isValid) {
      throw new BadRequestException(
        `Unsupported locale: ${locale}. Supported locales are "en" and "pt".`,
      );
    }
  }

  createCVPreview(createCVDto: CreateCVDto): string {
    // Validate locale
    this.validateLocale(createCVDto.locale);

    const htmlPreview = cvTemplates(createCVDto, createCVDto.locale as Locale);

    return htmlPreview;
  }

  async createCVPdf(
    createCVDto: CreateCVDto,
  ): Promise<Uint8Array<ArrayBufferLike>> {
    // Validate locale
    this.validateLocale(createCVDto.locale);

    const html = cvTemplates(createCVDto, createCVDto.locale as Locale);

    const pdfBuffer = await this.createPDFfromStatic(html);

    return pdfBuffer;
  }

  async createPDFfromStatic(
    content: string,
  ): Promise<Uint8Array<ArrayBufferLike>> {
    const browser = await puppeteer.launch({
      timeout: maxTimeoutMs, // 60 seconds
    });
    const page = await browser.newPage();

    await page.setContent(content, {
      waitUntil: "networkidle0",
      timeout: maxTimeoutMs, // 60 seconds
    });

    const pdfBuffer = await page.pdf({ format: "A4", printBackground: true });

    await browser.close();

    return pdfBuffer;
  }
}
