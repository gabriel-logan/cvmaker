import type { CreateCVDto } from "src/cvs/dto/create-cv.dto";

import { cvExample1Template } from "./examples/example1";
import { cvExample2Template } from "./examples/example2";
import { cvExample3Template } from "./examples/example3";
import { cvExample4Template } from "./examples/example4";

export default function cvTemplates(dto: CreateCVDto): string {
  switch (dto.templateId) {
    case "template1":
      return cvExample1Template(dto);

    case "template2":
      return cvExample2Template(dto);

    case "template3":
      return cvExample3Template(dto);

    case "template4":
      return cvExample4Template(dto);

    default:
      return defaultHtml;
  }
}

const defaultHtml = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>CV Template Not Found</title>
  </head>
  <body>
    <h1>CV Template Not Found</h1>
    <p>The specified CV template could not be found.</p>
  </body>
</html>
`;
