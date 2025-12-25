import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from "@nestjs/common";

import { CvsService } from "./cvs.service";
import { CreateCvDto } from "./dto/create-cv.dto";
import { UpdateCvDto } from "./dto/update-cv.dto";

@Controller("cvs")
export class CvsController {
  constructor(private readonly cvsService: CvsService) {}
}
