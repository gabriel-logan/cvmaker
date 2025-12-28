import { validateSync } from "class-validator";

import {
  IS_NOT_BLANK_STRING,
  IsNotBlankString,
  isNotBlankString,
} from "./IsNotBlankString";

describe("isNotBlankString", () => {
  it("should return false for non-strings", () => {
    expect(isNotBlankString(undefined)).toBe(false);
    expect(isNotBlankString(null)).toBe(false);
    expect(isNotBlankString(0)).toBe(false);
    expect(isNotBlankString(1)).toBe(false);
    expect(isNotBlankString(true)).toBe(false);
    expect(isNotBlankString(false)).toBe(false);
    expect(isNotBlankString({})).toBe(false);
    expect(isNotBlankString([])).toBe(false);
    expect(isNotBlankString(() => "x")).toBe(false);
  });

  it("should return false for empty/whitespace-only strings", () => {
    expect(isNotBlankString("")).toBe(false);
    expect(isNotBlankString(" ")).toBe(false);
    expect(isNotBlankString("   ")).toBe(false);
    expect(isNotBlankString("\n")).toBe(false);
    expect(isNotBlankString("\t")).toBe(false);
    expect(isNotBlankString("\n\t  ")).toBe(false);
  });

  it("should return true for non-blank strings (including strings with surrounding whitespace)", () => {
    expect(isNotBlankString("a")).toBe(true);
    expect(isNotBlankString(" a ")).toBe(true);
    expect(isNotBlankString("0")).toBe(true);
    expect(isNotBlankString(" 0 ")).toBe(true);
    expect(isNotBlankString("hello world")).toBe(true);
  });
});

describe("IsNotBlankString decorator", () => {
  class TestDto {
    @IsNotBlankString()
    public name!: unknown;
  }

  it("should validate successfully when the value is a non-blank string", () => {
    const dto = new TestDto();
    dto.name = " ok ";

    const errors = validateSync(dto);
    expect(errors).toHaveLength(0);
  });

  it("should fail validation when the value is not a string", () => {
    const dto = new TestDto();
    dto.name = 123;

    const errors = validateSync(dto);
    expect(errors).toHaveLength(1);
    expect(errors[0].property).toBe("name");
    expect(errors[0].constraints?.[IS_NOT_BLANK_STRING]).toBe(
      "name should be a non-blank string",
    );
  });

  it("should fail validation when the value is an empty string", () => {
    const dto = new TestDto();
    dto.name = "";

    const errors = validateSync(dto);
    expect(errors).toHaveLength(1);
    expect(errors[0].constraints?.[IS_NOT_BLANK_STRING]).toBe(
      "name should be a non-blank string",
    );
  });

  it("should fail validation when the value is a whitespace-only string", () => {
    const dto = new TestDto();
    dto.name = "   ";

    const errors = validateSync(dto);
    expect(errors).toHaveLength(1);
    expect(errors[0].constraints?.[IS_NOT_BLANK_STRING]).toBe(
      "name should be a non-blank string",
    );
  });

  it("should use a custom message when provided via validation options", () => {
    class CustomMessageDto {
      @IsNotBlankString({ message: "custom message" })
      public name!: unknown;
    }

    const dto = new CustomMessageDto();
    dto.name = "   ";

    const errors = validateSync(dto);
    expect(errors).toHaveLength(1);
    expect(errors[0].constraints?.[IS_NOT_BLANK_STRING]).toBe("custom message");
  });

  it("should support `each: true` and prefix the default message accordingly", () => {
    class EachDto {
      @IsNotBlankString({ each: true })
      public tags!: unknown;
    }

    const dto = new EachDto();
    dto.tags = ["ok", "   "];

    const errors = validateSync(dto);
    expect(errors).toHaveLength(1);
    expect(errors[0].property).toBe("tags");
    expect(errors[0].constraints?.[IS_NOT_BLANK_STRING]).toBe(
      "each value in tags should be a non-blank string",
    );
  });
});
