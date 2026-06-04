import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsObject, IsString } from "class-validator";

export class GenerateTemplateDto {
  @ApiProperty({
    description:
      "Description of the desired template style (e.g. 'modern blue sidebar', 'classic serif')",
  })
  @IsString()
  @IsNotEmpty()
  public prompt: string;

  @ApiProperty({
    description: "Full CV data object matching the CV interface",
  })
  @IsObject()
  public cvData: Record<string, unknown>;
}
