import type { CreateCVDto } from "src/cvs/dto/create-cv.dto";
import { formatDate, joinFullName, sortByDate } from "src/shared/utils";

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
            margin: 12mm;
        }

        * {
            box-sizing: border-box;
        }

        body {
            margin: 0;
            font-family: Arial, Helvetica, sans-serif;
            font-size: 10.7px;
            line-height: 1.35;
            color: #222;
        }

        h1 {
            font-size: 22px;
            margin: 0;
            font-weight: 700;
        }

        h2 {
            font-size: 10.9px;
            margin: 14px 0 5px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            border-bottom: 1px solid #ddd;
            padding-bottom: 2px;
        }

        h3 {
            font-size: 10.6px;
            margin: 0;
            font-weight: 600;
        }

        p {
            margin: 3px 0;
        }

        a {
            text-decoration: none;
        }

        .header {
            margin-bottom: 8px;
        }

        .nickname {
            font-size: 10.8px;
            color: #666;
        }

        .container {
            display: flex;
            gap: 12px;
        }

        .left {
            width: 33%;
        }

        .right {
            width: 67%;
        }

        .item {
            margin-bottom: 5px;
        }

        .muted {
            color: #666;
            font-size: 9.6px;
        }

        .contact-link {
            font-weight: 600;
            color: #222;
        }

        .side-link {
            font-size: 9.6px;
            color: #444;
            border-left: 2px solid #ccc;
            padding-left: 6px;
            display: inline-block;
        }

        .project-link {
            font-size: 9.6px;
            color: #1a5fb4;
            font-weight: 600;
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
            font-size: 9.6px;
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
        <div class="left">

            <h2>${localeContent.Contacts}</h2>
            ${
              dto.contacts.email
                ? `<p><a class="contact-link" href="mailto:${dto.contacts.email}">${dto.contacts.email}</a></p>`
                : ""
            }
            ${
              dto.contacts.phone
                ? `<p><a class="contact-link" href="tel:${dto.contacts.phone}">${dto.contacts.phone}</a></p>`
                : ""
            }
            ${dto.address ? `<p class="muted">${dto.address}</p>` : ""}

            <h2>${localeContent.Skills}</h2>
            <div class="skills">
                ${dto.skills.map((s) => `<div class="skill">${s.name}</div>`).join("")}
            </div>

            <h2>${localeContent.Languages}</h2>
            ${dto.languages
              .map(
                (l) => `
            <p>
                <strong>${l.name}</strong><br />
                <span class="muted">${l.proficiency}</span>
            </p>
            `,
              )
              .join("")}

            <h2>${localeContent.Links}</h2>
            ${dto.links
              .map(
                (l) => `
            <p class="link">
                <strong>${l.label}</strong><br />
                <a class="side-link" href="${l.url}">${l.url}</a>
            </p>
            `,
              )
              .join("")}

            ${
              dto.objectives
                ? `
            <h2>${localeContent.Objectives}</h2>
            <p>${dto.objectives}</p>
            `
                : ""
            }

            ${
              dto.education.length
                ? `
            <h2>${localeContent.Education}</h2>
            ${sortByDate(dto.education, (e) => e.endDate ?? e.startDate, "desc")
              .map(
                (e) => `
            <div class="item">
                <h3>${e.degree}</h3>
                <div class="muted">
                    ${e.institution}<br />
                    ${e.startDate ? formatDate(e.startDate) : ""} ${
                      e.endDate ? `- ${formatDate(e.endDate)}` : ""
                    }
                </div>
                ${e.fieldOfStudy ? `<p>${e.fieldOfStudy}</p>` : ""}
            </div>
            `,
              )
              .join("")}
            `
                : ""
            }

            ${
              dto.otherExperiences.length
                ? `
            <h2>${localeContent.OtherExperiences}</h2>
            ${sortByDate(
              dto.otherExperiences,
              (o) => o.endDate ?? o.startDate,
              "desc",
            )
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

        <div class="right">

            ${
              dto.summary
                ? `
            <h2>${localeContent.Summary}</h2>
            <p>${dto.summary}</p>
            `
                : ""
            }

            <h2>${localeContent.Experience}</h2>
            ${sortByDate(
              dto.experience,
              (e) => e.endDate ?? e.startDate,
              "desc",
            )
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

            <h2>${localeContent.Projects}</h2>
            ${sortByDate(dto.projects, (p) => p.endDate ?? p.startDate, "desc")
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
                ${
                  p.link
                    ? `<p><a class="project-link" href="${p.link}">${p.link}</a></p>`
                    : ""
                }
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
