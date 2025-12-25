import { Body, Controller, Post } from "@nestjs/common";

import { CvsService } from "./cvs.service";
import { CreateCvDto } from "./dto/create-cv.dto";

@Controller("cvs")
export class CvsController {
  constructor(private readonly cvsService: CvsService) {}

  @Post("preview")
  createCVPreview(@Body() createCvDto: CreateCvDto): string {
    return this.cvsService.createCVPreview(createCvDto);
  }

  @Post("pdf")
  async createCVPdf(
    @Body() createCvDto: CreateCvDto,
  ): Promise<Uint8Array<ArrayBufferLike>> {
    return await this.cvsService.createCVPdf(createCvDto);
  }
}
