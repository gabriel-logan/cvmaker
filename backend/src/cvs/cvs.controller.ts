import {
  Body,
  Controller,
  ParseFilePipeBuilder,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiBody, ApiConsumes } from "@nestjs/swagger";
import type { Response } from "express";

import { CvsService } from "./cvs.service";
import { CreateCVDto } from "./dto/create-cv.dto";

@Controller("cvs")
export class CvsController {
  constructor(private readonly cvsService: CvsService) {}

  @Post("preview")
  createCVPreview(@Body() createCVDto: CreateCVDto): string {
    return this.cvsService.createCVPreview(createCVDto);
  }

  @Post("pdf")
  async createCVPdf(
    @Body() createCVDto: CreateCVDto,
    @Res() res: Response,
  ): Promise<void> {
    const pdfBuffer = await this.cvsService.createCVPdf(createCVDto);

    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename=${createCVDto.cVName}.pdf`,
      "Content-Length": pdfBuffer.length,
    });

    res.end(pdfBuffer);

    return void 0;
  }

  @ApiConsumes("multipart/form-data")
  @ApiBody({
    description: "Static HTML template file",
    schema: {
      type: "object",
      properties: {
        file: {
          type: "string",
          format: "binary",
        },
      },
    },
  })
  @Post("pdf-from-static")
  @UseInterceptors(FileInterceptor("file"))
  async createPDFfromStatic(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addMaxSizeValidator({ maxSize: 5 * 1024 * 1024 }) // 5 MB
        .build({
          fileIsRequired: true,
        }),
    )
    file: Express.Multer.File,
    @Res() res: Response,
  ): Promise<void> {
    const pdfBuffer = await this.cvsService.createPDFfromStatic(
      file.buffer.toString(),
    );

    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename=resume.pdf`,
      "Content-Length": pdfBuffer.length,
    });

    res.end(pdfBuffer);

    return void 0;
  }
}
