import type { CreateCvDto } from "src/cvs/dto/create-cv.dto";

export function cvExample1Template(data: CreateCvDto): string {
  const skills = data.skills;
  const languages = data.languages;
  const experience = data.experience;
  const education = data.education;
  const projects = data.projects;
  const contacts = data.contacts;

  return `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <title>${data.cVName}</title>

  <style>
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      font-family: "Inter", system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
    }

    body {
      background: #f4f6f8;
      padding: 40px;
      color: #1f2937;
    }

    .cv {
      max-width: 900px;
      margin: 0 auto;
      background: #ffffff;
      border-radius: 14px;
      overflow: hidden;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);
    }

    /* HEADER */
    .header {
      background: linear-gradient(135deg, #4f46e5, #6366f1);
      color: #ffffff;
      padding: 32px 40px;
    }

    .header h1 {
      font-size: 32px;
      font-weight: 700;
    }

    .header h2 {
      margin-top: 6px;
      font-size: 18px;
      font-weight: 400;
      opacity: 0.9;
    }

    .header .contacts {
      margin-top: 16px;
      display: flex;
      gap: 24px;
      font-size: 14px;
      flex-wrap: wrap;
      opacity: 0.95;
    }

    /* BODY */
    .content {
      display: grid;
      grid-template-columns: 1fr 2fr;
    }

    /* SIDEBAR */
    .sidebar {
      background: #f9fafb;
      padding: 32px;
      border-right: 1px solid #e5e7eb;
    }

    .section {
      margin-bottom: 28px;
    }

    .section-title {
      font-size: 13px;
      font-weight: 700;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: #4f46e5;
      margin-bottom: 12px;
    }

    .sidebar p,
    .sidebar li {
      font-size: 14px;
      line-height: 1.6;
      color: #374151;
    }

    .sidebar ul {
      list-style: none;
    }

    .sidebar li::before {
      content: "•";
      color: #6366f1;
      margin-right: 8px;
    }

    /* MAIN */
    .main {
      padding: 32px 40px;
    }

    .item {
      margin-bottom: 22px;
    }

    .item h3 {
      font-size: 16px;
      font-weight: 600;
      color: #111827;
    }

    .item span {
      display: block;
      font-size: 13px;
      color: #6b7280;
      margin-top: 2px;
    }

    .item p {
      margin-top: 8px;
      font-size: 14px;
      line-height: 1.6;
      color: #374151;
    }

    .badge {
      display: inline-block;
      background: #eef2ff;
      color: #4338ca;
      padding: 4px 10px;
      border-radius: 999px;
      font-size: 12px;
      margin: 4px 6px 0 0;
    }
  </style>
</head>

<body>
  <div class="cv">

    <!-- HEADER -->
    <header class="header">
      <h1>${data.firstName} ${data.lastName}</h1>
      <h2>${data.cVName}</h2>

      <div class="contacts">
        ${contacts.email ? `<span>📧 ${contacts.email}</span>` : ""}
        ${contacts.phone ? `<span>📞 ${contacts.phone}</span>` : ""}
        ${data.address ? `<span>📍 ${data.address}</span>` : ""}
      </div>
    </header>

    <!-- CONTENT -->
    <div class="content">

      <!-- SIDEBAR -->
      <aside class="sidebar">

        ${
          data.summary
            ? `
        <div class="section">
          <div class="section-title">Resumo</div>
          <p>${data.summary}</p>
        </div>
        `
            : ""
        }

        ${
          skills.length
            ? `
        <div class="section">
          <div class="section-title">Skills</div>
          <ul>
            ${skills
              .map((s) => `<li>${s.name}${s.level ? ` — ${s.level}` : ""}</li>`)
              .join("")}
          </ul>
        </div>
        `
            : ""
        }

        ${
          languages.length
            ? `
        <div class="section">
          <div class="section-title">Idiomas</div>
          <ul>
            ${languages
              .map((l) => `<li>${l.name} — ${l.proficiency}</li>`)
              .join("")}
          </ul>
        </div>
        `
            : ""
        }

      </aside>

      <!-- MAIN -->
      <main class="main">

        ${
          experience.length
            ? `
        <div class="section">
          <div class="section-title">Experiência</div>
          ${experience
            .map(
              (exp) => `
            <div class="item">
              <h3>${exp.position} • ${exp.company}</h3>
              <span>${exp.startDate} — ${exp.endDate ?? "Atual"}</span>
              ${exp.responsibilities ? `<p>${exp.responsibilities}</p>` : ""}
            </div>
          `,
            )
            .join("")}
        </div>
        `
            : ""
        }

        ${
          education.length
            ? `
        <div class="section">
          <div class="section-title">Educação</div>
          ${education
            .map(
              (edu) => `
            <div class="item">
              <h3>${edu.degree} — ${edu.institution}</h3>
              <span>${edu.startDate} — ${edu.endDate ?? "Atual"}</span>
              <p>${edu.fieldOfStudy}</p>
            </div>
          `,
            )
            .join("")}
        </div>
        `
            : ""
        }

        ${
          projects.length
            ? `
        <div class="section">
          <div class="section-title">Projetos</div>
          ${projects
            .map(
              (proj) => `
            <div class="item">
              <h3>${proj.name}</h3>
              <p>${proj.description}</p>
            </div>
          `,
            )
            .join("")}
        </div>
        `
            : ""
        }

      </main>
    </div>
  </div>
</body>
</html>
`;
}
