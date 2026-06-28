(function () {
  const data = window.AI_LEARNING_HUB;
  const storageKey = "ai-skill-learning-hub-v2";
  const customContentKey = "ai-skill-learning-hub-custom-content-v1";
  const state = {
    view: "overview",
    phase: "week-1",
    query: "",
    module: "all",
    level: "all",
    status: "all",
    progress: loadProgress(),
    customItems: loadCustomItems()
  };

  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => Array.from(document.querySelectorAll(selector));

  function loadProgress() {
    try {
      return JSON.parse(localStorage.getItem(storageKey)) || {};
    } catch {
      return {};
    }
  }

  function loadCustomItems() {
    try {
      return JSON.parse(localStorage.getItem(customContentKey)) || [];
    } catch {
      return [];
    }
  }

  function saveCustomItems() {
    localStorage.setItem(customContentKey, JSON.stringify(state.customItems));
  }

  function saveProgress() {
    localStorage.setItem(storageKey, JSON.stringify(state.progress));
  }

  function isDone(id) {
    return state.progress[id] === true;
  }

  function setDone(id, done) {
    state.progress[id] = done;
    saveProgress();
    renderAll();
  }

  function moduleName(id) {
    return data.modules.find((module) => module.id === id)?.title || id;
  }

  function progressIds() {
    return [
      ...data.phases.flatMap((phase) => phase.tasks.map((_, index) => `phase:${phase.id}:${index}`)),
      ...data.skills.map((skill) => `skill:${skill.id}`),
      ...data.projects.map((project) => `project:${project.id}`)
    ];
  }

  function progressRatio() {
    const ids = progressIds();
    const done = ids.filter(isDone).length;
    return { done, total: ids.length, ratio: ids.length ? Math.round((done / ids.length) * 100) : 0 };
  }

  function addCustomItem(item) {
    state.customItems.unshift({
      id: `custom-${Date.now()}`,
      createdAt: new Date().toISOString(),
      ...item
    });
    saveCustomItems();
    renderAll();
  }

  function deleteCustomItem(id) {
    state.customItems = state.customItems.filter((item) => item.id !== id);
    saveCustomItems();
    renderAll();
  }

  function matchesQuery(text) {
    const query = state.query.trim().toLowerCase();
    return !query || text.toLowerCase().includes(query);
  }

  function chipClass(module) {
    return { industry: "green", agent: "coral", rag: "amber", skills: "blue", pm: "green" }[module] || "";
  }

  function renderNav() {
    $("#navList").innerHTML = data.nav.map((item) => `
      <button class="nav-item ${state.view === item.id ? "active" : ""}" type="button" data-view-target="${item.id}">
        <span>${item.label}</span><span>${item.shortcut}</span>
      </button>
    `).join("");
  }

  function renderViews() {
    $$(".view").forEach((view) => view.classList.toggle("active", view.dataset.view === state.view));
  }

  function renderMetrics() {
    const progress = progressRatio();
    const doneSkills = data.skills.filter((skill) => isDone(`skill:${skill.id}`)).length;
    const doneProjects = data.projects.filter((project) => isDone(`project:${project.id}`)).length;
    const metrics = [
      { label: "總進度", value: `${progress.ratio}%`, note: `${progress.done} / ${progress.total} 個學習項目完成` },
      { label: "知識主軸", value: data.modules.length, note: "從底層到 AI PM" },
      { label: "技能完成", value: `${doneSkills}/${data.skills.length}`, note: "用勾選追蹤" },
      { label: "我的內容", value: state.customItems.length, note: "存在這台瀏覽器，可匯出備份" }
    ];
    $("#metricsGrid").innerHTML = metrics.map((metric) => `
      <article class="metric">
        <span>${metric.label}</span>
        <div><strong>${metric.value}</strong><p>${metric.note}</p></div>
      </article>
    `).join("");
    $("#progressText").textContent = `${progress.ratio}% complete`;
    $("#progressBar").style.width = `${progress.ratio}%`;
  }

  function renderPhaseSwitch() {
    $("#phaseSwitch").innerHTML = data.phases.map((phase) => `
      <button class="${state.phase === phase.id ? "active" : ""}" type="button" data-phase="${phase.id}">
        ${phase.label}
      </button>
    `).join("");
  }

  function phaseCard(phase) {
    return `
      <article class="phase-card">
        <div class="phase-top">
          <div>
            <span class="chip ${chipClass(phase.module)}">${moduleName(phase.module)}</span>
            <h3>${phase.title}</h3>
          </div>
          <span class="week-pill">${phase.label}</span>
        </div>
        <p>${phase.goal}</p>
        <div class="output-row">${phase.outputs.map((output) => `<span class="chip green">${output}</span>`).join("")}</div>
        <div class="task-list">
          ${phase.tasks.map((task, index) => {
            const id = `phase:${phase.id}:${index}`;
            return `<label class="task-row"><input type="checkbox" data-progress-id="${id}" ${isDone(id) ? "checked" : ""} /><span>${task}</span></label>`;
          }).join("")}
        </div>
      </article>
    `;
  }

  function renderActivePhase() {
    const phase = data.phases.find((item) => item.id === state.phase) || data.phases[0];
    $("#activePhase").innerHTML = phaseCard(phase);
    $("#outcomeList").innerHTML = phase.outputs.map((output) => `<article class="card"><h3>${output}</h3><p>把它做出來，才算這個階段真的學會。</p></article>`).join("");
    $("#sidebarFocus").textContent = phase.title;
  }

  function renderModuleStrip() {
    $("#moduleStrip").innerHTML = data.modules.map((module) => `
      <article class="module-mini" data-view-target="map">
        <span class="chip ${chipClass(module.id)}">${module.id}</span>
        <h3>${module.title}</h3>
        <p>${module.why}</p>
      </article>
    `).join("");
  }

  function renderModuleGrid() {
    $("#moduleGrid").innerHTML = data.modules.map((module) => `
      <article class="module-card">
        <span class="chip ${chipClass(module.id)}">${module.id}</span>
        <h3>${module.title}</h3>
        <p>${module.summary}</p>
        <ul>${module.keyIdeas.map((idea) => `<li>${idea}</li>`).join("")}</ul>
        <p><strong>為什麼要學：</strong>${module.why}</p>
      </article>
    `).join("");
  }

  function renderRoadmap() {
    $("#roadmapBoard").innerHTML = data.phases.map(phaseCard).join("");
  }

  function renderFilters() {
    $("#moduleFilter").innerHTML = ["all", ...data.modules.map((module) => module.id)].map((id) => `
      <option value="${id}">${id === "all" ? "全部主軸" : moduleName(id)}</option>
    `).join("");
    const levels = ["all", ...new Set(data.skills.map((skill) => skill.level))];
    $("#levelFilter").innerHTML = levels.map((level) => `<option value="${level}">${level === "all" ? "全部難度" : level}</option>`).join("");
    $("#moduleFilter").value = state.module;
    $("#levelFilter").value = state.level;
    $("#statusFilter").value = state.status;
  }

  function skillMatches(skill) {
    const text = `${skill.name} ${skill.module} ${skill.level} ${skill.output} ${skill.practice}`;
    if (!matchesQuery(text)) return false;
    if (state.module !== "all" && skill.module !== state.module) return false;
    if (state.level !== "all" && skill.level !== state.level) return false;
    if (state.status !== "all") {
      const status = isDone(`skill:${skill.id}`) ? "done" : skill.status;
      if (status !== state.status) return false;
    }
    return true;
  }

  function renderSkills() {
    const skills = data.skills.filter(skillMatches);
    $("#skillDatabase").innerHTML = skills.map((skill) => {
      const id = `skill:${skill.id}`;
      const done = isDone(id);
      const status = done ? "已完成" : skill.status === "doing" ? "進行中" : "未開始";
      return `
        <article class="skill-record">
          <input type="checkbox" data-progress-id="${id}" ${done ? "checked" : ""} />
          <div>
            <strong>${skill.name}</strong>
            <span>${skill.practice}</span>
          </div>
          <span class="chip ${chipClass(skill.module)}">${moduleName(skill.module)}</span>
          <span class="chip">${skill.level}</span>
          <div class="record-output">
            <strong>${status}</strong>
            <span>${skill.output}</span>
          </div>
        </article>
      `;
    }).join("") || `<div class="empty">沒有符合目前篩選的技能。</div>`;
  }

  function renderProjects() {
    $("#projectList").innerHTML = data.projects.map((project) => {
      const id = `project:${project.id}`;
      return `
        <article class="project-card">
          <label class="project-check"><input type="checkbox" data-progress-id="${id}" ${isDone(id) ? "checked" : ""} /></label>
          <div>
            <span class="chip ${chipClass(project.module)}">${moduleName(project.module)}</span>
            <h3>${project.title}</h3>
            <p>${project.goal}</p>
          </div>
          <span class="chip amber">${project.difficulty}</span>
        </article>
      `;
    }).join("");
    $("#doneList").innerHTML = data.doneCriteria.map((item) => `<article class="card"><h3>${item.title}</h3><p>${item.note}</p></article>`).join("");
  }

  function renderWorkflow() {
    $("#workflowList").innerHTML = data.workflow.map((item, index) => `
      <article class="workflow-item ${index === 0 ? "open" : ""}">
        <button class="workflow-button" type="button" data-toggle-workflow>
          <strong>${item.title}</strong><span class="chip">展開</span>
        </button>
        <div class="workflow-detail"><p>${item.detail}</p></div>
      </article>
    `).join("");
    $("#inboxList").innerHTML = data.inbox.map((item, index) => `<article class="card"><h3>${String(index + 1).padStart(2, "0")}</h3><p>${item}</p></article>`).join("");
  }

  function renderMaintenance() {
    $("#maintenanceGrid").innerHTML = data.maintenance.map((item) => `<article class="card"><h3>${item.title}</h3><p>${item.note}</p></article>`).join("");
  }

  function renderEditor() {
    const list = $("#customContentList");
    if (!list) return;
    list.innerHTML = state.customItems.map((item) => `
      <article class="custom-item">
        <div>
          <span class="chip ${chipClass(item.module)}">${moduleName(item.module)}</span>
          <span class="chip">${typeLabel(item.type)}</span>
          <h3>${escapeHtml(item.title)}</h3>
          <p>${escapeHtml(item.body)}</p>
          <small>${new Date(item.createdAt).toLocaleString("zh-TW")}</small>
        </div>
        <button class="text-button danger-button" type="button" data-delete-custom="${item.id}">刪除</button>
      </article>
    `).join("") || `<div class="empty">還沒有自己的內容。先新增一則筆記，例如「CUDA 生態是什麼」。</div>`;
  }

  function typeLabel(type) {
    return { note: "筆記", skill: "技能", resource: "資源", project: "作品" }[type] || type;
  }

  function escapeHtml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function bindEvents() {
    document.body.addEventListener("click", (event) => {
      const viewTarget = event.target.closest("[data-view-target]");
      if (viewTarget) {
        state.view = viewTarget.dataset.viewTarget;
        renderAll();
      }
      const phaseTarget = event.target.closest("[data-phase]");
      if (phaseTarget) {
        state.phase = phaseTarget.dataset.phase;
        renderAll();
      }
      const workflowButton = event.target.closest("[data-toggle-workflow]");
      if (workflowButton) workflowButton.closest(".workflow-item").classList.toggle("open");

      const deleteButton = event.target.closest("[data-delete-custom]");
      if (deleteButton) deleteCustomItem(deleteButton.dataset.deleteCustom);
    });

    document.body.addEventListener("change", (event) => {
      const progressId = event.target.dataset.progressId;
      if (progressId) setDone(progressId, event.target.checked);
    });

    $("#searchInput").addEventListener("input", (event) => {
      state.query = event.target.value;
      state.view = "skills";
      renderAll();
      $("#searchInput").focus();
    });

    $("#moduleFilter").addEventListener("change", (event) => {
      state.module = event.target.value;
      renderAll();
    });

    $("#levelFilter").addEventListener("change", (event) => {
      state.level = event.target.value;
      renderAll();
    });

    $("#statusFilter").addEventListener("change", (event) => {
      state.status = event.target.value;
      renderAll();
    });

    $("#resetProgress").addEventListener("click", () => {
      state.progress = {};
      saveProgress();
      renderAll();
    });

    $("#contentForm").addEventListener("submit", (event) => {
      event.preventDefault();
      addCustomItem({
        type: $("#contentType").value,
        module: $("#contentModule").value,
        title: $("#contentTitle").value.trim(),
        body: $("#contentBody").value.trim()
      });
      event.target.reset();
    });

    $("#exportContent").addEventListener("click", () => {
      $("#exportBox").value = JSON.stringify({ version: 1, items: state.customItems }, null, 2);
      $("#exportBox").select();
    });

    $("#importContent").addEventListener("click", () => {
      try {
        const parsed = JSON.parse($("#importBox").value);
        const items = Array.isArray(parsed) ? parsed : parsed.items;
        if (!Array.isArray(items)) throw new Error("Invalid backup");
        state.customItems = items;
        saveCustomItems();
        $("#importBox").value = "";
        renderAll();
      } catch {
        alert("匯入失敗：請確認貼上的是這個網站匯出的 JSON。");
      }
    });
  }

  function renderAll() {
    renderNav();
    renderViews();
    renderMetrics();
    renderPhaseSwitch();
    renderActivePhase();
    renderModuleStrip();
    renderModuleGrid();
    renderRoadmap();
    renderFilters();
    renderSkills();
    renderProjects();
    renderWorkflow();
    renderMaintenance();
    renderEditor();
    $("#searchInput").value = state.query;
  }

  bindEvents();
  renderAll();
})();
