// Countdown oficial da temporada de baleias
// Temporada: 1º de Julho a 31 de Outubro (anual)

document.addEventListener("DOMContentLoaded", function(){

const countdownElement = document.getElementById("countdown");

if(!countdownElement){
return;
}

const today = new Date();
const year = today.getFullYear();

const seasonStart = new Date(year, 6, 1);   // Julho
const seasonEnd   = new Date(year, 9, 31);  // Outubro

function updateCountdown(){

const now = new Date();

if(now < seasonStart){

const diff = seasonStart - now;
const days = Math.floor(diff / (1000 * 60 * 60 * 24));

countdownElement.innerHTML =
`Faltam ${days} dias para o início da temporada 🐋`;

}

else if(now >= seasonStart && now <= seasonEnd){

const diff = seasonEnd - now;
const days = Math.floor(diff / (1000 * 60 * 60 * 24));

countdownElement.innerHTML =
`Temporada ativa — termina em ${days} dias 🐋`;

}

else{

countdownElement.innerHTML =
"Temporada encerrada.";

}

}

updateCountdown();
setInterval(updateCountdown, 86400000);

});