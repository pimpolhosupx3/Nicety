document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const nomeSolicitante = urlParams.get('nome');
    const idSolicitante = urlParams.get('id');

    if (nomeSolicitante && idSolicitante) {
        const headerElement = document.querySelector('.cabecalho');
        headerElement.innerHTML += `<h3 class="idnome">${ nomeSolicitante} | ID: ${idSolicitante }</h3>`;
    }
});