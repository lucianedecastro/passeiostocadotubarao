// Countdown oficial da temporada de baleias — versão multilíngue
// Temporada: 1º de Julho a 31 de Outubro (anual)
// Usa o motor de tradução (js/i18n.js). Chaves: cd_before, cd_active, cd_ended.

document.addEventListener("DOMContentLoaded", function(){

const countdownElement = document.getElementById("countdown");
if(!countdownElement){ return; }

function currentLang(){
  try{ return (window.TTi18n && TTi18n.current) ? TTi18n.current() : "pt"; }catch(e){ return "pt"; }
}

function phrase(key, n){
  var s = null;
  try{ if(window.TTi18n && TTi18n.t){ s = TTi18n.t(currentLang(), key); } }catch(e){}
  // Fallback em português, caso o i18n ainda não tenha carregado
  if(s == null){
    if(key === "cd_before") s = "Faltam {n} dias para o início da temporada 🐋";
    else if(key === "cd_active") s = "Temporada ativa — termina em {n} dias 🐋";
    else s = "Temporada encerrada.";
  }
  return s.replace("{n}", n);
}

function updateCountdown(){
  const now = new Date();
  const year = now.getFullYear();
  const seasonStart = new Date(year, 6, 1);   // Julho
  const seasonEnd   = new Date(year, 9, 31);  // Outubro

  if(now < seasonStart){
    const days = Math.floor((seasonStart - now) / (1000*60*60*24));
    countdownElement.innerHTML = phrase("cd_before", days);
  } else if(now >= seasonStart && now <= seasonEnd){
    const days = Math.floor((seasonEnd - now) / (1000*60*60*24));
    countdownElement.innerHTML = phrase("cd_active", days);
  } else {
    countdownElement.innerHTML = phrase("cd_ended", 0);
  }
}

updateCountdown();
setInterval(updateCountdown, 86400000);

// Re-renderiza ao trocar de idioma
document.addEventListener("tt:langchanged", updateCountdown);

});
