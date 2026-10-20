document.documentElement.classList.add("js");

const menuButton = document.querySelector(".menu-toggle");
const menu = document.getElementById("primary-nav");
if (menuButton && menu) {
  const closeMenu = () => {
    menu.classList.remove("is-open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.querySelector(".menu-label").textContent = "Menu";
  };
  menuButton.addEventListener("click", () => {
    const open = menuButton.getAttribute("aria-expanded") !== "true";
    menu.classList.toggle("is-open", open);
    menuButton.setAttribute("aria-expanded", String(open));
    menuButton.querySelector(".menu-label").textContent = open
      ? "Fermer"
      : "Menu";
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menu.classList.contains("is-open")) {
      closeMenu();
      menuButton.focus();
    }
  });
  document.addEventListener("click", (event) => {
    if (!event.target.closest(".site-header")) closeMenu();
  });
  menu.addEventListener("click", (event) => {
    if (event.target.closest("a")) closeMenu();
  });
  window.matchMedia("(min-width: 961px)").addEventListener("change", closeMenu);
}

const year = document.querySelector("[data-year]");
if (year) year.textContent = String(new Date().getFullYear());

const poster = document.getElementById("poster-dialog");
const posterButton = document.getElementById("open-poster");
if (poster && posterButton) {
  posterButton.hidden = false;
  posterButton.addEventListener("click", () => {
    poster.showModal();
    document.body.classList.add("modal-open");
  });
  poster
    .querySelector(".dialog-close")
    .addEventListener("click", () => poster.close());
  poster.addEventListener("close", () =>
    document.body.classList.remove("modal-open"),
  );
  poster.addEventListener("click", (event) => {
    const r = poster.getBoundingClientRect();
    if (
      event.clientX < r.left ||
      event.clientX > r.right ||
      event.clientY < r.top ||
      event.clientY > r.bottom
    )
      poster.close();
  });
}

// Keep links shared from the original one-page site useful.
if (document.body.dataset.page === "home") {
  const legacyPages = {
    expert: "expert.html",
    assurance: "assurance.html",
    domiciliation: "domiciliation.html",
  };
  const redirectLegacyLink = () => {
    const destination = legacyPages[location.hash.slice(1)];
    if (destination) location.replace(destination);
  };
  redirectLegacyLink();
  window.addEventListener("hashchange", redirectLegacyLink);
}
