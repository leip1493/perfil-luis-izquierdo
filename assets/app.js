(() => {
  "use strict";

  const PROFILE = window.PROFILE_DATA;
  const ACTIVITY = window.ACTIVITY_DATA || [];
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let scrollToSection = null;

  const ICONS = {
    menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
    close: '<path d="M6 6l12 12M18 6L6 18"/>',
    pause: '<path d="M9 5v14M15 5v14"/>',
    play: '<path d="M8 5l11 7-11 7V5z"/>',
    arrowUpRight: '<path d="M7 17L17 7M7 7h10v10"/>',
    arrowDown: '<path d="M12 4v16M6 14l6 6 6-6"/>',
    arrowRight: '<path d="M4 12h16M14 6l6 6-6 6"/>',
    arrowUp: '<path d="M12 20V4M6 10l6-6 6 6"/>',
    code: '<path d="M8 9l-4 3 4 3M16 9l4 3-4 3M14 5l-4 14"/>',
    layers: '<path d="M12 3l9 5-9 5-9-5 9-5z"/><path d="M3 12l9 5 9-5M3 16l9 5 9-5"/>',
    database: '<ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v7c0 1.7 3.6 3 8 3s8-1.3 8-3V5M4 12v7c0 1.7 3.6 3 8 3s8-1.3 8-3v-7"/>',
    cloud: '<path d="M7 18h10a4 4 0 0 0 .6-8A6 6 0 0 0 6.1 11 3.5 3.5 0 0 0 7 18z"/>',
    shield: '<path d="M12 3l8 3v5c0 5-3.3 8.5-8 10-4.7-1.5-8-5-8-10V6l8-3z"/><path d="M9 12l2 2 4-4"/>',
    spark: '<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3zM19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8L19 16z"/>',
    mobile: '<rect x="7" y="2" width="10" height="20" rx="2"/><path d="M11 18h2"/>',
    test: '<path d="M9 3h6M10 3v6l-5 8a2 2 0 0 0 1.7 3h10.6a2 2 0 0 0 1.7-3l-5-8V3"/><path d="M8 15h8"/>',
    terminal: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M7 9l3 3-3 3M13 15h4"/>',
    network: '<circle cx="6" cy="6" r="2.5"/><circle cx="18" cy="7" r="2.5"/><circle cx="12" cy="18" r="2.5"/><path d="M8.2 7.2l7.5-.1M7.3 8.2l3.7 7.4M16.8 9.2l-3.5 6.4"/>',
    bolt: '<path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z"/>',
    activity: '<path d="M3 12h4l2.5-7 5 14 2.5-7h4"/>',
    users: '<path d="M16 20v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 10a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM17 4a4 4 0 0 1 0 8M22 20v-2a4 4 0 0 0-3-3.8"/>',
    box: '<path d="M21 8l-9-5-9 5v8l9 5 9-5V8z"/><path d="M3 8l9 5 9-5M12 13v8"/>',
    hexagon: '<path d="M12 2l9 5v10l-9 5-9-5V7l9-5z"/><path d="M12 7l5 3v5l-5 3-5-3v-5l5-3z"/>',
    route: '<circle cx="5" cy="6" r="2"/><circle cx="19" cy="18" r="2"/><path d="M7 6h5a3 3 0 0 1 3 3v3a3 3 0 0 0 3 3h-1M5 8v10h10"/>',
    globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18"/>',
    share: '<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 10.5l6.8-4M8.6 13.5l6.8 4"/>',
    building: '<path d="M4 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16M16 9h3a1 1 0 0 1 1 1v11M8 7h4M8 11h4M8 15h4M8 21h8"/>',
    fileCode: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z"/><path d="M14 2v6h6M10 13l-2 2 2 2M14 13l2 2-2 2"/>',
    stack: '<path d="M12 2l9 5-9 5-9-5 9-5z"/><path d="M3 12l9 5 9-5M3 17l9 5 9-5"/>',
    container: '<path d="M4 7h16v10H4zM8 7v10M12 7v10M16 7v10M4 11h16"/>',
    github: '<path fill="currentColor" stroke="none" d="M12 .8a11.2 11.2 0 0 0-3.5 21.8c.6.1.8-.2.8-.5v-2.1c-3.3.7-4-1.4-4-1.4-.5-1.4-1.3-1.8-1.3-1.8-1.1-.8.1-.8.1-.8 1.2.1 1.8 1.2 1.8 1.2 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.6-.3-5.4-1.3-5.4-5.8 0-1.3.5-2.3 1.2-3.2-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.2 1.2a11 11 0 0 1 5.8 0c2.2-1.5 3.2-1.2 3.2-1.2.6 1.6.2 2.8.1 3.1.8.9 1.2 1.9 1.2 3.2 0 4.5-2.8 5.5-5.4 5.8.4.4.8 1.1.8 2.2v3.2c0 .3.2.6.8.5A11.2 11.2 0 0 0 12 .8z"/>',
    linkedin: '<path fill="currentColor" stroke="none" d="M20.4 20.4h-3.6v-5.6c0-1.3 0-3-1.9-3s-2.1 1.4-2.1 2.9v5.7H9.3V9h3.4v1.6h.1c.5-.9 1.7-1.9 3.5-1.9 3.7 0 4.4 2.4 4.4 5.6v6.1zM5.3 7.4a2.1 2.1 0 1 1 0-4.2 2.1 2.1 0 0 1 0 4.2zM7.1 20.4H3.5V9h3.6v11.4zM22.2 0H1.8C.8 0 0 .8 0 1.7v20.6c0 .9.8 1.7 1.8 1.7h20.4c1 0 1.8-.8 1.8-1.7V1.7c0-.9-.8-1.7-1.8-1.7z"/>',
    mail: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="M3 6l9 7 9-7"/>',
    copy: '<rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>',
    cpu: '<rect x="6" y="6" width="12" height="12" rx="2"/><path d="M9 1v3M15 1v3M9 20v3M15 20v3M1 9h3M1 15h3M20 9h3M20 15h3M10 10h4v4h-4z"/>',
    flask: '<path d="M9 3h6M10 3v6l-5 9a2 2 0 0 0 1.7 3h10.6a2 2 0 0 0 1.7-3l-5-9V3"/><path d="M7 16h10"/>',
    key: '<circle cx="8" cy="15" r="4"/><path d="M11 12l9-9M17 6l3 3M14 9l2 2"/>',
    lock: '<rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/>',
    gauge: '<path d="M4 18a8 8 0 1 1 16 0M12 18l4-5"/><path d="M5 18h2M17 18h2"/>',
    bot: '<rect x="4" y="8" width="16" height="12" rx="3"/><path d="M12 8V4M8 4h8M8 13h.01M16 13h.01M9 17h6"/>',
    plug: '<path d="M8 3v5M16 3v5M6 8h12v3a6 6 0 0 1-12 0V8zM12 17v4"/>',
    sparkles: '<path d="M12 3l1.4 4.1L17.5 8.5l-4.1 1.4L12 14l-1.4-4.1-4.1-1.4 4.1-1.4L12 3zM19 15l.7 2.3L22 18l-2.3.7L19 21l-.7-2.3L16 18l2.3-.7L19 15zM5 14l.6 1.9L7.5 16.5l-1.9.6L5 19l-.6-1.9-1.9-.6 1.9-.6L5 14z"/>',
    fileText: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z"/><path d="M14 2v6h6M8 13h8M8 17h6"/>',
    pen: '<path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>',
    table: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M3 15h18M9 3v18M15 3v18"/>',
    node: '<path d="M12 2l9 5v10l-9 5-9-5V7l9-5z"/><path d="M9 9v6M9 10l6 4v-5"/>',
    nest: '<path d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3z"/><path d="M9 16V8l6 8V8"/>',
    typescript: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M8 10h5M10.5 10v6M15.5 16c.5.5 1.1.7 1.8.7 1.1 0 1.7-.5 1.7-1.3 0-.7-.4-1.1-1.3-1.5l-.6-.2c-1.2-.5-1.7-1-1.7-2 0-1.2 1-2 2.5-2 .7 0 1.3.2 1.8.5"/>',
    go: '<path d="M4 9h6M4 15h5M12 7v10M12 7h4a4 4 0 0 1 0 8h-4M16 15h4"/>',
    check: '<path d="M20 6L9 17l-5-5"/>',
    heart: '<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z"/>',
    comment: '<path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v8z"/>',
    repeat: '<path d="M17 1l4 4-4 4M3 11V9a4 4 0 0 1 4-4h14M7 23l-4-4 4-4M21 13v2a4 4 0 0 1-4 4H3"/>',
    eye: '<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/>',
    external: '<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"/>',
    chevronDown: '<path d="M6 9l6 6 6-6"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    graduation: '<path d="M2 9l10-5 10 5-10 5L2 9z"/><path d="M6 11v5c3 2 9 2 12 0v-5M22 9v6"/>',
    mapPin: '<path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0z"/><circle cx="12" cy="10" r="2.5"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    globe2: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.5 4 5.8 4 9s-1.5 6.5-4 9c-2.5-2.5-4-5.8-4-9s1.5-6.5 4-9z"/>'
  };

  function icon(name, extra = "") {
    const paths = ICONS[name] || ICONS.code;
    return `<svg viewBox="0 0 24 24" aria-hidden="true" ${extra}>${paths}</svg>`;
  }

  function escapeHtml(value = "") {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function initials(value = "") {
    return value.split(/\s+/).filter(Boolean).slice(0, 2).map((part) => part[0]).join("").toUpperCase();
  }

  function normalize(value = "") {
    return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  }

  function alpha(hex, opacity) {
    if (!/^#[0-9a-f]{6}$/i.test(hex)) return `rgba(34, 211, 238, ${opacity})`;
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  }

  function hydrateIcons(root = document) {
    $$("[data-icon]", root).forEach((node) => {
      node.innerHTML = icon(node.dataset.icon);
    });
  }

  function initHero() {
    const hero = PROFILE.hero;
    $("#heroKicker").textContent = hero.kicker;
    $("#heroSummary").textContent = hero.summary;
    const heroTitle = $("#heroTitle");
    if (heroTitle && hero.title) {
      heroTitle.innerHTML = `${escapeHtml(hero.title)}<br><span class="gradient-text">${escapeHtml(hero.accent)}</span> que escalan.`;
    }

    const metaItems = [
      ["mapPin", PROFILE.meta.location],
      ["globe2", PROFILE.meta.workMode],
      ["clock", `${PROFILE.meta.years}+ años de experiencia`],
      ["users", `${PROFILE.meta.followers} seguidores`]
    ];
    $("#heroMeta").innerHTML = metaItems.map(([name, text]) =>
      `<span class="hero-meta-item">${icon(name)}${escapeHtml(text)}</span>`
    ).join("");

    const linkedin = PROFILE.meta.linkedin;
    $("#heroLinkedin").href = linkedin;
    $("#contactLinkedin").href = linkedin;
    $("#contactGithub").href = PROFILE.meta.github;
    $("#emailLink").href = `mailto:${PROFILE.meta.email}`;
    $("#emailLink").innerHTML = `${icon("mail")}${escapeHtml(PROFILE.meta.email)}`;
    $("#contactGithub").innerHTML = `${icon("github")} GitHub ${icon("arrowUpRight")}`;
    $("#contactLinkedin").innerHTML = `${icon("linkedin")} LinkedIn ${icon("arrowUpRight")}`;
    $("#currentYear").textContent = new Date().getFullYear();
  }

  function initMarquee() {
    const items = [
      ["Node.js", "node"], ["NestJS", "nest"], ["TypeScript", "typescript"],
      ["DDD", "box"], ["Hexagonal", "hexagon"], ["TDD", "test"], ["AWS", "cloud"],
      ["Redis", "stack"], ["PostgreSQL", "database"], ["Agentic AI", "bot"],
      ["MCP", "plug"], ["Docker", "container"], ["New Relic", "activity"], ["Go", "go"]
    ];
    const content = items.map(([label, name]) => `<span class="marquee-item">${icon(name)}${escapeHtml(label)}</span>`).join("");
    $("#marqueeTrack").innerHTML = content + content;
  }

  function animateCounter(node) {
    const target = Number(node.dataset.target || 0);
    const suffix = node.dataset.suffix || "";
    const duration = reduceMotion ? 1 : 1150;
    const start = performance.now();
    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      node.innerHTML = `${Math.round(target * eased)}<span>${escapeHtml(suffix)}</span>`;
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  function renderStats() {
    $("#statsGrid").innerHTML = PROFILE.stats.map((stat) => `
      <article class="stat-card">
        <div class="stat-value" data-target="${Number(stat.value)}" data-suffix="${escapeHtml(stat.suffix)}">0</div>
        <div class="stat-label">${escapeHtml(stat.label)}</div>
        <div class="stat-detail">${escapeHtml(stat.detail)}</div>
      </article>
    `).join("");
  }

  function renderImpact() {
    const context = PROFILE.impactContext;
    if (context) {
      $("#impactContextLabel").textContent = context.label;
      $("#impactContextTitle").textContent = context.title;
      $("#impactContextBody").textContent = context.body;
      $("#contextTerms").innerHTML = context.terms.map((item) => `
        <div class="context-term">
          <dt>${escapeHtml(item.term)}</dt>
          <dd>${escapeHtml(item.definition)}</dd>
        </div>
      `).join("");
    }
    $("#impactGrid").innerHTML = PROFILE.impact.map((item) => `
      <article class="impact-card" data-tone="${escapeHtml(item.tone || "cyan")}">
        <div class="impact-icon">${icon(item.icon)}</div>
        <div class="impact-value">${escapeHtml(item.value)}</div>
        <div class="impact-label">${escapeHtml(item.label)}</div>
        <p class="impact-detail">${escapeHtml(item.detail)}</p>
      </article>
    `).join("");
  }

  function renderAbout() {
    $("#aboutLead").textContent = PROFILE.about.lead;
    $("#aboutQuote").textContent = PROFILE.about.quote;
    $("#aboutParagraphs").innerHTML = PROFILE.about.paragraphs.map((text) => `<p>${escapeHtml(text)}</p>`).join("");
    $("#principlesGrid").innerHTML = PROFILE.about.principles.map((item) => `
      <article class="principle-card">
        <div class="principle-icon">${icon(item.icon)}</div>
        <h3>${escapeHtml(item.title)}</h3>
        <p>${escapeHtml(item.text)}</p>
      </article>
    `).join("");
  }

  function renderExperience() {
    $("#experienceTimeline").innerHTML = PROFILE.experience.map((job) => `
      <details class="timeline-item${job.current ? " is-current" : ""}"${job.current ? " open" : ""}>
        <summary class="timeline-summary">
          <div>
            <div class="timeline-company"><span class="company-avatar">${escapeHtml(initials(job.company))}</span>${escapeHtml(job.company)}</div>
            <div class="timeline-role">${escapeHtml(job.role)}</div>
          </div>
          <div class="timeline-period">${escapeHtml(job.period)}<small>${escapeHtml(job.duration)} · ${escapeHtml(job.location)}</small></div>
          <span class="timeline-toggle">${icon("plus")}</span>
        </summary>
        <div class="timeline-body">
          <p>${escapeHtml(job.summary)}</p>
          <ul class="timeline-highlights">${job.highlights.map((point) => `<li>${escapeHtml(point)}</li>`).join("")}</ul>
          <div class="timeline-tech">${job.technologies.map((tech) => `<span class="tech-chip">${escapeHtml(tech)}</span>`).join("")}</div>
        </div>
      </details>
    `).join("");
  }

  let activeStack = "all";
  let stackQuery = "";

  function renderStackFilters() {
    const all = [{ id: "all", label: "Todos" }, ...PROFILE.stack];
    $("#stackFilters").innerHTML = all.map((category) => `
      <button class="filter-button" type="button" role="tab" data-stack-filter="${escapeHtml(category.id)}" aria-selected="${category.id === activeStack}">${escapeHtml(category.label)}</button>
    `).join("");
  }

  function techCard(tech) {
    const color = tech.color || "#22d3ee";
    return `
      <article class="tech-card" style="--tech:${escapeHtml(color)};--tech-bg:${alpha(color, 0.07)};--tech-line:${alpha(color, 0.28)}" title="${escapeHtml(tech.detail)}">
        <div class="tech-card-top">
          <span class="tech-symbol">${icon(tech.icon)}</span>
          <span class="tech-level">${escapeHtml(tech.level)}</span>
        </div>
        <h3 class="tech-name">${escapeHtml(tech.name)}</h3>
        <p class="tech-detail">${escapeHtml(tech.detail)}</p>
      </article>
    `;
  }

  function renderStack() {
    const query = normalize(stackQuery.trim());
    const categories = activeStack === "all" ? PROFILE.stack : PROFILE.stack.filter((category) => category.id === activeStack);
    const techs = categories.flatMap((category) => category.technologies.map((tech) => ({ ...tech, category: category.label })))
      .filter((tech) => !query || normalize(`${tech.name} ${tech.detail} ${tech.level} ${tech.category}`).includes(query));

    if (!techs.length) {
      $("#techGrid").innerHTML = `<div class="empty-state">No encontré tecnologías con “${escapeHtml(stackQuery)}”. Prueba con Node, datos o IA.</div>`;
      return;
    }
    $("#techGrid").innerHTML = techs.map(techCard).join("");
  }

  function renderProjects() {
    $("#projectsGrid").innerHTML = PROFILE.projects.map((project, index) => `
      <article class="project-card" tabindex="0" role="button" aria-label="Ver detalle de ${escapeHtml(project.name)}" data-project-index="${index}">
        <div class="project-card-top">
          <span class="project-kind">${escapeHtml(project.kind)}</span>
          <span class="project-index">${String(index + 1).padStart(2, "0")}</span>
        </div>
        <h3>${escapeHtml(project.name)}</h3>
        <p>${escapeHtml(project.description)}</p>
        <div class="project-card-footer">
          <span class="project-open">${icon("arrowUpRight")} Ver detalle</span>
          <span class="project-status">${escapeHtml(project.status)}</span>
        </div>
      </article>
    `).join("");
  }

  function renderEducation() {
    $("#educationGrid").innerHTML = PROFILE.education.map((item) => `
      <article class="education-card">
        <span class="education-icon">${icon("graduation")}</span>
        <div>
          <h4>${escapeHtml(item.title)}</h4>
          <p>${escapeHtml(item.institution)}</p>
          <small>${escapeHtml(item.period)} · ${escapeHtml(item.detail)}</small>
        </div>
      </article>
    `).join("");

    $("#certificationsGrid").innerHTML = PROFILE.certifications.map((cert) => `
      <article class="cert-card">
        <span class="cert-issuer">${escapeHtml(cert.issuer)}</span>
        <h4>${escapeHtml(cert.name)}</h4>
        <time>${escapeHtml(cert.issued)}</time>
        <div class="cert-skills">${cert.skills.slice(0, 3).map((skill) => `<span class="tech-chip">${escapeHtml(skill)}</span>`).join("")}</div>
      </article>
    `).join("");
    $("#certificationCount").textContent = `(${PROFILE.certifications.length})`;
    $("#languagesList").innerHTML = PROFILE.languages.map((language) => `
      <span class="language-pill">${icon("check")}${escapeHtml(language.name)} · ${escapeHtml(language.level)}</span>
    `).join("");
  }

  let activityQuery = "";

  function linkify(text) {
    const escaped = escapeHtml(text);
    return escaped.replace(/(https?:\/\/[^\s<]+)/g, (url) => {
      const clean = url.replace(/[),.;]+$/, "");
      return `<a href="${clean}" target="_blank" rel="noopener noreferrer">${clean}</a>`;
    });
  }

  function activityStats(item) {
    const stats = [];
    if (item.reactions != null) stats.push(`<span class="activity-stat">${icon("heart")}${item.reactions}</span>`);
    if (item.comments != null) stats.push(`<span class="activity-stat">${icon("comment")}${item.comments}</span>`);
    if (item.reposts != null) stats.push(`<span class="activity-stat">${icon("repeat")}${item.reposts}</span>`);
    if (item.impressions != null) stats.push(`<span class="activity-stat">${icon("eye")}${item.impressions.toLocaleString("es")}</span>`);
    return stats.join("");
  }

  function renderActivity() {
    const query = normalize(activityQuery.trim());
    const items = ACTIVITY.filter((item) => {
      const searchMatch = !query || normalize(`${item.title} ${item.summary} ${item.content} ${item.author} ${item.tags.join(" ")}`).includes(query);
      return searchMatch;
    });

    $("#activityCount").textContent = `Mostrando ${items.length} de ${ACTIVITY.length} publicaciones propias · datos públicos de LinkedIn`;
    if (!items.length) {
      $("#activityGrid").innerHTML = `<div class="empty-state">No hay publicaciones que coincidan con “${escapeHtml(activityQuery)}”.</div>`;
      return;
    }

    $("#activityGrid").innerHTML = items.map((item) => `
      <article class="activity-card" data-type="${item.type}" data-activity-id="${item.id}">
        <div class="activity-top">
          <span class="activity-type ${item.type === "repost" ? "repost" : ""}">${icon(item.type === "post" ? "pen" : "repeat")}${item.type === "post" ? "Publicación propia" : "Compartido"}</span>
          <span class="activity-date">${escapeHtml(item.dateLabel)}</span>
        </div>
        <div class="activity-author">
          <span class="author-avatar">${escapeHtml(initials(item.author))}</span>
          <div><strong>${escapeHtml(item.author)}</strong><small>${escapeHtml(item.authorRole)}</small></div>
        </div>
        <h3>${escapeHtml(item.title)}</h3>
        <p class="activity-summary">${escapeHtml(item.summary)}</p>
        ${item.tags.length ? `<div class="activity-tags">${item.tags.map((tag) => `<span class="activity-tag">#${escapeHtml(tag)}</span>`).join("")}</div>` : ""}
        <div class="activity-footer">
          ${activityStats(item)}
          <button class="activity-expand" type="button" data-expand-activity="${item.id}" aria-expanded="false">Leer publicación ${icon("chevronDown")}</button>
        </div>
        <div class="activity-body" id="body-${item.id}">
          <p>${linkify(item.content)}</p>
        </div>
      </article>
    `).join("");
  }

  function openProject(index) {
    const project = PROFILE.projects[index];
    if (!project) return;
    const dialog = $("#projectDialog");
    const content = $("#dialogContent");
    content.innerHTML = `
      <div class="dialog-inner">
        <span class="dialog-kind">${escapeHtml(project.kind)}</span>
        <h2 id="dialogTitle">${escapeHtml(project.name)}</h2>
        <div class="dialog-meta"><span>${escapeHtml(project.period)}</span><span>${escapeHtml(project.status)}</span></div>
        <p>${escapeHtml(project.description)}</p>
        <ul class="dialog-highlights">${project.highlights.map((point) => `<li>${escapeHtml(point)}</li>`).join("")}</ul>
        <div class="dialog-tech">${project.technologies.map((tech) => `<span class="tech-chip">${escapeHtml(tech)}</span>`).join("")}</div>
        <div class="dialog-actions">
          ${project.link ? `<a class="button button-primary" href="${escapeHtml(project.link)}" target="_blank" rel="noopener noreferrer">Abrir proyecto ${icon("external")}</a>` : ""}
          <button class="button button-outline" type="button" data-close-dialog>Cerrar</button>
        </div>
      </div>
    `;
    dialog.dataset.returnFocus = index;
    if (typeof dialog.showModal === "function") dialog.showModal();
    else dialog.setAttribute("open", "");
    hydrateIcons(content);
  }

  function closeDialog() {
    const dialog = $("#projectDialog");
    if (typeof dialog.close === "function") dialog.close();
    else dialog.removeAttribute("open");
  }

  function initProjectDialog() {
    $("#projectsGrid").addEventListener("click", (event) => {
      const card = event.target.closest("[data-project-index]");
      if (card) openProject(Number(card.dataset.projectIndex));
    });
    $("#projectsGrid").addEventListener("keydown", (event) => {
      const card = event.target.closest("[data-project-index]");
      if (card && (event.key === "Enter" || event.key === " ")) {
        event.preventDefault();
        openProject(Number(card.dataset.projectIndex));
      }
    });
    $("#dialogClose").addEventListener("click", closeDialog);
    $("#dialogContent").addEventListener("click", (event) => {
      if (event.target.closest("[data-close-dialog]")) closeDialog();
    });
    const dialog = $("#projectDialog");
    dialog.addEventListener("click", (event) => {
      if (event.target === dialog) closeDialog();
    });
    dialog.addEventListener("close", () => {
      const index = Number(dialog.dataset.returnFocus);
      const card = $(`[data-project-index="${index}"]`);
      if (card) card.focus({ preventScroll: true });
    });
  }

  function initStack() {
    $("#stackFilters").addEventListener("click", (event) => {
      const button = event.target.closest("[data-stack-filter]");
      if (!button) return;
      activeStack = button.dataset.stackFilter;
      $$("[data-stack-filter]").forEach((item) => item.setAttribute("aria-selected", String(item === button)));
      renderStack();
    });
    $("#stackSearch").addEventListener("input", (event) => {
      stackQuery = event.target.value;
      renderStack();
    });
  }

  function initActivity() {
    $("#activitySearch").addEventListener("input", (event) => {
      activityQuery = event.target.value;
      renderActivity();
    });
    $("#activityGrid").addEventListener("click", (event) => {
      const button = event.target.closest("[data-expand-activity]");
      if (!button) return;
      const card = button.closest(".activity-card");
      const isOpen = card.classList.toggle("is-open");
      button.setAttribute("aria-expanded", String(isOpen));
      button.innerHTML = isOpen ? `Cerrar ${icon("chevronDown")}` : `Leer publicación ${icon("chevronDown")}`;
    });
  }

  function initFlow() {
    const button = $("#runFlow");
    const diagram = $("#hexDiagram");
    const motion = $("#flowMotion");
    const stepCount = $("#flowStepCount");
    const stepTitle = $("#flowStepTitle");
    const stepText = $("#flowStepText");
    const progress = $("#flowProgress");
    const nodes = $$(".flow-node");
    const steps = [
      {
        target: ".node-rest",
        title: "Entra la petición HTTP",
        text: "El navegador o frontend llama a un endpoint de la API. Todavía no conoce nada de las reglas del negocio."
      },
      {
        target: ".node-ports",
        title: "El adaptador usa un puerto",
        text: "El adaptador REST traduce la petición al contrato de entrada que entiende la aplicación."
      },
      {
        target: ".node-usecase",
        title: "Se ejecuta el caso de uso",
        text: "El caso de uso coordina la acción: valida lo necesario y decide qué pasos del negocio deben ocurrir."
      },
      {
        target: "#flowCore",
        title: "El dominio aplica sus reglas",
        text: "Aquí vive la lógica central: qué está permitido, qué invariantes se cumplen y cómo cambia el estado."
      },
      {
        target: ".node-db",
        title: "Se consultan los datos",
        text: "Un puerto de salida pide información y el adaptador de base de datos la traduce. El dominio no sabe si es PostgreSQL, Redis u otra tecnología."
      },
      {
        target: ".node-client",
        title: "La respuesta vuelve al cliente",
        text: "El resultado viaja de vuelta por el adaptador REST. La infraestructura queda en los bordes; el negocio permanece aislado."
      }
    ];
    let timers = [];
    let running = false;

    const clearTimers = () => {
      timers.forEach((timer) => clearTimeout(timer));
      timers = [];
    };

    const showStep = (index) => {
      const step = steps[index];
      nodes.forEach((node) => node.classList.remove("is-flow-active"));
      const target = $(step.target);
      if (target) target.classList.add("is-flow-active");
      stepCount.textContent = `PASO ${index + 1} / ${steps.length}`;
      stepTitle.textContent = step.title;
      stepText.textContent = step.text;
      progress.style.width = `${((index + 1) / steps.length) * 100}%`;
    };

    const finish = () => {
      running = false;
      diagram.classList.remove("is-running");
      button.disabled = false;
      button.innerHTML = `${icon("play")} Repetir recorrido`;
      stepCount.textContent = `RECORRIDO COMPLETO · ${steps.length} PASOS`;
    };

    const run = () => {
      if (running) return;
      running = true;
      clearTimers();
      nodes.forEach((node) => node.classList.remove("is-flow-active"));
      diagram.classList.add("is-running");
      button.disabled = true;
      button.innerHTML = `${icon("activity")} Recorriendo el flujo…`;
      progress.style.width = "0%";
      showStep(0);
      if (motion && typeof motion.beginElement === "function" && !reduceMotion) motion.beginElement();
      steps.forEach((_, index) => {
        if (index === 0) return;
        timers.push(setTimeout(() => showStep(index), index * 1050));
      });
      timers.push(setTimeout(finish, steps.length * 1050 + 700));
    };

    button.addEventListener("click", run);
  }

  function initReveal() {
    const nodes = $$(".reveal");
    if (!("IntersectionObserver" in window) || reduceMotion) {
      nodes.forEach((node) => node.classList.add("is-visible"));
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px" });
    nodes.forEach((node) => observer.observe(node));
  }

  function initCounters() {
    const values = $$(".stat-value");
    if (!("IntersectionObserver" in window) || reduceMotion) {
      values.forEach((node) => animateCounter(node));
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.5 });
    values.forEach((node) => observer.observe(node));
  }

  function initSectionNav() {
    const sections = $$("main > section[id]");
    const rail = $("#sectionRail");
    const header = $("#siteHeader");
    if (!rail || !sections.length || !header) return;

    const labels = {
      inicio: "Inicio",
      impacto: "Impacto",
      perfil: "Perfil",
      experiencia: "Experiencia",
      stack: "Stack",
      proyectos: "Proyectos",
      formacion: "Formación",
      actividad: "Actividad",
      contacto: "Contacto"
    };
    const railItems = sections.map((section) => `
      <a href="#${section.id}" data-section-link="${section.id}" aria-label="${escapeHtml(labels[section.id] || section.id)}">
        <span class="rail-label">${escapeHtml(labels[section.id] || section.id)}</span><i></i>
      </a>
    `).join("");

    rail.innerHTML = `
      <button class="rail-step" type="button" data-section-step="-1" aria-label="Pantalla anterior" title="Pantalla anterior">${icon("arrowUp")}</button>
      <div class="rail-list">${railItems}</div>
      <button class="rail-step" type="button" data-section-step="1" aria-label="Pantalla siguiente" title="Pantalla siguiente">${icon("arrowDown")}</button>
      <span class="rail-hint" aria-hidden="true" title="Usa ↑ y ↓ para avanzar por pantalla">↑↓</span>
    `;

    const railLinks = $$("[data-section-link]", rail);
    const navLinks = $$(".main-nav a, .mobile-menu a");
    let activeId = "inicio";
    let navigationTarget = null;
    let navigationTimer;
    let ticking = false;

    const setActive = (id) => {
      activeId = id;
      const updateLink = (link) => {
        const match = link.getAttribute("href") === `#${id}`;
        link.classList.toggle("is-active", match);
        if (match) link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
      };
      navLinks.forEach(updateLink);
      railLinks.forEach(updateLink);
    };

    const anchorTop = (section) => {
      if (section.id === "inicio") return 0;
      const content = section.querySelector(".section-heading, .about-lead, .contact-content") || section;
      return Math.max(0, Math.round(content.getBoundingClientRect().top + window.scrollY - header.offsetHeight - 18));
    };

    const buildStops = () => {
      const viewport = window.innerHeight;
      const headerHeight = header.offsetHeight;
      const step = Math.max(420, viewport - headerHeight - 110);
      const maxScroll = Math.max(0, document.documentElement.scrollHeight - viewport);
      const stops = [];

      sections.forEach((section, index) => {
        const start = Math.min(anchorTop(section), maxScroll);
        stops.push({ y: start, id: section.id });

        if (section.offsetHeight > viewport * 1.2) {
          const next = sections[index + 1];
          const nextStart = next ? anchorTop(next) : document.documentElement.scrollHeight;
          let y = start + step;
          while (y < nextStart - 90 && y < maxScroll) {
            stops.push({ y, id: section.id });
            y += step;
          }
        }
      });

      const footer = $(".site-footer");
      if (footer) {
        const footerTop = Math.min(
          Math.max(0, Math.round(footer.getBoundingClientRect().top + window.scrollY - headerHeight - 18)),
          maxScroll
        );
        if (!stops.some((stop) => Math.abs(stop.y - footerTop) < 40)) {
          stops.push({ y: footerTop, id: "contacto" });
        }
      }

      return stops
        .filter((stop, index, all) => index === 0 || Math.abs(stop.y - all[index - 1].y) > 12)
        .sort((a, b) => a.y - b.y);
    };

    const stepThrough = (direction, behavior = "smooth") => {
      const stops = buildStops();
      const position = window.scrollY;
      const stop = direction > 0
        ? stops.find((item) => item.y > position + 34)
        : [...stops].reverse().find((item) => item.y < position - 34);
      if (!stop) return;
      navigationTarget = stop.id;
      clearTimeout(navigationTimer);
      window.scrollTo({ top: stop.y, behavior: reduceMotion ? "auto" : behavior });
      setActive(stop.id);
      if (window.history?.replaceState) window.history.replaceState(null, "", `#${stop.id}`);
      navigationTimer = setTimeout(() => {
        navigationTarget = null;
        setActive(sectionAtScroll());
      }, behavior === "auto" ? 80 : 1000);
    };

    const sectionAtScroll = () => {
      const marker = window.scrollY + header.offsetHeight + 80;
      let current = sections[0].id;
      for (const section of sections) {
        if (section.offsetTop <= marker) current = section.id;
        else break;
      }
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
        current = sections[sections.length - 1].id;
      }
      return current;
    };

    const updateFromScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        if (!navigationTarget) setActive(sectionAtScroll());
        ticking = false;
      });
    };

    scrollToSection = (id, behavior = "smooth") => {
      const section = document.getElementById(id);
      if (!section || !sections.some((item) => item.id === id)) return;
      navigationTarget = id;
      clearTimeout(navigationTimer);
      window.scrollTo({ top: anchorTop(section), behavior: reduceMotion ? "auto" : behavior });
      setActive(id);
      if (window.history?.replaceState) window.history.replaceState(null, "", `#${id}`);
      navigationTimer = setTimeout(() => {
        navigationTarget = null;
        setActive(sectionAtScroll());
      }, behavior === "auto" ? 80 : 1000);
    };

    document.addEventListener("click", (event) => {
      const link = event.target.closest('a[href^="#"]');
      if (!link) return;
      const id = link.getAttribute("href").slice(1);
      if (!sections.some((section) => section.id === id)) return;
      event.preventDefault();
      scrollToSection(id);
    });

    rail.addEventListener("click", (event) => {
      const button = event.target.closest("[data-section-step]");
      if (!button) return;
      stepThrough(Number(button.dataset.sectionStep));
    });

    document.addEventListener("keydown", (event) => {
      if (event.defaultPrevented || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
      if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;
      if ($("dialog[open]")) return;
      const focused = document.activeElement;
      if (focused && (["INPUT", "TEXTAREA", "SELECT"].includes(focused.tagName) || focused.isContentEditable)) return;
      event.preventDefault();
      stepThrough(event.key === "ArrowDown" ? 1 : -1);
    });

    window.addEventListener("scroll", updateFromScroll, { passive: true });
    window.addEventListener("resize", updateFromScroll);
    setActive(sectionAtScroll());

    if (location.hash) {
      const id = location.hash.slice(1);
      if (sections.some((section) => section.id === id)) {
        requestAnimationFrame(() => scrollToSection(id, "auto"));
      }
    }
  }

  function initHeader() {
    const header = $("#siteHeader");
    const progress = $("#scrollProgress");

    const updateScroll = () => {
      const top = window.scrollY;
      header.classList.toggle("is-scrolled", top > 14);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.width = `${max <= 0 ? 0 : Math.min((top / max) * 100, 100)}%`;
    };
    window.addEventListener("scroll", updateScroll, { passive: true });
    updateScroll();

    const menu = $("#mobileMenu");
    const toggle = $("#menuToggle");
    const setMenu = (open) => {
      menu.hidden = !open;
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
      toggle.innerHTML = icon(open ? "close" : "menu");
    };
    toggle.addEventListener("click", () => setMenu(menu.hidden));
    $$("a", menu).forEach((link) => link.addEventListener("click", () => setMenu(false)));
    document.addEventListener("click", (event) => {
      if (!menu.hidden && !menu.contains(event.target) && !toggle.contains(event.target)) setMenu(false);
    });
  }

  function initMotionToggle() {
    const button = $("#motionToggle");
    const key = "li-motion-paused";
    let paused = false;
    try { paused = localStorage.getItem(key) === "true"; } catch (_) { /* sin almacenamiento */ }

    const update = () => {
      document.body.classList.toggle("motion-paused", paused);
      button.setAttribute("aria-pressed", String(paused));
      button.setAttribute("aria-label", paused ? "Reanudar animaciones" : "Pausar animaciones");
      button.title = paused ? "Reanudar animaciones" : "Pausar animaciones";
      button.innerHTML = icon(paused ? "play" : "pause");
    };
    update();
    button.addEventListener("click", () => {
      paused = !paused;
      try { localStorage.setItem(key, String(paused)); } catch (_) { /* sin almacenamiento */ }
      update();
    });
  }

  function initRotating() {
    const node = $("#rotatingText");
    const words = PROFILE.hero.rotating;
    if (!node || words.length < 2 || reduceMotion) return;
    let index = 0;
    setInterval(() => {
      if (document.body.classList.contains("motion-paused")) return;
      index = (index + 1) % words.length;
      node.style.opacity = "0";
      setTimeout(() => {
        node.textContent = words[index];
        node.style.opacity = "1";
      }, 180);
    }, 2900);
    node.style.transition = "opacity .18s ease";
  }

  function showToast(message) {
    const toast = $("#toast");
    toast.textContent = message;
    toast.classList.add("is-visible");
    clearTimeout(showToast.timer);
    showToast.timer = setTimeout(() => toast.classList.remove("is-visible"), 2300);
  }

  async function copyEmail() {
    const email = PROFILE.meta.email;
    try {
      await navigator.clipboard.writeText(email);
      showToast("Correo copiado al portapapeles");
    } catch (_) {
      const textarea = document.createElement("textarea");
      textarea.value = email;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      try {
        document.execCommand("copy");
        showToast("Correo copiado al portapapeles");
      } catch (_) {
        showToast(email);
      }
      textarea.remove();
    }
  }

  function initKeyboard() {
    document.addEventListener("keydown", (event) => {
      const tag = document.activeElement?.tagName;
      if (event.key === "/" && !["INPUT", "TEXTAREA", "SELECT"].includes(tag)) {
        event.preventDefault();
        scrollToSection?.("stack");
        $("#stackSearch").focus({ preventScroll: true });
      }
    });
    $("#copyEmail").addEventListener("click", copyEmail);
  }

  function init() {
    if (!PROFILE) {
      document.body.innerHTML = '<div class="noscript">No se pudieron cargar los datos del perfil.</div>';
      return;
    }
    hydrateIcons();
    initHero();
    initMarquee();
    renderStats();
    renderImpact();
    renderAbout();
    renderExperience();
    renderStackFilters();
    renderStack();
    renderProjects();
    renderEducation();
    renderActivity();
    initProjectDialog();
    initStack();
    initActivity();
    initFlow();
    initHeader();
    initSectionNav();
    initMotionToggle();
    initRotating();
    initKeyboard();
    initReveal();
    initCounters();
    document.body.classList.add("page-ready");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
