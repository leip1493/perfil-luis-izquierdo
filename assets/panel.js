(() => {
  "use strict";

  const PROFILE = window.PROFILE_DATA || {};
  const ACTIVITY = Array.isArray(window.ACTIVITY_DATA) ? window.ACTIVITY_DATA : [];
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  const VALID_TABS = ["resumen", "trayectoria", "stack", "proyectos", "actividad", "contacto"];

  const ICONS = {
    code: '<path d="M8 9l-4 3 4 3M16 9l4 3-4 3M14 5l-4 14"/>',
    layers: '<path d="M12 3l9 5-9 5-9-5 9-5z"/><path d="M3 12l9 5 9-5M3 16l9 5 9-5"/>',
    database: '<ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v7c0 1.7 3.6 3 8 3s8-1.3 8-3V5M4 12v7c0 1.7 3.6 3 8 3s8-1.3 8-3v-7"/>',
    cloud: '<path d="M7 18h10a4 4 0 0 0 .6-8A6 6 0 0 0 6.1 11 3.5 3.5 0 0 0 7 18z"/>',
    shield: '<path d="M12 3l8 3v5c0 5-3.3 8.5-8 10-4.7-1.5-8-5-8-10V6l8-3z"/><path d="M9 12l2 2 4-4"/>',
    spark: '<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3zM19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8L19 16z"/>',
    mobile: '<rect x="7" y="2" width="10" height="20" rx="2"/><path d="M11 18h2"/>',
    arrowUpRight: '<path d="M7 17L17 7M7 7h10v10"/>',
    chevronDown: '<path d="M6 9l6 6 6-6"/>',
    mail: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="M3 6l9 7 9-7"/>',
    copy: '<rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>',
    check: '<path d="M20 6L9 17l-5-5"/>',
    github: '<path fill="currentColor" stroke="none" d="M12 .8a11.2 11.2 0 0 0-3.5 21.8c.6.1.8-.2.8-.5v-2.1c-3.3.7-4-1.4-4-1.4-.5-1.4-1.3-1.8-1.3-1.8-1.1-.8.1-.8.1-.8 1.2.1 1.8 1.2 1.8 1.2 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.6-.3-5.4-1.3-5.4-5.8 0-1.3.5-2.3 1.2-3.2-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.2 1.2a11 11 0 0 1 5.8 0c2.2-1.5 3.2-1.2 3.2-1.2.6 1.6.2 2.8.1 3.1.8.9 1.2 1.9 1.2 3.2 0 4.5-2.8 5.5-5.4 5.8.4.4.8 1.1.8 2.2v3.2c0 .3.2.6.8.5A11.2 11.2 0 0 0 12 .8z"/>',
    linkedin: '<path fill="currentColor" stroke="none" d="M20.4 20.4h-3.6v-5.6c0-1.3 0-3-1.9-3s-2.1 1.4-2.1 2.9v5.7H9.3V9h3.4v1.6h.1c.5-.9 1.7-1.9 3.5-1.9 3.7 0 4.4 2.4 4.4 5.6v6.1zM5.3 7.4a2.1 2.1 0 1 1 0-4.2 2.1 2.1 0 0 1 0 4.2zM7.1 20.4H3.5V9h3.6v11.4zM22.2 0H1.8C.8 0 0 .8 0 1.7v20.6c0 .9.8 1.7 1.8 1.7h20.4c1 0 1.8-.8 1.8-1.7V1.7c0-.9-.8-1.7-1.8-1.7z"/>'
  };

  function icon(name) {
    const path = ICONS[name] || ICONS.code;
    return `<svg viewBox="0 0 24 24" aria-hidden="true">${path}</svg>`;
  }

  function escapeHtml(value = "") {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function firstSentence(text = "") {
    const clean = String(text).trim();
    const match = clean.match(/^[^.!?]+[.!?]/);
    return match ? match[0].trim() : clean;
  }

  function renderHeader() {
    const meta = PROFILE.meta || {};
    const nameEl = $("#headerName");
    const roleEl = $("#headerRole");
    const avatarEl = $("#headerAvatar");
    const ctaEl = $("#headerCta");
    const footerYear = $("#footerYear");

    if (nameEl && meta.shortName) nameEl.textContent = meta.shortName;
    if (roleEl && meta.role) roleEl.textContent = meta.role;
    if (avatarEl && meta.photo) avatarEl.src = meta.photo;
    if (ctaEl && meta.email) ctaEl.href = `mailto:${meta.email}`;
    if (footerYear) footerYear.textContent = String(new Date().getFullYear());
  }

  function renderSummary() {
    const hero = PROFILE.hero || {};
    const meta = PROFILE.meta || {};
    const stats = Array.isArray(PROFILE.stats) ? PROFILE.stats : [];
    const impact = Array.isArray(PROFILE.impact) ? PROFILE.impact : [];
    const experience = Array.isArray(PROFILE.experience) ? PROFILE.experience : [];

    // 1. Titular corto + frase de apoyo
    const titleEl = $("#summaryTitle");
    if (titleEl && hero.title && hero.accent) {
      titleEl.innerHTML = `${escapeHtml(hero.title)}<br><span class="editorial-accent">${escapeHtml(hero.accent)}</span> que escalan.`;
    }
    const supportEl = $("#summarySupport");
    if (supportEl && hero.summary) {
      supportEl.textContent = firstSentence(hero.summary);
    }

    // 2. Tira de 4 métricas
    const statsEl = $("#summaryStats");
    if (statsEl) {
      statsEl.innerHTML = stats.slice(0, 4).map((stat) => `
        <article class="stat-tile">
          <div class="stat-number">${escapeHtml(stat.value)}<span>${escapeHtml(stat.suffix || "")}</span></div>
          <div class="stat-label">${escapeHtml(stat.label)}</div>
          <div class="stat-sub">${escapeHtml(stat.detail || "")}</div>
        </article>
      `).join("");
    }

    // 3. "En 30 segundos": 3 viñetas con lo esencial
    const essentialsEl = $("#essentialsList");
    if (essentialsEl) {
      const bullets = [
        {
          icon: "code",
          title: "Backend crítico y sistemas multi-tenant",
          text: "Node.js, NestJS y TypeScript para plataformas en Fintech, banca digital, retail y SaaS."
        },
        {
          icon: "layers",
          title: "Arquitectura hexagonal, DDD y TDD",
          text: "Dominio desacoplado de la infraestructura con +90% de cobertura validando casos de uso."
        },
        {
          icon: "spark",
          title: "Liderazgo técnico e IA agéntica",
          text: "Referente backend, plantillas con AGENTS.md, Spec-Driven Development y triaje en guardia."
        }
      ];
      essentialsEl.innerHTML = bullets.map((item) => `
        <li class="essential-item">
          <span class="essential-icon">${icon(item.icon)}</span>
          <div class="essential-body">
            <strong>${escapeHtml(item.title)}</strong>
            <span>${escapeHtml(item.text)}</span>
          </div>
        </li>
      `).join("");
    }

    // 4. Caso destacado BOMA
    const bomaContextEl = $("#bomaContext");
    if (bomaContextEl) {
      const bomaImpact = impact[0];
      bomaContextEl.textContent = bomaImpact
        ? firstSentence(bomaImpact.detail) + " 80 módulos conectados para +60 squads."
        : "Cada squad pasó a integrar sus propios módulos sin depender del equipo central, logrando 80 integraciones en producción.";
    }

    // 5. Trayectoria reciente (2 más recientes)
    const recentEl = $("#recentExperienceList");
    if (recentEl) {
      recentEl.innerHTML = experience.slice(0, 2).map((job) => `
        <div class="recent-item">
          <div class="recent-item-top">
            <div>
              <span class="recent-role">${escapeHtml(job.role)}</span>
              <span class="recent-company">· ${escapeHtml(job.company)}</span>
            </div>
            <span class="recent-period">${escapeHtml(job.period)}</span>
          </div>
          <p class="recent-line">${escapeHtml(firstSentence(job.summary))}</p>
        </div>
      `).join("");
    }

    // 6. CTA final
    const emailBtn = $("#summaryEmailBtn");
    const emailText = $("#summaryEmailText");
    const linkedinBtn = $("#summaryLinkedinBtn");
    if (emailBtn && meta.email) emailBtn.href = `mailto:${meta.email}`;
    if (emailText && meta.email) emailText.textContent = meta.email;
    if (linkedinBtn && meta.linkedin) linkedinBtn.href = meta.linkedin;
  }

  function renderExperience() {
    const container = $("#experienceList");
    const experience = Array.isArray(PROFILE.experience) ? PROFILE.experience : [];
    if (!container) return;

    container.innerHTML = experience.map((job, index) => `
      <details class="exp-card"${index === 0 ? " open" : ""}>
        <summary class="exp-summary">
          <div class="exp-main">
            <div class="exp-title-row">
              <span class="exp-role">${escapeHtml(job.role)}</span>
              <span class="exp-company">· ${escapeHtml(job.company)}</span>
              ${job.current ? '<span class="exp-badge">Reciente</span>' : ""}
            </div>
            <div class="exp-meta">
              <span>${escapeHtml(job.period)} (${escapeHtml(job.duration)})</span>
              <span>·</span>
              <span>${escapeHtml(job.location)}</span>
            </div>
            <p class="exp-teaser">${escapeHtml(firstSentence(job.summary))}</p>
          </div>
          <span class="exp-chevron" aria-hidden="true">${icon("chevronDown")}</span>
        </summary>
        <div class="exp-details-body">
          <p class="exp-full-summary">${escapeHtml(job.summary)}</p>
          ${Array.isArray(job.highlights) && job.highlights.length ? `
            <ul class="exp-highlights">
              ${job.highlights.map((h) => `<li>${escapeHtml(h)}</li>`).join("")}
            </ul>
          ` : ""}
          ${Array.isArray(job.technologies) && job.technologies.length ? `
            <div class="chip-list">
              ${job.technologies.map((tech) => `<span class="chip">${escapeHtml(tech)}</span>`).join("")}
            </div>
          ` : ""}
        </div>
      </details>
    `).join("");
  }

  function renderStack() {
    const container = $("#stackGroups");
    const stack = Array.isArray(PROFILE.stack) ? PROFILE.stack : [];
    if (!container) return;

    container.innerHTML = stack.map((group) => {
      const techs = Array.isArray(group.technologies) ? group.technologies : [];
      return `
        <article class="stack-category">
          <div class="stack-category-header">
            <div>
              <h3 class="stack-category-title">
                <span class="stack-category-icon">${icon(group.icon)}</span>
                <span>${escapeHtml(group.label)}</span>
              </h3>
              <p class="stack-category-desc">${escapeHtml(group.description)}</p>
            </div>
            <span class="stack-count">${techs.length}</span>
          </div>
          <div class="stack-items">
            ${techs.map((tech) => {
              const isCore = String(tech.level).toLowerCase() === "core";
              return `
                <div class="tech-item">
                  <div class="tech-item-top">
                    <span class="tech-name">${escapeHtml(tech.name)}</span>
                    <span class="tech-level${isCore ? " is-core" : ""}">${escapeHtml(tech.level)}</span>
                  </div>
                  <p class="tech-detail">${escapeHtml(tech.detail)}</p>
                </div>
              `;
            }).join("")}
          </div>
        </article>
      `;
    }).join("");
  }

  function renderProjects() {
    const container = $("#projectsGrid");
    const projects = Array.isArray(PROFILE.projects) ? PROFILE.projects : [];
    if (!container) return;

    container.innerHTML = projects.map((project) => `
      <article class="project-card">
        <div>
          <div class="project-top">
            <span class="project-kind">${escapeHtml(project.kind)}</span>
            <span class="project-period">${escapeHtml(project.period)}</span>
          </div>
          <h3 class="project-name">${escapeHtml(project.name)}</h3>
          <p class="project-desc">${escapeHtml(project.description)}</p>
          ${Array.isArray(project.technologies) && project.technologies.length ? `
            <div class="chip-list">
              ${project.technologies.map((tech) => `<span class="chip">${escapeHtml(tech)}</span>`).join("")}
            </div>
          ` : ""}
        </div>
        <div class="project-footer">
          <span class="project-status">${escapeHtml(project.status || "")}</span>
          ${project.link ? `
            <a class="button button-outline" href="${escapeHtml(project.link)}" target="_blank" rel="noopener noreferrer">
              <span>Ver repositorio</span>
              ${icon("arrowUpRight")}
            </a>
          ` : ""}
        </div>
      </article>
    `).join("");
  }

  function renderActivity() {
    const container = $("#activityGrid");
    if (!container) return;

    container.innerHTML = ACTIVITY.slice(0, 8).map((post) => {
      const tags = Array.isArray(post.tags) ? post.tags : [];
      const metrics = [];
      if (post.reactions != null) metrics.push(`${post.reactions} reacciones`);
      if (post.impressions != null) metrics.push(`${post.impressions.toLocaleString("es")} impresiones`);

      return `
        <article class="activity-card">
          <div>
            <div class="activity-meta">
              <span>Hace ${escapeHtml(post.dateLabel)}</span>
              <span>LinkedIn</span>
            </div>
            <h3 class="activity-title">${escapeHtml(post.title)}</h3>
            <p class="activity-summary">${escapeHtml(post.summary)}</p>
          </div>
          <div>
            ${tags.length ? `
              <div class="activity-tags" style="margin-bottom: 12px;">
                ${tags.slice(0, 5).map((tag) => `<span class="activity-tag">#${escapeHtml(tag)}</span>`).join("")}
              </div>
            ` : ""}
            <div class="activity-footer">
              <span class="activity-metrics">${escapeHtml(metrics.join(" · "))}</span>
              <a class="text-link" href="${escapeHtml(post.link)}" target="_blank" rel="noopener noreferrer">
                <span>Ver en LinkedIn</span>
                ${icon("arrowUpRight")}
              </a>
            </div>
          </div>
        </article>
      `;
    }).join("");
  }

  function renderContact() {
    const container = $("#contactGrid");
    const meta = PROFILE.meta || {};
    const languages = Array.isArray(PROFILE.languages) ? PROFILE.languages : [];
    if (!container) return;

    const langText = languages.map((l) => `${l.name} (${l.level})`).join(" · ");

    container.innerHTML = `
      <div class="card contact-channels">
        <div class="card-header">
          <p class="mono-label">CANALES DIRECTOS</p>
          <h3 class="card-title">Hablemos</h3>
        </div>

        <div class="channel-row">
          <div class="channel-info">
            <span class="channel-icon">${icon("mail")}</span>
            <div class="channel-text">
              <small>Correo electrónico</small>
              <strong>${escapeHtml(meta.email)}</strong>
            </div>
          </div>
          <div class="channel-actions">
            <a class="button button-primary" href="mailto:${escapeHtml(meta.email)}">
              <span>Escribir</span>
              ${icon("arrowUpRight")}
            </a>
            <button class="button button-outline" type="button" id="copyEmailBtn" data-email="${escapeHtml(meta.email)}">
              ${icon("copy")}
              <span>Copiar</span>
            </button>
          </div>
        </div>

        <div class="channel-row">
          <div class="channel-info">
            <span class="channel-icon">${icon("linkedin")}</span>
            <div class="channel-text">
              <small>Red profesional</small>
              <strong>LinkedIn · ${escapeHtml(meta.shortName || meta.name)}</strong>
            </div>
          </div>
          <a class="button button-outline" href="${escapeHtml(meta.linkedin)}" target="_blank" rel="noopener noreferrer">
            <span>Abrir perfil</span>
            ${icon("arrowUpRight")}
          </a>
        </div>

        <div class="channel-row">
          <div class="channel-info">
            <span class="channel-icon">${icon("github")}</span>
            <div class="channel-text">
              <small>Código y plantillas</small>
              <strong>github.com/leip1493</strong>
            </div>
          </div>
          <a class="button button-outline" href="${escapeHtml(meta.github)}" target="_blank" rel="noopener noreferrer">
            <span>Ver GitHub</span>
            ${icon("arrowUpRight")}
          </a>
        </div>
      </div>

      <aside class="card" aria-label="Bloque de disponibilidad">
        <div class="card-header">
          <p class="mono-label">DISPONIBILIDAD Y PERFIL</p>
          <h3 class="card-title">Ficha rápida</h3>
        </div>
        <dl class="dossier-dl">
          <div class="dossier-item">
            <dt>Rol</dt>
            <dd>${escapeHtml(meta.role)} · ${escapeHtml(meta.availability)}</dd>
          </div>
          <div class="dossier-item">
            <dt>Modalidad</dt>
            <dd>${escapeHtml(meta.workMode)} (desde ${escapeHtml(meta.location)})</dd>
          </div>
          <div class="dossier-item">
            <dt>Especialidad</dt>
            <dd>${escapeHtml(meta.headline)}</dd>
          </div>
          <div class="dossier-item">
            <dt>Idiomas</dt>
            <dd>${escapeHtml(langText)}</dd>
          </div>
        </dl>
      </aside>
    `;

    const copyBtn = $("#copyEmailBtn", container);
    if (copyBtn) {
      copyBtn.addEventListener("click", () => {
        const email = copyBtn.dataset.email || "";
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(email).then(() => showCopied(copyBtn)).catch(() => fallbackCopy(email, copyBtn));
        } else {
          fallbackCopy(email, copyBtn);
        }
      });
    }
  }

  function fallbackCopy(text, button) {
    const input = document.createElement("textarea");
    input.value = text;
    input.setAttribute("readonly", "");
    input.style.position = "fixed";
    input.style.opacity = "0";
    document.body.appendChild(input);
    input.select();
    try {
      document.execCommand("copy");
      showCopied(button);
    } finally {
      document.body.removeChild(input);
    }
  }

  function showCopied(button) {
    const original = button.innerHTML;
    button.innerHTML = `${icon("check")}<span>Copiado</span>`;
    setTimeout(() => {
      button.innerHTML = original;
    }, 1800);
  }

  function initTabs() {
    const tabs = $$('[role="tab"]');
    const panels = $$('[role="tabpanel"]');

    function activateTab(tabId, options = {}) {
      const { updateHash = true, focusTab = false, focusPanel = false } = options;
      const targetId = VALID_TABS.includes(tabId) ? tabId : "resumen";

      tabs.forEach((tab) => {
        const isSelected = tab.dataset.tab === targetId;
        tab.setAttribute("aria-selected", String(isSelected));
        tab.setAttribute("tabindex", isSelected ? "0" : "-1");
        if (isSelected) {
          tab.scrollIntoView({ block: "nearest", inline: "nearest" });
          if (focusTab) tab.focus({ preventScroll: true });
        }
      });

      let activePanel = null;
      panels.forEach((panel) => {
        const isMatch = panel.id === `panel-${targetId}`;
        panel.hidden = !isMatch;
        panel.classList.toggle("is-active", isMatch);
        if (isMatch) activePanel = panel;
      });

      if (updateHash) {
        const nextHash = `#${targetId}`;
        if (window.location.hash !== nextHash) {
          if (window.history && window.history.replaceState) {
            window.history.replaceState(null, "", nextHash);
          } else {
            window.location.hash = nextHash;
          }
        }
      }

      window.scrollTo({
        top: 0,
        behavior: reducedMotion.matches ? "auto" : "smooth"
      });

      if (focusPanel && activePanel) {
        activePanel.focus({ preventScroll: true });
      }
    }

    tabs.forEach((tab, index) => {
      tab.addEventListener("click", () => {
        activateTab(tab.dataset.tab, { updateHash: true, focusTab: false, focusPanel: false });
      });

      tab.addEventListener("keydown", (event) => {
        let nextIndex = null;
        if (event.key === "ArrowRight") {
          nextIndex = (index + 1) % tabs.length;
        } else if (event.key === "ArrowLeft") {
          nextIndex = (index - 1 + tabs.length) % tabs.length;
        } else if (event.key === "Home") {
          nextIndex = 0;
        } else if (event.key === "End") {
          nextIndex = tabs.length - 1;
        }

        if (nextIndex !== null) {
          event.preventDefault();
          const nextTab = tabs[nextIndex];
          activateTab(nextTab.dataset.tab, { updateHash: true, focusTab: true, focusPanel: false });
        }
      });
    });

    document.addEventListener("click", (event) => {
      const trigger = event.target.closest("[data-tab-target]");
      if (trigger) {
        event.preventDefault();
        activateTab(trigger.dataset.tabTarget, { updateHash: true, focusTab: false, focusPanel: true });
        return;
      }
      const brandLink = event.target.closest("[data-tab-link]");
      if (brandLink) {
        event.preventDefault();
        activateTab(brandLink.dataset.tabLink, { updateHash: true, focusTab: false, focusPanel: true });
      }
    });

    window.addEventListener("hashchange", () => {
      const rawHash = window.location.hash.replace(/^#/, "").toLowerCase();
      if (VALID_TABS.includes(rawHash)) {
        activateTab(rawHash, { updateHash: false, focusTab: false, focusPanel: false });
      }
    });

    const initialHash = window.location.hash.replace(/^#/, "").toLowerCase();
    const startTab = VALID_TABS.includes(initialHash) ? initialHash : "resumen";
    activateTab(startTab, { updateHash: Boolean(initialHash), focusTab: false, focusPanel: false });
  }

  function init() {
    renderHeader();
    renderSummary();
    renderExperience();
    renderStack();
    renderProjects();
    renderActivity();
    renderContact();
    initTabs();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
