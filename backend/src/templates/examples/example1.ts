import type { CreateCVDto } from "src/cvs/dto/create-cv.dto";
import { formatDate, joinFullName, sortByDate } from "src/shared/utils";

import type { Locale, LocaleContent } from "../locales";

export function cvExample1Template(
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

    <style>
        @page {
            size: A4;
            margin: 0;
        }

        :root {
            --primary: #111827;
            --secondary: #374151;
            --muted: #6b7280;
            --accent: #2563eb;
            --bg-soft: #f9fafb;
        }

        * {
            box-sizing: border-box;
            font-family: "Inter", Arial, sans-serif;
        }

        html,
        body {
            margin: 0;
            padding: 0;
            width: 210mm;
            font-size: 13px;
            line-height: 1.4;
            background: white;
        }

        .sidebar {
            position: fixed;
            top: 0;
            left: 0;
            width: 300px;
            height: 297mm;
            background: var(--primary);
            color: #e5e7eb;
            padding: 20px 18px;
        }

        .sidebar * {
            break-inside: avoid;
        }

        .avatar {
            width: 100px;
            height: 100px;
            border-radius: 50%;
            object-fit: cover;
            margin-bottom: 12px;
        }

        .name {
            font-size: 22px;
            font-weight: 700;
        }

        .nickname {
            font-size: 12px;
            color: #9ca3af;
        }

        .side-section {
            margin-top: 16px;
        }

        .side-section h3 {
            font-size: 11px;
            letter-spacing: 1px;
            text-transform: uppercase;
            color: #93c5fd;
            margin-bottom: 6px;
        }

        .side-section p,
        .side-section li,
        .side-section a {
            font-size: 12px;
            color: #e5e7eb;
            margin: 2px 0;
            text-decoration: none;
        }

        .content {
            margin-left: 300px;
            padding: 24px 28px;
            color: var(--primary);
            background: white;
        }

        section {
            margin-bottom: 20px;
            break-inside: avoid;
        }

        h2 {
            font-size: 18px;
            margin-bottom: 10px;
            border-bottom: 2px solid #e5e7eb;
            padding-bottom: 4px;
            break-after: avoid;
        }

        .item {
            margin-bottom: 10px;
            break-inside: avoid;
        }

        .item-title {
            font-weight: 600;
            font-size: 14px;
        }

        .item-subtitle {
            font-size: 12px;
            color: var(--secondary);
        }

        .dates {
            font-size: 11px;
            color: var(--muted);
        }

        .tags span {
            display: inline-block;
            padding: 4px 8px;
            background: var(--bg-soft);
            border-radius: 999px;
            font-size: 11px;
            margin: 2px 4px 0 0;
        }

        a {
            color: var(--accent);
            word-break: break-word;
        }

        footer {
            font-size: 10px;
            color: var(--muted);
            margin-top: 24px;
            border-top: 1px solid #e5e7eb;
            padding-top: 8px;
            break-inside: avoid;
        }
    </style>
</head>

<body>
  <!-- SIDEBAR -->
  <aside class="sidebar">
      ${dto.avatar ? `<img src="${dto.avatar}" class="avatar" />` : ""}

      <div class="name">${joinFullName(dto.firstName, dto.middleName, dto.lastName)}</div>
      ${dto.nickname ? `<div class="nickname">${dto.nickname}</div>` : ""}

      <div class="side-section">
          <h3>${localeContent.Contacts}</h3>
          ${dto.contacts.email ? `<p>${dto.contacts.email}</p>` : ""}
          ${dto.contacts.phone ? `<p>${dto.contacts.phone}</p>` : ""}
          ${dto.address ? `<p>${dto.address}</p>` : ""}
      </div>

      ${
        dto.skills.length
          ? `
      <div class="side-section">
          <h3>${localeContent.Skills}</h3>
          ${dto.skills
            .map((s) => `<p>${s.name}${s.level ? ` • ${s.level}` : ""}</p>`)
            .join("")}
      </div>`
          : ""
      }

      ${
        dto.languages.length
          ? `
      <div class="side-section">
          <h3>${localeContent.Languages}</h3>
          ${dto.languages
            .map((l) => `<p>${l.name} • ${l.proficiency}</p>`)
            .join("")}
      </div>`
          : ""
      }

      ${
        dto.hobbies.length
          ? `
      <div class="side-section">
          <h3>${localeContent.Hobbies}</h3>
          ${dto.hobbies.map((h) => `<p>${h.description}</p>`).join("")}
      </div>`
          : ""
      }

      ${
        dto.links.length
          ? `
      <div class="side-section">
          <h3>${localeContent.Links}</h3>
          ${dto.links.map((l) => `<a href="${l.url}">${l.label}</a>`).join("<br />")}
      </div>`
          : ""
      }
  </aside>

  <!-- CONTENT -->
  <main class="content">

      ${
        dto.summary
          ? `
      <section>
          <h2>${localeContent.Summary}</h2>
          <p>${dto.summary}</p>
      </section>`
          : ""
      }

      ${
        dto.objectives
          ? `
      <section>
          <h2>${localeContent.Objectives}</h2>
          <p>${dto.objectives}</p>
      </section>`
          : ""
      }

      ${
        dto.experience.length
          ? `
      <section>
          <h2>${localeContent.Experience}</h2>
          ${sortByDate(dto.experience, (e) => e.startDate, "desc")
            .map(
              (e) => `
          <div class="item">
              <div class="item-title">${e.position} — ${e.company}</div>
              <div class="dates">
                  ${e.startDate} ${e.endDate ? `– ${e.endDate}` : "– Atual"}
                  ${e.location ? ` | ${e.location}` : ""}
              </div>
              ${e.responsibilities ? `<p>${e.responsibilities}</p>` : ""}
          </div>`,
            )
            .join("")}
      </section>`
          : ""
      }

      ${
        dto.education.length
          ? `
      <section>
          <h2>${localeContent.Education}</h2>
          ${sortByDate(dto.education, (e) => e.startDate, "desc")
            .map(
              (e) => `
          <div class="item">
              <div class="item-title">${e.degree} em ${e.fieldOfStudy}</div>
              <div class="item-subtitle">${e.institution}</div>
              <div class="dates">
                  ${e.startDate} ${e.endDate ? `– ${e.endDate}` : ""}
                  ${e.location ? ` | ${e.location}` : ""}
              </div>
              ${e.grade ? `<p>${localeContent.Grade}: ${e.grade}</p>` : ""}
              ${e.description ? `<p>${e.description}</p>` : ""}
          </div>`,
            )
            .join("")}
      </section>`
          : ""
      }

      ${
        dto.projects.length
          ? `
      <section>
          <h2>${localeContent.Projects}</h2>
          ${sortByDate(dto.projects, (p) => p.startDate, "desc")
            .map(
              (p) => `
          <div class="item">
              <div class="item-title">${p.name}</div>
              <div class="dates">
                  ${p.startDate} ${p.endDate ? `– ${p.endDate}` : ""}
                  ${p.location ? ` | ${p.location}` : ""}
              </div>
              <p>${p.description}</p>
              ${p.link ? `<a href="${p.link}">${p.link}</a>` : ""}
          </div>`,
            )
            .join("")}
      </section>`
          : ""
      }

      ${
        dto.certifications.length
          ? `
      <section>
          <h2>${localeContent.Certifications}</h2>
          ${sortByDate(dto.certifications, (c) => c.issueDate, "desc")
            .map(
              (c) => `
          <div class="item">
              <div class="item-title">${c.name}</div>
              <div class="item-subtitle">${c.issuingOrganization}</div>
              <div class="dates">
                  ${c.issueDate}
                  ${c.expirationDate ? `– ${c.expirationDate}` : ""}
              </div>
              ${c.credentialID ? `<p>ID: ${c.credentialID}</p>` : ""}
              ${c.credentialURL ? `<a href="${c.credentialURL}">${c.credentialURL}</a>` : ""}
          </div>`,
            )
            .join("")}
      </section>`
          : ""
      }

      ${
        dto.otherExperiences.length
          ? `
      <section>
          <h2>${localeContent.OtherExperiences}</h2>
          ${sortByDate(dto.otherExperiences, (o) => o.startDate, "desc")
            .map(
              (o) => `
          <div class="item">
              <div class="item-title">${o.title}</div>
              <div class="dates">
                  ${o.startDate ?? ""} ${o.endDate ? `– ${o.endDate}` : ""}
                  ${o.location ? ` | ${o.location}` : ""}
              </div>
              <p>${o.description}</p>
          </div>`,
            )
            .join("")}
      </section>`
          : ""
      }

      ${
        dto.references.length
          ? `
      <section>
          <h2>${localeContent.References}</h2>
          ${dto.references
            .map(
              (r) => `
          <p>
              ${r.name}
              ${r.relationship ? ` — ${r.relationship}` : ""}
              ${r.contactInfo ? ` (${r.contactInfo})` : ""}
          </p>`,
            )
            .join("")}
      </section>`
          : ""
      }

      ${
        dto.additionalInfo
          ? `
      <section>
          <h2>${localeContent.AdditionalInformation}</h2>
          <p>${dto.additionalInfo}</p>
      </section>`
          : ""
      }

      <footer>
          CV ID: ${dto.id}<br />
          ${localeContent.CreatedAt}: ${formatDate(dto.createdAt)} |
          ${localeContent.UpdatedAt}: ${formatDate(dto.updatedAt)}
      </footer>

  </main>
</body>

</html>
  `;
}
