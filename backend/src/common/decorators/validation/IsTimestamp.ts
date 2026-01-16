import type { ValidationOptions } from "class-validator";
import { buildMessage, ValidateBy } from "class-validator";

export const IS_TIMESTAMP = "isTimestamp";

export function isTimestamp(value: unknown): boolean {
  if (typeof value !== "number") {
    return false; // Ensure the value is a number
  }

  // Check if the number is an integer and represents a valid timestamp
  const date = new Date(value);
  return Number.isInteger(value) && !Number.isNaN(date.getTime());
}

export function IsTimestamp(
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  return ValidateBy(
    {
      name: IS_TIMESTAMP,
      validator: {
        validate: (value) => isTimestamp(value),
        defaultMessage: buildMessage(
          (eachPrefix) =>
            eachPrefix +
            "$property should be a valid timestamp in milliseconds",
          validationOptions,
        ),
      },
    },
    validationOptions,
  );
}
