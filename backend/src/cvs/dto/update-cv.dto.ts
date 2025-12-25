import { PartialType } from "@nestjs/swagger";

import { CreateCvDto } from "./create-cv.dto";

export class UpdateCvDto extends PartialType(CreateCvDto) {}
