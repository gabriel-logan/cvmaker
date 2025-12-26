import type { CreateCVDto } from "src/cvs/dto/create-cv.dto";

export function cvExample1Template(dto: CreateCVDto): string {
  const fullName = [dto.firstName, dto.middleName, dto.lastName]
    .filter(Boolean)
    .join(" ");

  const date = (v?: string | number | null): string =>
    v ? new Date(v).toLocaleDateString() : "";

  return `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8" />
<title>${dto.cVName}</title>

<style>
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

  body {
    margin: 0;
    padding: 0;
    background: white;
    font-size: 13px;
    line-height: 1.4;
  }

  .cv {
    display: grid;
    grid-template-columns: 300px 1fr;
    width: 100%;
    min-height: 100vh;
  }

  /* SIDEBAR */
  .sidebar {
    background: var(--primary);
    color: #e5e7eb;
    padding: 20px 18px;
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

  /* CONTENT */
  .content {
    padding: 24px 28px;
    color: var(--primary);
  }

  section {
    margin-bottom: 20px;
  }

  h2 {
    font-size: 18px;
    margin-bottom: 10px;
    border-bottom: 2px solid #e5e7eb;
    padding-bottom: 4px;
  }

  .item {
    margin-bottom: 10px;
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
  }

  footer {
    font-size: 10px;
    color: var(--muted);
    margin-top: 20px;
    border-top: 1px solid #e5e7eb;
    padding-top: 8px;
  }
</style>
</head>

<body>
<div class="cv">

<!-- SIDEBAR -->
<aside class="sidebar">
  ${dto.avatar ? `<img src="${dto.avatar}" class="avatar" />` : ""}

  <div class="name">${fullName}</div>
  ${dto.nickname ? `<div class="nickname">${dto.nickname}</div>` : ""}

  <div class="side-section">
    <h3>Contato</h3>
    ${dto.contacts.email ? `<p>${dto.contacts.email}</p>` : ""}
    ${dto.contacts.phone ? `<p>${dto.contacts.phone}</p>` : ""}
    ${dto.address ? `<p>${dto.address}</p>` : ""}
  </div>

  ${
    dto.skills.length
      ? `
    <div class="side-section">
      <h3>Habilidades</h3>
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
      <h3>Idiomas</h3>
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
      <h3>Hobbies</h3>
      ${dto.hobbies.map((h) => `<p>${h.description}</p>`).join("")}
    </div>`
      : ""
  }

  ${
    dto.links.length
      ? `
    <div class="side-section">
      <h3>Links</h3>
      ${dto.links.map((l) => `<a href="${l.url}">${l.label}</a>`).join("<br/>")}
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
  <h2>Resumo</h2>
  <p>${dto.summary}</p>
</section>`
    : ""
}

${
  dto.objectives
    ? `
<section>
  <h2>Objetivos</h2>
  <p>${dto.objectives}</p>
</section>`
    : ""
}

${
  dto.experience.length
    ? `
<section>
  <h2>Experiência Profissional</h2>
  ${dto.experience
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
  <h2>Formação Acadêmica</h2>
  ${dto.education
    .map(
      (e) => `
    <div class="item">
      <div class="item-title">${e.degree} em ${e.fieldOfStudy}</div>
      <div class="item-subtitle">${e.institution}</div>
      <div class="dates">
        ${e.startDate} ${e.endDate ? `– ${e.endDate}` : ""}
        ${e.location ? ` | ${e.location}` : ""}
      </div>
      ${e.grade ? `<p>Nota: ${e.grade}</p>` : ""}
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
  <h2>Projetos</h2>
  ${dto.projects
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
  <h2>Certificações</h2>
  ${dto.certifications
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
  <h2>Outras Experiências</h2>
  ${dto.otherExperiences
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
  <h2>Referências</h2>
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
  <h2>Informações Adicionais</h2>
  <p>${dto.additionalInfo}</p>
</section>`
    : ""
}

<footer>
  CV ID: ${dto.id} <br/>
  Criado em: ${date(dto.createdAt)} | Atualizado em: ${date(dto.updatedAt)}
</footer>

</main>
</div>
</body>
</html>
`;
}
