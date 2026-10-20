/* Contact sans serveur : prépare un brouillon, sans envoyer ni conserver de données. */
(() => {
  "use strict";

  const recipient = "cabinet@msjexpert.fr";
  const services = {
    group: "MSJ GROUP — demande générale",
    expert: "MSJ EXPERT",
    assurance: "MSJ ASSURANCE",
    domiciliation: "MSJ DOMICILIATION",
  };

  async function copyText(value) {
    if (navigator.clipboard && window.isSecureContext) {
      try {
        await navigator.clipboard.writeText(value);
        return true;
      } catch (_) {
        // Certains navigateurs refusent cette permission : essayer la sélection locale.
      }
    }
    const previousFocus = document.activeElement;
    const temporary = document.createElement("textarea");
    temporary.value = value;
    temporary.setAttribute("readonly", "");
    temporary.style.cssText = "position:fixed;left:-9999px;top:0;";
    document.body.append(temporary);
    temporary.select();
    let copied = false;
    try {
      copied = document.execCommand("copy");
    } catch (_) {
      /* Repli manuel ci-dessous. */
    }
    temporary.remove();
    if (previousFocus instanceof HTMLElement)
      previousFocus.focus({ preventScroll: true });
    return copied;
  }

  function init() {
    document.querySelectorAll("[data-copy-email]").forEach((button) => {
      button.addEventListener("click", async () => {
        const status =
          button
            .closest(".contact-card")
            ?.querySelector("[data-copy-status]") ||
          document.getElementById("email-copy-status");
        const copied = await copyText(recipient);
        if (status)
          status.textContent = copied
            ? "Adresse e-mail copiée."
            : "Copiez cette adresse : " + recipient;
      });
    });

    const form = document.getElementById("contact-form");
    if (!form) return;
    const select = form.elements.namedItem("service");
    const requestedService = new URLSearchParams(window.location.search).get(
      "service",
    );
    if (Object.prototype.hasOwnProperty.call(services, requestedService)) {
      select.value = requestedService;
    }

    const result = document.getElementById("contact-result");
    const preview = document.getElementById("message-preview");
    const openMail = document.getElementById("open-mail");
    const copyMessage = document.getElementById("copy-message");
    const downloadMessage = document.getElementById("download-message");
    const status = document.getElementById("message-status");
    let preparedText = "";

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      if (!form.reportValidity()) return;

      const name = form.elements.namedItem("name").value.trim();
      const email = form.elements.namedItem("email").value.trim();
      const messageField = form.elements.namedItem("message");
      const message = messageField.value.trim();
      if (!name || !message) {
        const invalidField = !name
          ? form.elements.namedItem("name")
          : messageField;
        invalidField.setCustomValidity(
          "Veuillez saisir un texte, et pas uniquement des espaces.",
        );
        invalidField.reportValidity();
        invalidField.addEventListener(
          "input",
          () => invalidField.setCustomValidity(""),
          { once: true },
        );
        return;
      }
      const service = services[select.value] || services.group;
      const subject = "Demande de contact — " + service;
      const body = [
        "Bonjour,",
        "",
        message,
        "",
        "Nom : " + name,
        "E-mail de réponse : " + email,
        "Service concerné : " + service,
        "",
        "Cordialement,",
        name,
      ].join("\n");

      preparedText = ["À : " + recipient, "Objet : " + subject, "", body].join(
        "\n",
      );
      preview.value = preparedText;
      openMail.href =
        "mailto:" +
        recipient +
        "?subject=" +
        encodeURIComponent(subject) +
        "&body=" +
        encodeURIComponent(body);
      status.textContent = "";
      result.hidden = false;
      document
        .getElementById("contact-result-title")
        .focus({ preventScroll: true });
      result.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "auto"
          : "smooth",
        block: "nearest",
      });
    });

    form.addEventListener("input", () => {
      if (!result.hidden) {
        result.hidden = true;
        preparedText = "";
        status.textContent = "";
      }
    });

    copyMessage.addEventListener("click", async () => {
      if (!preparedText) return;
      const copied = await copyText(preparedText);
      status.textContent = copied
        ? "Message copié. Vous pouvez le coller dans votre messagerie."
        : "La copie automatique est indisponible. Sélectionnez et copiez le texte de l’aperçu ci-dessous.";
      if (!copied) {
        preview.focus();
        preview.select();
      }
    });

    downloadMessage.addEventListener("click", () => {
      if (!preparedText) return;
      const file = new Blob(["\uFEFF" + preparedText], {
        type: "text/plain;charset=utf-8",
      });
      const url = URL.createObjectURL(file);
      const link = document.createElement("a");
      link.href = url;
      link.download = "demande-msj-group.txt";
      document.body.append(link);
      link.click();
      link.remove();
      window.setTimeout(() => URL.revokeObjectURL(url), 5000);
      status.textContent =
        "Le téléchargement du message a été demandé. Vous pouvez le joindre à votre e-mail.";
    });
  }

  if (document.readyState === "loading")
    document.addEventListener("DOMContentLoaded", init, { once: true });
  else init();
})();
