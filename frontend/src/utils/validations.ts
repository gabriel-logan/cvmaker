import { validateEmail } from "multiform-validator";

import type { CV } from "../types";

export function validateCVFormSubmit(cV: CV): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (!cV.cVName || cV.cVName.trim() === "") {
    errors.push("CV name is required.");
  }

  if (!cV.firstName || cV.firstName.trim() === "") {
    errors.push("First name is required.");
  }

  if (!cV.lastName || cV.lastName.trim() === "") {
    errors.push("Last name is required.");
  }

  if (cV.contacts.email) {
    const validateEmailResult = validateEmail(cV.contacts.email);

    if (!validateEmailResult.isValid) {
      errors.push(validateEmailResult.errorMsg);
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}
