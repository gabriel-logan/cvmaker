import { validateSync } from "class-validator";

import { IsTimestamp, isTimestamp } from "./IsTimestamp";

describe("isTimestamp", () => {
  it("should return false for non-number values", () => {
    expect(isTimestamp("1700000000000")).toBe(false);
    expect(isTimestamp(new Date())).toBe(false);
    expect(isTimestamp(null)).toBe(false);
    expect(isTimestamp(undefined)).toBe(false);
    expect(isTimestamp({})).toBe(false);
    expect(isTimestamp([])).toBe(false);
    expect(isTimestamp(true)).toBe(false);
  });

  it("should return false for NaN and non-integers", () => {
    expect(isTimestamp(NaN)).toBe(false);
    expect(isTimestamp(1700000000000.5)).toBe(false);
    expect(isTimestamp(0.1)).toBe(false);
  });

  it("should return false for Infinity values", () => {
    expect(isTimestamp(Infinity)).toBe(false);
    expect(isTimestamp(-Infinity)).toBe(false);
  });

  it("should return true for valid integer timestamps (milliseconds)", () => {
    expect(isTimestamp(0)).toBe(true);
    expect(isTimestamp(1)).toBe(true);
    expect(isTimestamp(Date.now())).toBe(true);
  });

  it("should return true for negative integer timestamps (valid dates before epoch)", () => {
    expect(isTimestamp(-1)).toBe(true);
    expect(isTimestamp(-86400000)).toBe(true); // one day before epoch
  });
});

describe("IsTimestamp decorator", () => {
  it("should produce no validation errors for a valid timestamp", () => {
    class Dto {
      @IsTimestamp()
      public ts!: number;
    }

    const dto = new Dto();
    dto.ts = Date.now();

    const errors = validateSync(dto);
    expect(errors).toHaveLength(0);
  });

  it("should produce a validation error for an invalid value", () => {
    class Dto {
      @IsTimestamp()
      public ts!: unknown;
    }

    const dto = new Dto();
    dto.ts = "1700000000000";

    const errors = validateSync(dto);
    expect(errors).toHaveLength(1);
    expect(errors[0].property).toBe("ts");
    expect(errors[0].constraints?.isTimestamp).toContain(
      "ts should be a valid timestamp in milliseconds",
    );
  });

  it("should respect a custom message in validation options", () => {
    class Dto {
      @IsTimestamp({ message: "CUSTOM_TIMESTAMP_MESSAGE" })
      public ts!: unknown;
    }

    const dto = new Dto();
    dto.ts = "not-a-number";

    const errors = validateSync(dto);
    expect(errors).toHaveLength(1);
    expect(errors[0].constraints?.isTimestamp).toBe("CUSTOM_TIMESTAMP_MESSAGE");
  });

  it("should support { each: true } and prefix message with 'each value in' for arrays", () => {
    class Dto {
      @IsTimestamp({ each: true })
      public timestamps!: unknown[];
    }

    const dto = new Dto();
    dto.timestamps = [Date.now(), "bad", 1700000000000];

    const errors = validateSync(dto);
    expect(errors).toHaveLength(1);
    expect(errors[0].property).toBe("timestamps");
    expect(errors[0].constraints?.isTimestamp).toContain("each value in");
    expect(errors[0].constraints?.isTimestamp).toContain(
      "should be a valid timestamp in milliseconds",
    );
  });
});
