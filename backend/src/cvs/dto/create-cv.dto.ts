import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsObject, IsOptional, ValidateNested } from "class-validator";
import { IsNotBlankString } from "src/common/decorators/validation/IsNotBlankString";
import { IsTimestamp } from "src/common/decorators/validation/IsTimestamp";
import { locales } from "src/templates/locales";

class CreateCVContactsDto {
  @ApiProperty({
    type: String,
    nullable: true,
    required: false,
  })
  @IsNotBlankString()
  @IsOptional()
  public email: string | null;

  @ApiProperty({
    type: String,
    nullable: true,
    required: false,
  })
  @IsNotBlankString()
  @IsOptional()
  public phone: string | null;
}

class CreateCVEducationDto {
  @ApiProperty()
  @IsNotBlankString()
  public institution: string;

  @ApiProperty()
  @IsNotBlankString()
  public degree: string;

  @ApiProperty()
  @IsNotBlankString()
  public fieldOfStudy: string;

  @ApiProperty()
  @IsNotBlankString()
  public startDate: string;

  @ApiProperty({
    type: String,
    nullable: true,
    required: false,
  })
  @IsNotBlankString()
  @IsOptional()
  public endDate: string | null;

  @ApiProperty({
    type: String,
    nullable: true,
    required: false,
  })
  @IsNotBlankString()
  @IsOptional()
  public grade: string | null;

  @ApiProperty({
    type: String,
    nullable: true,
    required: false,
  })
  @IsNotBlankString()
  @IsOptional()
  public description: string | null;

  @ApiProperty({
    type: String,
    nullable: true,
    required: false,
  })
  @IsNotBlankString()
  @IsOptional()
  public location: string | null;
}

class CreateCVExperienceDto {
  @ApiProperty()
  @IsNotBlankString()
  public company: string;

  @ApiProperty()
  @IsNotBlankString()
  public position: string;

  @ApiProperty()
  @IsNotBlankString()
  public startDate: string;

  @ApiProperty({
    type: String,
    nullable: true,
    required: false,
  })
  @IsNotBlankString()
  @IsOptional()
  public endDate: string | null;

  @ApiProperty({
    type: String,
    nullable: true,
    required: false,
  })
  @IsNotBlankString()
  @IsOptional()
  public responsibilities: string | null;

  @ApiProperty({
    type: String,
    nullable: true,
    required: false,
  })
  @IsNotBlankString()
  @IsOptional()
  public location: string | null;
}

class CreateCVSkillDto {
  @ApiProperty()
  @IsNotBlankString()
  public name: string;

  @ApiProperty({
    type: String,
    nullable: true,
    required: false,
  })
  @IsNotBlankString()
  @IsOptional()
  public level: string | null;
}

class CreateCVProjectDto {
  @ApiProperty()
  @IsNotBlankString()
  public name: string;

  @ApiProperty()
  @IsNotBlankString()
  public description: string;

  @ApiProperty()
  @IsNotBlankString()
  public startDate: string;

  @ApiProperty({
    type: String,
    nullable: true,
    required: false,
  })
  @IsNotBlankString()
  @IsOptional()
  public endDate: string | null;

  @ApiProperty({
    type: String,
    nullable: true,
    required: false,
  })
  @IsNotBlankString()
  @IsOptional()
  public link: string | null;

  @ApiProperty({
    type: String,
    nullable: true,
    required: false,
  })
  @IsNotBlankString()
  @IsOptional()
  public location: string | null;
}

class CreateCVCertificationDto {
  @ApiProperty()
  @IsNotBlankString()
  public name: string;

  @ApiProperty()
  @IsNotBlankString()
  public issuingOrganization: string;

  @ApiProperty()
  @IsNotBlankString()
  public issueDate: string;

  @ApiProperty({
    type: String,
    nullable: true,
    required: false,
  })
  @IsNotBlankString()
  @IsOptional()
  public expirationDate: string | null;

  @ApiProperty({
    type: String,
    nullable: true,
    required: false,
  })
  @IsNotBlankString()
  @IsOptional()
  public credentialID: string | null;

  @ApiProperty({
    type: String,
    nullable: true,
    required: false,
  })
  @IsNotBlankString()
  @IsOptional()
  public credentialURL: string | null;
}

class CreateCVLanguageDto {
  @ApiProperty()
  @IsNotBlankString()
  public name: string;

  @ApiProperty()
  @IsNotBlankString()
  public proficiency: string;
}

class CreateCVHobbyDto {
  @ApiProperty()
  @IsNotBlankString()
  public description: string;
}

class CreateCVOtherExperienceDto {
  @ApiProperty()
  @IsNotBlankString()
  public title: string;

  @ApiProperty()
  @IsNotBlankString()
  public description: string;

  @ApiProperty({
    type: String,
    nullable: true,
    required: false,
  })
  @IsNotBlankString()
  @IsOptional()
  public startDate: string | null;

  @ApiProperty({
    type: String,
    nullable: true,
    required: false,
  })
  @IsNotBlankString()
  @IsOptional()
  public endDate: string | null;

  @ApiProperty({
    type: String,
    nullable: true,
    required: false,
  })
  @IsNotBlankString()
  @IsOptional()
  public location: string | null;
}

class CreateCVReferenceDto {
  @ApiProperty()
  @IsNotBlankString()
  public name: string;

  @ApiProperty({
    type: String,
    nullable: true,
    required: false,
  })
  @IsNotBlankString()
  @IsOptional()
  public relationship: string | null;

  @ApiProperty({
    type: String,
    nullable: true,
    required: false,
  })
  @IsNotBlankString()
  @IsOptional()
  public contactInfo: string | null;
}

class CreateCVLinkDto {
  @ApiProperty()
  @IsNotBlankString()
  public label: string;

  @ApiProperty()
  @IsNotBlankString()
  public url: string;
}

export type TemplateIds = "template1" | "template2" | "template3" | "template4";

export class CreateCVDto {
  @ApiProperty()
  @IsNotBlankString()
  public templateId: TemplateIds;

  @ApiProperty({
    type: String,
    examples: locales,
  })
  @IsNotBlankString({
    message: `Locale must be a valid string like ${locales.join(", ")}`,
  })
  public locale: string;

  @ApiProperty()
  @IsNotBlankString()
  public id: string;

  @ApiProperty()
  @IsNotBlankString()
  public cVName: string;

  @ApiProperty()
  @IsNotBlankString()
  public firstName: string;

  @ApiProperty({
    type: String,
    nullable: true,
    required: false,
  })
  @IsNotBlankString()
  @IsOptional()
  public middleName: string | null;

  @ApiProperty()
  @IsNotBlankString()
  public lastName: string;

  @ApiProperty({
    type: String,
    nullable: true,
    required: false,
  })
  @IsNotBlankString()
  @IsOptional()
  public nickname: string | null;

  @ApiProperty({
    type: String,
    format: "binary",
    nullable: true,
    required: false,
  })
  @IsNotBlankString()
  @IsOptional()
  public avatar: string | null;

  @ApiProperty()
  @ValidateNested()
  @Type(() => CreateCVContactsDto)
  @IsObject()
  public contacts: CreateCVContactsDto;

  @ApiProperty({
    type: String,
    nullable: true,
    required: false,
  })
  @IsNotBlankString()
  @IsOptional()
  public address: string | null;

  @ApiProperty({
    type: String,
    nullable: true,
    required: false,
  })
  @IsNotBlankString()
  @IsOptional()
  public summary: string | null;

  @ApiProperty({
    type: String,
    nullable: true,
    required: false,
  })
  @IsNotBlankString()
  @IsOptional()
  public objectives: string | null;

  @ApiProperty({
    type: CreateCVEducationDto,
    isArray: true,
  })
  @IsArray()
  @ValidateNested()
  @Type(() => CreateCVEducationDto)
  public education: CreateCVEducationDto[];

  @ApiProperty({
    type: CreateCVExperienceDto,
    isArray: true,
  })
  @IsArray()
  @ValidateNested()
  @Type(() => CreateCVExperienceDto)
  public experience: CreateCVExperienceDto[];

  @ApiProperty({
    type: CreateCVSkillDto,
    isArray: true,
  })
  @IsArray()
  @ValidateNested()
  @Type(() => CreateCVSkillDto)
  public skills: CreateCVSkillDto[];

  @ApiProperty({
    type: CreateCVProjectDto,
    isArray: true,
  })
  @IsArray()
  @ValidateNested()
  @Type(() => CreateCVProjectDto)
  public projects: CreateCVProjectDto[];

  @ApiProperty({
    type: CreateCVCertificationDto,
    isArray: true,
  })
  @IsArray()
  @ValidateNested()
  @Type(() => CreateCVCertificationDto)
  public certifications: CreateCVCertificationDto[];

  @ApiProperty({
    type: CreateCVLanguageDto,
    isArray: true,
  })
  @IsArray()
  @ValidateNested()
  @Type(() => CreateCVLanguageDto)
  public languages: CreateCVLanguageDto[];

  @ApiProperty({
    type: CreateCVHobbyDto,
    isArray: true,
  })
  @IsArray()
  @ValidateNested()
  @Type(() => CreateCVHobbyDto)
  public hobbies: CreateCVHobbyDto[];

  @ApiProperty({
    type: String,
    nullable: true,
    required: false,
  })
  @IsNotBlankString()
  @IsOptional()
  public additionalInfo: string | null;

  @ApiProperty({
    type: CreateCVOtherExperienceDto,
    isArray: true,
  })
  @IsArray()
  @ValidateNested()
  @Type(() => CreateCVOtherExperienceDto)
  public otherExperiences: CreateCVOtherExperienceDto[];

  @ApiProperty({
    type: CreateCVReferenceDto,
    isArray: true,
  })
  @IsArray()
  @ValidateNested()
  @Type(() => CreateCVReferenceDto)
  public references: CreateCVReferenceDto[];

  @ApiProperty({
    type: CreateCVLinkDto,
    isArray: true,
  })
  @IsArray()
  @ValidateNested()
  @Type(() => CreateCVLinkDto)
  public links: CreateCVLinkDto[];

  @ApiProperty({
    example: Date.now(),
  })
  @IsTimestamp()
  public createdAt: number;

  @ApiProperty({
    example: Date.now(),
  })
  @IsTimestamp()
  public updatedAt: number;
}
