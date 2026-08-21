const projects = [
  {
    title: "Meridian",
    year: "2024",
    category: "Data Engineering",
    description: "A real-time data pipeline orchestration platform enabling teams to manage complex data flows at scale with full observability and lineage tracking.",
    tags: ["Data Engineering", "Python", "Apache Kafka", "dbt", "Snowflake"]
  },
  {
    title: "Forma",
    year: "2023",
    category: "UI/UX",
    description: "A comprehensive design system and component library built for enterprise-scale products with a focus on accessibility and visual consistency.",
    tags: ["UI/UX", "React", "TypeScript", "Figma", "Storybook"]
  },
  {
    title: "Atlas",
    year: "2023",
    category: "Web Development",
    description: "A location intelligence web application providing spatial analytics and interactive mapping for logistics and supply chain teams.",
    tags: ["Web Development", "Next.js", "PostgreSQL", "Mapbox", "TypeScript"]
  },
  {
    title: "Relay",
    year: "2022",
    category: "Mobile Development",
    description: "A cross-platform messaging SDK for mobile applications designed for reliability and consistency in low-connectivity environments.",
    tags: ["Mobile Development", "Swift", "Kotlin", "React Native"]
  },
  {
    title: "Prism",
    year: "2022",
    category: "UI/UX",
    description: "An analytics dashboard for product teams, surfacing actionable metrics from disparate data sources in a unified interface.",
    tags: ["UI/UX", "React", "D3.js", "GraphQL"]
  },
  {
    title: "Cadence",
    year: "2021",
    category: "Web Development",
    description: "A workflow automation platform enabling engineering teams to build, schedule, and monitor complex processes.",
    tags: ["Web Development", "Go", "React", "PostgreSQL", "Docker"]
  }
];

function escapeHTML(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function categoryClass(category) {
  return {
    "Data Engineering": "data",
    "UI/UX": "ui",
    "Web Development": "web",
    "Mobile Development": "mobile"
  }[category] || "";
}

function projectHTML(project) {
  return `
    <article class="horizontal-project" data-category="${escapeHTML(project.category)}">
      <div class="horizontal-image">${escapeHTML(project.title)}</div>
      <div class="horizontal-body">
        <div class="project-meta">
          <span>${escapeHTML(project.year)}</span>
          <span class="category ${categoryClass(project.category)}">${escapeHTML(project.category)}</span>
        </div>
        <h2>${escapeHTML(project.title)}</h2>
        <p>${escapeHTML(project.description)}</p>
        <div class="tags">
          ${project.tags.map(tag => `<span>${escapeHTML(tag)}</span>`).join("")}
        </div>
      </div>
    </article>
  `;
}

function renderProjects(filter = "all") {
  const list = document.querySelector("#project-list");
  if (!list) return;

  const filtered = filter === "all"
    ? projects
    : projects.filter(project => project.category === filter);

  list.innerHTML = filtered.length
    ? filtered.map(projectHTML).join("")
    : `<p class="no-projects">No projects found.</p>`;
}

function initFilters() {
  const filters = document.querySelectorAll(".filter");
  if (!filters.length) return;

  filters.forEach(button => {
    button.addEventListener("click", () => {
      filters.forEach(btn => btn.classList.remove("active"));
      button.classList.add("active");
      renderProjects(button.dataset.filter);
    });
  });
}

function renderLatestProject() {
  const container = document.querySelector("#latest-project");
  if (!container || !projects.length) return;

  const project = projects[0];

  container.innerHTML = `
    <article class="featured-project">
      <div class="horizontal-image">${escapeHTML(project.title)}</div>
      <div class="horizontal-body">
        <div class="project-meta">
          <span>${escapeHTML(project.year)}</span>
          <span class="category ${categoryClass(project.category)}">${escapeHTML(project.category)}</span>
        </div>
        <h2>${escapeHTML(project.title)}</h2>
        <p>${escapeHTML(project.description)}</p>
        <div class="tags">
          ${project.tags.map(tag => `<span>${escapeHTML(tag)}</span>`).join("")}
        </div>
        <a href="projects.html">View all projects →</a>
      </div>
    </article>
  `;
}

document.addEventListener("DOMContentLoaded", () => {
  renderProjects();
  initFilters();
  renderLatestProject();
});
