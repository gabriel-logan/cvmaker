import type { CreateCVDto } from "src/cvs/dto/create-cv.dto";

export function cvExample2Template(dto: CreateCVDto): string {
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
    --primary: #1e293b;
    --accent: #0ea5e9;
    --text: #334155;
    --text-light: #64748b;
    --border: #e2e8f0;
    --bg-subtle: #f8fafc;
  }

  * {
    box-sizing: border-box;
    font-family: "Georgia", "Times New Roman", serif;
  }

  body {
    margin: 0;
    padding: 0;
    background: white;
    color: var(--text);
    font-size: 13px;
    line-height: 1.4;
  }

  .cv-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 30px 40px;
  }

  /* HEADER */
  .header {
    text-align: center;
    padding-bottom: 20px;
    border-bottom: 3px solid var(--accent);
    margin-bottom: 20px;
  }

  .header-name {
    font-size: 32px;
    font-weight: 700;
    color: var(--primary);
    margin: 0 0 4px 0;
    letter-spacing: -0.5px;
  }

  .header-nickname {
    font-size: 15px;
    color: var(--text-light);
    font-style: italic;
    margin-bottom: 12px;
  }

  .header-contacts {
    display: flex;
    justify-content: center;
    gap: 15px;
    flex-wrap: wrap;
    font-size: 12px;
    color: var(--text);
  }

  .header-contacts span {
    white-space: nowrap;
  }

  .header-contacts span:not(:last-child)::after {
    content: "•";
    margin-left: 15px;
    color: var(--text-light);
  }

  /* SECTIONS */
  section {
    margin-bottom: 20px;
  }

  .section-title {
    font-size: 18px;
    font-weight: 700;
    color: var(--primary);
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: 12px;
    padding-bottom: 6px;
    border-bottom: 2px solid var(--border);
  }

  .section-content {
    font-size: 13px;
    line-height: 1.5;
    color: var(--text);
  }

  .item {
    margin-bottom: 12px;
    page-break-inside: avoid;
  }

  .item-header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin-bottom: 4px;
    gap: 15px;
  }

  .item-title {
    font-weight: 700;
    font-size: 14px;
    color: var(--primary);
  }

  .item-subtitle {
    font-size: 13px;
    color: var(--text);
    font-style: italic;
    margin-bottom: 2px;
  }

  .item-date {
    font-size: 12px;
    color: var(--text-light);
    white-space: nowrap;
  }

  .item-location {
    font-size: 12px;
    color: var(--text-light);
  }

  .item-description {
    margin-top: 4px;
    line-height: 1.4;
  }

  /* GRID LAYOUTS */
  .two-column {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
  }

  .skill-item, .language-item {
    margin-bottom: 6px;
  }

  .skill-name, .language-name {
    font-weight: 600;
    color: var(--primary);
  }

  .skill-level, .language-level {
    color: var(--text-light);
    font-size: 12px;
  }

  .links-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .links-list li {
    margin-bottom: 6px;
  }

  .links-list a {
    color: var(--accent);
    text-decoration: none;
    border-bottom: 1px solid transparent;
    transition: border-color 0.2s;
  }

  .links-list a:hover {
    border-bottom-color: var(--accent);
  }

  footer {
    margin-top: 20px;
    padding-top: 12px;
    border-top: 1px solid var(--border);
    font-size: 10px;
    color: var(--text-light);
    text-align: center;
  }

  @media print {
    .cv-container {
      padding: 20px 30px;
    }
  }
</style>
</head>

<body>
<div class="cv-container">

<!-- HEADER -->
<header class="header">
  <h1 class="header-name">${fullName}</h1>
  ${dto.nickname ? `<div class="header-nickname">"${dto.nickname}"</div>` : ""}
  
  <div class="header-contacts">
    ${dto.contacts.email ? `<span>${dto.contacts.email}</span>` : ""}
    ${dto.contacts.phone ? `<span>${dto.contacts.phone}</span>` : ""}
    ${dto.address ? `<span>${dto.address}</span>` : ""}
  </div>
</header>

<!-- SUMMARY -->
${
  dto.summary
    ? `
<section>
  <h2 class="section-title">Resumo Profissional</h2>
  <div class="section-content">${dto.summary}</div>
</section>`
    : ""
}

<!-- OBJECTIVES -->
${
  dto.objectives
    ? `
<section>
  <h2 class="section-title">Objetivos</h2>
  <div class="section-content">${dto.objectives}</div>
</section>`
    : ""
}

<!-- EXPERIENCE -->
${
  dto.experience.length
    ? `
<section>
  <h2 class="section-title">Experiência Profissional</h2>
  ${dto.experience
    .map(
      (e) => `
    <div class="item">
      <div class="item-header">
        <div class="item-title">${e.position}</div>
        <div class="item-date">
          ${e.startDate} ${e.endDate ? `– ${e.endDate}` : "– Presente"}
        </div>
      </div>
      <div class="item-subtitle">${e.company}</div>
      ${e.location ? `<div class="item-location">${e.location}</div>` : ""}
      ${e.responsibilities ? `<div class="item-description">${e.responsibilities}</div>` : ""}
    </div>`,
    )
    .join("")}
</section>`
    : ""
}

<!-- EDUCATION -->
${
  dto.education.length
    ? `
<section>
  <h2 class="section-title">Formação Acadêmica</h2>
  ${dto.education
    .map(
      (e) => `
    <div class="item">
      <div class="item-header">
        <div class="item-title">${e.degree} em ${e.fieldOfStudy}</div>
        <div class="item-date">
          ${e.startDate} ${e.endDate ? `– ${e.endDate}` : ""}
        </div>
      </div>
      <div class="item-subtitle">${e.institution}</div>
      ${e.location ? `<div class="item-location">${e.location}</div>` : ""}
      ${e.grade ? `<div class="item-description">Nota: ${e.grade}</div>` : ""}
      ${e.description ? `<div class="item-description">${e.description}</div>` : ""}
    </div>`,
    )
    .join("")}
</section>`
    : ""
}

<!-- SKILLS & LANGUAGES -->
${
  dto.skills.length || dto.languages.length
    ? `
<section>
  <h2 class="section-title">Habilidades e Idiomas</h2>
  <div class="two-column">
    ${
      dto.skills.length
        ? `
      <div>
        <h3 style="font-size: 16px; color: var(--primary); margin-bottom: 12px;">Habilidades</h3>
        ${dto.skills
          .map(
            (s) => `
          <div class="skill-item">
            <span class="skill-name">${s.name}</span>
            ${s.level ? `<span class="skill-level"> — ${s.level}</span>` : ""}
          </div>`,
          )
          .join("")}
      </div>`
        : ""
    }
    ${
      dto.languages.length
        ? `
      <div>
        <h3 style="font-size: 16px; color: var(--primary); margin-bottom: 12px;">Idiomas</h3>
        ${dto.languages
          .map(
            (l) => `
          <div class="language-item">
            <span class="language-name">${l.name}</span>
            <span class="language-level"> — ${l.proficiency}</span>
          </div>`,
          )
          .join("")}
      </div>`
        : ""
    }
  </div>
</section>`
    : ""
}

<!-- PROJECTS -->
${
  dto.projects.length
    ? `
<section>
  <h2 class="section-title">Projetos</h2>
  ${dto.projects
    .map(
      (p) => `
    <div class="item">
      <div class="item-header">
        <div class="item-title">${p.name}</div>
        <div class="item-date">
          ${p.startDate} ${p.endDate ? `– ${p.endDate}` : ""}
        </div>
      </div>
      ${p.location ? `<div class="item-location">${p.location}</div>` : ""}
      <div class="item-description">${p.description}</div>
      ${p.link ? `<div style="margin-top: 6px;"><a href="${p.link}">${p.link}</a></div>` : ""}
    </div>`,
    )
    .join("")}
</section>`
    : ""
}

<!-- CERTIFICATIONS -->
${
  dto.certifications.length
    ? `
<section>
  <h2 class="section-title">Certificações</h2>
  ${dto.certifications
    .map(
      (c) => `
    <div class="item">
      <div class="item-header">
        <div class="item-title">${c.name}</div>
        <div class="item-date">
          ${c.issueDate}${c.expirationDate ? ` – ${c.expirationDate}` : ""}
        </div>
      </div>
      <div class="item-subtitle">${c.issuingOrganization}</div>
      ${c.credentialID ? `<div class="item-description">ID: ${c.credentialID}</div>` : ""}
      ${c.credentialURL ? `<div style="margin-top: 6px;"><a href="${c.credentialURL}">${c.credentialURL}</a></div>` : ""}
    </div>`,
    )
    .join("")}
</section>`
    : ""
}

<!-- OTHER EXPERIENCES -->
${
  dto.otherExperiences.length
    ? `
<section>
  <h2 class="section-title">Outras Experiências</h2>
  ${dto.otherExperiences
    .map(
      (o) => `
    <div class="item">
      <div class="item-header">
        <div class="item-title">${o.title}</div>
        <div class="item-date">
          ${o.startDate ?? ""} ${o.endDate ? `– ${o.endDate}` : ""}
        </div>
      </div>
      ${o.location ? `<div class="item-location">${o.location}</div>` : ""}
      <div class="item-description">${o.description}</div>
    </div>`,
    )
    .join("")}
</section>`
    : ""
}

<!-- HOBBIES -->
${
  dto.hobbies.length
    ? `
<section>
  <h2 class="section-title">Hobbies e Interesses</h2>
  <div class="section-content">
    ${dto.hobbies.map((h) => h.description).join(" • ")}
  </div>
</section>`
    : ""
}

<!-- LINKS -->
${
  dto.links.length
    ? `
<section>
  <h2 class="section-title">Links</h2>
  <ul class="links-list">
    ${dto.links.map((l) => `<li><a href="${l.url}">${l.label}</a></li>`).join("")}
  </ul>
</section>`
    : ""
}

<!-- REFERENCES -->
${
  dto.references.length
    ? `
<section>
  <h2 class="section-title">Referências</h2>
  ${dto.references
    .map(
      (r) => `
    <div class="item">
      <strong>${r.name}</strong>
      ${r.relationship ? ` — ${r.relationship}` : ""}
      ${r.contactInfo ? `<br/><span style="color: var(--text-light);">${r.contactInfo}</span>` : ""}
    </div>`,
    )
    .join("")}
</section>`
    : ""
}

<!-- ADDITIONAL INFO -->
${
  dto.additionalInfo
    ? `
<section>
  <h2 class="section-title">Informações Adicionais</h2>
  <div class="section-content">${dto.additionalInfo}</div>
</section>`
    : ""
}

<footer>
  CV ID: ${dto.id} | Criado em: ${date(dto.createdAt)} | Atualizado em: ${date(dto.updatedAt)}
</footer>

</div>
</body>
</html>
`;
}
