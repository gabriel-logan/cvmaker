import { BadRequestException, Injectable } from "@nestjs/common";
import puppeteer from "puppeteer";
import { maxTimeoutMs } from "src/shared/constants";
import { sanitizeHtmlString } from "src/shared/utils";
import cvTemplates from "src/templates";
import { type Locale, locales } from "src/templates/locales";

import { CreateCVDto } from "./dto/create-cv.dto";

@Injectable()
export class CvsService {
  private validateLocale(locale: string): void {
    const isValid = locales.includes(locale as Locale);

    if (!isValid) {
      throw new BadRequestException(
        `Unsupported locale: ${locale}. Supported locales are ${locales.join(", ")}.`,
      );
    }
  }

  createCVPreview(createCVDto: CreateCVDto): string {
    // Validate locale
    this.validateLocale(createCVDto.locale);

    const htmlPreview = cvTemplates(createCVDto, createCVDto.locale as Locale);

    const { result: sanitizedHtml, error } = sanitizeHtmlString(htmlPreview);

    if (error) {
      throw new BadRequestException(
        `Failed to sanitize HTML content: ${error.message}`,
      );
    }

    return sanitizedHtml;
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
      timeout: maxTimeoutMs,
    });
    const page = await browser.newPage();

    const { result: sanitizedContent, error } = sanitizeHtmlString(content);

    if (error) {
      await browser.close();
      throw new BadRequestException(
        `Failed to sanitize HTML content: ${error.message}`,
      );
    }

    await page.setContent(sanitizedContent, {
      waitUntil: "networkidle0",
      timeout: maxTimeoutMs,
    });

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      preferCSSPageSize: true,
    });

    await browser.close();

    return pdfBuffer;
  }
}
