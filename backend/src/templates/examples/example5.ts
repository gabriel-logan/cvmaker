import type { CreateCVDto } from "src/cvs/dto/create-cv.dto";
import { formatDate, joinFullName } from "src/shared/utils";

import type { Locale, LocaleContent } from "../locales";

export function cvExample5Template(
  dto: CreateCVDto,
  localeContent: LocaleContent,
  locale: Locale,
): string {
  const fullName = joinFullName(dto.firstName, dto.middleName, dto.lastName);

  return `
<!DOCTYPE html>
<html lang="${locale}">
<head>
<meta charset="UTF-8" />
<title>${dto.cVName}</title>

<style>
  @page {
    size: A4;
    margin: 14mm;
  }

  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 10.5px;
    line-height: 1.4;
    color: #222;
  }

  h1 {
    font-size: 22px;
    margin: 0;
    font-weight: 700;
  }

  h2 {
    font-size: 11px;
    margin: 18px 0 6px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    border-bottom: 1px solid #ddd;
    padding-bottom: 2px;
  }

  h3 {
    font-size: 10.5px;
    margin: 0;
    font-weight: 600;
  }

  p {
    margin: 4px 0;
  }

  .header {
    margin-bottom: 10px;
  }

  .nickname {
    font-size: 11px;
    color: #666;
  }

  .container {
    display: flex;
    gap: 14px;
  }

  .left {
    width: 30%;
  }

  .right {
    width: 70%;
  }

  .item {
    margin-bottom: 6px;
  }

  .muted {
    color: #666;
    font-size: 9.5px;
  }

  ul {
    margin: 4px 0 0;
    padding-left: 14px;
  }

  li {
    margin-bottom: 2px;
  }

  .skills {
    display: flex;
    flex-wrap: wrap;
    gap: 4px 6px;
  }

  .skill {
    background: #f1f1f1;
    padding: 2px 6px;
    border-radius: 3px;
    font-size: 9.5px;
  }

  .link {
    word-break: break-all;
  }
</style>
</head>

<body>
  <div class="header">
    <h1>${fullName}</h1>
    ${dto.nickname ? `<div class="nickname">${dto.nickname}</div>` : ""}
  </div>

  <div class="container">
    <!-- LEFT -->
    <div class="left">

      <h2>Contacts</h2>
      ${dto.contacts.email ? `<p>${dto.contacts.email}</p>` : ""}
      ${dto.contacts.phone ? `<p>${dto.contacts.phone}</p>` : ""}
      ${dto.address ? `<p class="muted">${dto.address}</p>` : ""}

      <h2>Skills</h2>
      <div class="skills">
        ${dto.skills
          .map((skill) => `<div class="skill">${skill.name}</div>`)
          .join("")}
      </div>

      <h2>Languages</h2>
      ${dto.languages
        .map(
          (lang) => `
          <p>
            <strong>${lang.name}</strong><br/>
            <span class="muted">${lang.proficiency}</span>
          </p>
        `,
        )
        .join("")}

      <h2>Links</h2>
      ${dto.links
        .map(
          (link) => `
          <p class="link">
            <strong>${link.label}:</strong><br/>
            <span class="muted">${link.url}</span>
          </p>
        `,
        )
        .join("")}
    </div>

    <!-- RIGHT -->
    <div class="right">

      ${
        dto.summary
          ? `
        <h2>Summary</h2>
        <p>${dto.summary}</p>
      `
          : ""
      }

      ${
        dto.objectives
          ? `
        <h2>Objectives</h2>
        <p>${dto.objectives}</p>
      `
          : ""
      }

      <h2>Experience</h2>
      ${dto.experience
        .map(
          (exp) => `
          <div class="item">
            <h3>${exp.position} — ${exp.company}</h3>
            <div class="muted">
              ${formatDate(exp.startDate)} ${
                exp.endDate ? `- ${formatDate(exp.endDate)}` : "- Present"
              }
              ${exp.location ? ` • ${exp.location}` : ""}
            </div>
            ${exp.responsibilities ? `<p>${exp.responsibilities}</p>` : ""}
          </div>
        `,
        )
        .join("")}

      <h2>Projects</h2>
      ${dto.projects
        .map(
          (project) => `
          <div class="item">
            <h3>${project.name}</h3>
            <div class="muted">
              ${formatDate(project.startDate)} ${
                project.endDate ? `- ${formatDate(project.endDate)}` : ""
              }
            </div>
            <p>${project.description}</p>
            ${project.link ? `<p class="muted">${project.link}</p>` : ""}
          </div>
        `,
        )
        .join("")}

      ${
        dto.otherExperiences.length
          ? `
        <h2>Other Experiences</h2>
        ${dto.otherExperiences
          .map(
            (other) => `
            <div class="item">
              <h3>${other.title}</h3>
              <div class="muted">
                ${other.startDate ? formatDate(other.startDate) : ""} ${
                  other.endDate ? `- ${formatDate(other.endDate)}` : ""
                }
              </div>
              <p>${other.description}</p>
            </div>
          `,
          )
          .join("")}
      `
          : ""
      }
    </div>
  </div>
</body>
</html>
`;
}
