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
    font-size: 10.3px;
    line-height: 1.35;
    color: #222;
  }

  h1 {
    font-size: 21px;
    margin: 0;
    font-weight: 700;
  }

  h2 {
    font-size: 10.5px;
    margin: 14px 0 5px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    border-bottom: 1px solid #ddd;
    padding-bottom: 2px;
  }

  h3 {
    font-size: 10.3px;
    margin: 0;
    font-weight: 600;
  }

  p {
    margin: 3px 0;
  }

  .header {
    margin-bottom: 8px;
  }

  .nickname {
    font-size: 10.5px;
    color: #666;
  }

  .container {
    display: flex;
    gap: 12px;
  }

  .left {
    width: 32%;
  }

  .right {
    width: 68%;
  }

  .item {
    margin-bottom: 5px;
  }

  .muted {
    color: #666;
    font-size: 9.3px;
  }

  .skills {
    display: flex;
    flex-wrap: wrap;
    gap: 4px 5px;
  }

  .skill {
    background: #f1f1f1;
    padding: 2px 5px;
    border-radius: 3px;
    font-size: 9.2px;
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
        ${dto.skills.map((s) => `<div class="skill">${s.name}</div>`).join("")}
      </div>

      <h2>Languages</h2>
      ${dto.languages
        .map(
          (l) => `
          <p>
            <strong>${l.name}</strong><br/>
            <span class="muted">${l.proficiency}</span>
          </p>
        `,
        )
        .join("")}

      <h2>Links</h2>
      ${dto.links
        .map(
          (l) => `
          <p class="link">
            <strong>${l.label}</strong><br/>
            <span class="muted">${l.url}</span>
          </p>
        `,
        )
        .join("")}

      ${
        dto.objectives
          ? `
        <h2>Objectives</h2>
        <p>${dto.objectives}</p>
      `
          : ""
      }

      ${
        dto.otherExperiences.length
          ? `
        <h2>Other Experiences</h2>
        ${dto.otherExperiences
          .map(
            (o) => `
            <div class="item">
              <h3>${o.title}</h3>
              <div class="muted">
                ${o.startDate ? formatDate(o.startDate) : ""} ${
                  o.endDate ? `- ${formatDate(o.endDate)}` : ""
                }
              </div>
              <p>${o.description}</p>
            </div>
          `,
          )
          .join("")}
      `
          : ""
      }
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

      <h2>Experience</h2>
      ${dto.experience
        .map(
          (e) => `
          <div class="item">
            <h3>${e.position} — ${e.company}</h3>
            <div class="muted">
              ${formatDate(e.startDate)} ${
                e.endDate ? `- ${formatDate(e.endDate)}` : "- Present"
              }
              ${e.location ? ` • ${e.location}` : ""}
            </div>
            ${e.responsibilities ? `<p>${e.responsibilities}</p>` : ""}
          </div>
        `,
        )
        .join("")}

      <h2>Projects</h2>
      ${dto.projects
        .map(
          (p) => `
          <div class="item">
            <h3>${p.name}</h3>
            <div class="muted">
              ${formatDate(p.startDate)} ${
                p.endDate ? `- ${formatDate(p.endDate)}` : ""
              }
            </div>
            <p>${p.description}</p>
            ${p.link ? `<p class="muted">${p.link}</p>` : ""}
          </div>
        `,
        )
        .join("")}
    </div>
  </div>
</body>
</html>
`;
}
