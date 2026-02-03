
(function () {
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  // Footer year
  const yearEl = $("#year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // Theme (persist)
  const themeToggle = $("#themeToggle");
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "light" || savedTheme === "dark") {
    document.documentElement.setAttribute("data-theme", savedTheme);
  }
  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const current = document.documentElement.getAttribute("data-theme") || "dark";
      const next = current === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      localStorage.setItem("theme", next);
    });
  }

  // Mobile nav panel
  const navToggle = $("#navToggle");
  const navPanel = $("#navPanel");
  if (navToggle && navPanel) {
    navToggle.addEventListener("click", () => {
      const isOpen = navPanel.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
  }

  // Submenus
  const submenuButtons = $$(".nav-item.has-submenu > .nav-btn");
  function closeAllSubmenus(exceptId = null) {
    submenuButtons.forEach((btn) => {
      const menuId = btn.getAttribute("data-submenu");
      const menu = menuId ? $("#" + menuId) : null;
      const shouldClose = !exceptId || menuId !== exceptId;
      if (menu && shouldClose) {
        menu.classList.remove("open");
        btn.setAttribute("aria-expanded", "false");
      }
    });
  }

  submenuButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const menuId = btn.getAttribute("data-submenu");
      const menu = menuId ? $("#" + menuId) : null;
      if (!menu) return;

      const willOpen = !menu.classList.contains("open");
      closeAllSubmenus(menuId);
      menu.classList.toggle("open", willOpen);
      btn.setAttribute("aria-expanded", willOpen ? "true" : "false");
    });
  });

  // Close on outside click
  document.addEventListener("click", (e) => {
    const isInsideNav = !!e.target.closest(".nav");
    if (!isInsideNav) {
      closeAllSubmenus();
      if (navPanel) navPanel.classList.remove("open");
      if (navToggle) navToggle.setAttribute("aria-expanded", "false");
    }
  });

  // Close on ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeAllSubmenus();
      if (navPanel) navPanel.classList.remove("open");
      if (navToggle) navToggle.setAttribute("aria-expanded", "false");
    }
  });
})();
