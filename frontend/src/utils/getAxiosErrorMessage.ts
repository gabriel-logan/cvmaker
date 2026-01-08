import axios from "axios";

import type { ApiErrorResponse } from "../types";

export default function getAxiosErrorMessage(
  error: unknown,
  fallbackMessage = "Something went wrong. Please try again.",
): string {
  console.error("Error occurred:", error);

  if (axios.isAxiosError<ApiErrorResponse>(error)) {
    const {
      message,
      statusCode,
      error: errorMessage,
    } = error.response?.data || {};

    console.error(`API Error - Status: ${statusCode}, Error: ${errorMessage}`);

    if (typeof message === "string") {
      return message;
    }

    if (Array.isArray(message) && message.length > 0) {
      const formattedErrors = message.map((msg) => `- ${msg}`).join("\n");

      return formattedErrors;
    }
  }

  return fallbackMessage;
}
