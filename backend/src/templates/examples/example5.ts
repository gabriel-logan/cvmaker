import type { CreateCVDto } from "src/cvs/dto/create-cv.dto";

import type { Locale, LocaleContent } from "../locales";

export function cvExample5Template(
  dto: CreateCVDto,
  localeContent: LocaleContent,
  locale: Locale,
): string {
  return `
<!DOCTYPE html>
<html lang="${locale}">
<head>
<meta charset="UTF-8" />
<title>${dto.cVName}</title>
<style></style>
</head>
<body></body>
</html>
`;
}
