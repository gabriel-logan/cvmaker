import type { CreateCVDto } from "src/cvs/dto/create-cv.dto";
import { joinFullName } from "src/shared/utils";

import type { Locale, LocaleContent } from "../locales";

/**
 * A print-first template for broad operational and customer-facing roles.
 * It gives informal, operational, and autonomous work the same visual weight.
 */
export function cvExample7Template(
  dto: CreateCVDto,
  localeContent: LocaleContent,
  locale: Locale,
): string {
  const experiences = [
    ...dto.otherExperiences.map((experience) => ({
      title: experience.title,
      company: null,
      description: experience.description,
      location: experience.location,
    })),
    ...dto.experience.map((experience) => ({
      title: experience.position,
      company: experience.company,
      description: experience.responsibilities,
      location: experience.location,
    })),
  ];
  const hasSidebarContent = Boolean(
    dto.skills.length ||
    dto.languages.length ||
    dto.education.length ||
    dto.hobbies.length,
  );

  return `
<!DOCTYPE html>
<html lang="${locale}">
<head>
  <meta charset="UTF-8" />
  <title>${dto.cVName}</title>
  <style>
    @page {
      size: A4;
      margin: ${dto.margin}mm;
    }

    :root {
      --ink: #172033;
      --muted: #536174;
      --line: #cbd5e1;
      --accent: #0f766e;
      --accent-soft: #e6f4f1;
      --surface: #f8fafc;
    }

    * {
      box-sizing: border-box;
    }

    body {
      margin: 0;
      color: var(--ink);
      background: #ffffff;
      font-family: Arial, Helvetica, sans-serif;
      font-size: 12.1pt;
      line-height: 1.38;
    }

    .resume {
      width: 100%;
    }

    .header {
      border-bottom: 3px solid var(--accent);
      padding-bottom: 4.2mm;
      margin-bottom: 3.5mm;
    }

    .name {
      margin: 0;
      font-size: 28pt;
      letter-spacing: -0.45px;
      line-height: 1.05;
    }

    .headline {
      margin: 2.8mm 0 2.6mm;
      color: var(--accent);
      font-size: 13.2pt;
      font-weight: 700;
      line-height: 1.2;
    }

    .contacts {
      display: flex;
      flex-wrap: wrap;
      gap: 1.2mm 4mm;
      color: var(--muted);
      font-size: 10.8pt;
      line-height: 1.25;
    }

    .contacts span {
      white-space: nowrap;
    }

    .availability {
      margin-bottom: 4.5mm;
      padding: 3.5mm 4mm;
      border-left: 4px solid var(--accent);
      background: var(--accent-soft);
      color: #173a37;
      font-size: 11.6pt;
      font-weight: 700;
      line-height: 1.32;
    }

    .content-grid {
      display: grid;
      grid-template-columns: minmax(0, 0.72fr) minmax(0, 1.58fr);
      gap: 6mm;
      align-items: start;
    }

    .content-grid.without-sidebar {
      grid-template-columns: minmax(0, 1fr);
    }

    .sidebar {
      min-width: 0;
      padding-right: 4.5mm;
      border-right: 1px solid var(--line);
    }

    .main-column {
      min-width: 0;
    }

    .section {
      break-inside: avoid;
    }

    .sidebar-section + .sidebar-section {
      margin-top: 3.7mm;
      padding-top: 3.2mm;
      border-top: 1px solid var(--line);
    }

    .section-title {
      margin: 0 0 1.8mm;
      color: var(--accent);
      font-size: 11.7pt;
      font-weight: 700;
      letter-spacing: 0.45px;
      line-height: 1.2;
      text-transform: uppercase;
    }

    .profile-copy {
      margin: 0;
      font-size: 12.1pt;
      line-height: 1.41;
    }

    .profile-section {
      margin-bottom: 5.2mm;
    }

    .experience-section {
      break-inside: avoid;
    }

    .experience-list {
      display: grid;
      grid-template-columns: 1fr;
      gap: 3mm;
    }

    .entry {
      padding: 0 0 3mm;
      border-bottom: 1px solid var(--line);
      break-inside: avoid;
    }

    .entry:last-child {
      padding-bottom: 0;
      border-bottom: 0;
    }

    .entry-title {
      margin: 0;
      font-size: 12.9pt;
      line-height: 1.22;
    }

    .entry-meta {
      margin-top: 1mm;
      color: var(--muted);
      font-size: 10.5pt;
      line-height: 1.24;
    }

    .entry-description {
      margin: 1.2mm 0 0;
      font-size: 11.8pt;
      line-height: 1.38;
    }

    .skills-list {
      margin: 0;
      padding: 0;
      list-style: none;
      display: grid;
      gap: 1.65mm;
    }

    .skill-item {
      position: relative;
      padding-left: 3.2mm;
      font-size: 10.9pt;
      line-height: 1.3;
    }

    .skill-item::before {
      position: absolute;
      top: 0.55em;
      left: 0;
      width: 1.4mm;
      height: 1.4mm;
      border-radius: 50%;
      background: var(--accent);
      content: "";
    }

    .language-list {
      display: grid;
      gap: 1.5mm;
    }

    .language-item {
      padding: 1.55mm 0;
      border-bottom: 1px solid var(--line);
    }

    .language-item:first-child {
      padding-top: 0;
    }

    .language-item:last-child {
      padding-bottom: 0;
      border-bottom: 0;
    }

    .language-name {
      display: block;
      font-size: 11.1pt;
      font-weight: 700;
      line-height: 1.2;
    }

    .language-proficiency {
      display: block;
      margin-top: 0.55mm;
      color: var(--muted);
      font-size: 10.5pt;
      line-height: 1.24;
    }

    .hobbies-grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 1.8mm 2.8mm;
      margin: 0;
      font-size: 10.9pt;
      line-height: 1.32;
    }

    .hobby {
      position: relative;
      padding-left: 2.9mm;
    }

    .hobby::before {
      position: absolute;
      top: 0.48em;
      left: 0;
      width: 1.5mm;
      height: 1.5mm;
      border-radius: 50%;
      background: var(--accent);
      content: "";
    }

    .education-title {
      font-size: 11.3pt;
      font-weight: 700;
    }

    .education-detail {
      color: var(--muted);
      font-size: 10.7pt;
      line-height: 1.28;
    }

    @media print {
      .section,
      .entry {
        break-inside: avoid;
      }
    }
  </style>
</head>
<body>
  <main class="resume">
    <header class="header">
      <h1 class="name">${joinFullName(dto.firstName, dto.middleName, dto.lastName)}</h1>
      <p class="headline">${localeContent.GeneralRolesHeadline}</p>
      <div class="contacts">
        ${dto.contacts.phone ? `<span>WhatsApp: ${dto.contacts.phone}</span>` : ""}
        ${dto.contacts.email ? `<span>${dto.contacts.email}</span>` : ""}
        ${dto.address ? `<span>${dto.address}</span>` : ""}
      </div>
    </header>

    ${
      dto.additionalInfo || dto.objectives
        ? `<div class="availability">${[dto.additionalInfo, dto.objectives].filter(Boolean).join("<br />")}</div>`
        : ""
    }

    <div class="content-grid${hasSidebarContent ? "" : " without-sidebar"}">
      ${
        hasSidebarContent
          ? `
      <aside class="sidebar">
        ${
          dto.skills.length
            ? `
        <section class="section sidebar-section">
          <h2 class="section-title">${localeContent.Skills}</h2>
          <ul class="skills-list">
            ${dto.skills.map((skill) => `<li class="skill-item">${skill.name}</li>`).join("")}
          </ul>
        </section>`
            : ""
        }

        ${
          dto.languages.length
            ? `
        <section class="section sidebar-section">
          <h2 class="section-title">${localeContent.Languages}</h2>
          <div class="language-list">
            ${dto.languages
              .map(
                (language) => `
              <div class="language-item">
                <span class="language-name">${language.name}</span>
                <span class="language-proficiency">${language.proficiency}</span>
              </div>`,
              )
              .join("")}
          </div>
        </section>`
            : ""
        }

        ${
          dto.hobbies.length
            ? `
        <section class="section sidebar-section">
          <h2 class="section-title">${localeContent.Hobbies}</h2>
          <div class="hobbies-grid">
            ${dto.hobbies.map((hobby) => `<span class="hobby">${hobby.description}</span>`).join("")}
          </div>
        </section>`
            : ""
        }

        ${
          dto.education.length
            ? `
        <section class="section sidebar-section">
          <h2 class="section-title">${localeContent.Education}</h2>
          ${dto.education
            .map(
              (education) => `
            <div class="education-title">${education.degree}</div>
            <div class="education-detail">${education.institution}${education.description ? ` • ${education.description}` : ""}</div>`,
            )
            .join("")}
        </section>`
            : ""
        }
      </aside>`
          : ""
      }

      <div class="main-column">
        ${
          dto.summary
            ? `
        <section class="section profile-section">
          <h2 class="section-title">${localeContent.Summary}</h2>
          <p class="profile-copy">${dto.summary}</p>
        </section>`
            : ""
        }

        ${
          experiences.length
            ? `
        <section class="section experience-section">
          <h2 class="section-title">${localeContent.Experience}</h2>
          <div class="experience-list">
            ${experiences
              .map(
                (experience) => `
              <article class="entry">
                <h3 class="entry-title">${experience.title}${experience.company ? ` — ${experience.company}` : ""}</h3>
                ${experience.location ? `<div class="entry-meta">${experience.location}</div>` : ""}
                ${experience.description ? `<p class="entry-description">${experience.description}</p>` : ""}
              </article>`,
              )
              .join("")}
          </div>
        </section>`
            : ""
        }
      </div>
    </div>
  </main>
</body>
</html>
`;
}
