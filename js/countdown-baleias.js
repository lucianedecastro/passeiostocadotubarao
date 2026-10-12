
// Countdown oficial da temporada de baleias — versão multilíngue
// Temporada: 1º de junho a 30 de setembro (anual)
// Usa o motor de tradução (js/i18n.js).
// Chaves: cd_before, cd_active, cd_ended.

document.addEventListener("DOMContentLoaded", function () {

  const countdownElement = document.getElementById("countdown");
  if (!countdownElement) { return; }

  function currentLang() {
    try {
      return (window.TTi18n && TTi18n.current)
        ? TTi18n.current()
        : "pt";
    } catch (e) {
      return "pt";
    }
  }

  function phrase(key, n) {
    var s = null;

    try {
      if (window.TTi18n && TTi18n.t) {
        s = TTi18n.t(currentLang(), key);
      }
    } catch (e) {}

    // Fallback em português, caso o i18n ainda não tenha carregado
    if (s == null) {
      if (key === "cd_before") {
        s = "Faltam {n} dias para o início da temporada 🐋";
      } else if (key === "cd_active") {
        s = "Temporada ativa — termina em {n} dias 🐋";
      } else {
        s = "Temporada encerrada.";
      }
    }

    return s.replace("{n}", n);
  }

  function updateCountdown() {
    const now = new Date();
    const year = now.getFullYear();

    // Início: 1º de junho, às 00h00
    const seasonStart = new Date(year, 5, 1);

    // Fim: 30 de setembro, às 23h59min59s
    // Limite exclusivo: 1º de outubro, às 00h00
    const seasonEnd = new Date(year, 9, 1);

    if (now < seasonStart) {
      const days = Math.ceil(
        (seasonStart - now) / (1000 * 60 * 60 * 24)
      );

      countdownElement.innerHTML = phrase("cd_before", days);

    } else if (now < seasonEnd) {
      const days = Math.ceil(
        (seasonEnd - now) / (1000 * 60 * 60 * 24)
      );

      countdownElement.innerHTML = phrase("cd_active", days);

    } else {
      countdownElement.innerHTML = phrase("cd_ended", 0);
    }
  }

  // Atualiza imediatamente ao carregar a página
  updateCountdown();

  // Atualiza automaticamente a cada 24 horas
  setInterval(updateCountdown, 86400000);

  // Re-renderiza ao trocar de idioma
  document.addEventListener("tt:langchanged", updateCountdown);

});
