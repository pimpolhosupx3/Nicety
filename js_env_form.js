document.getElementById('solicitacaoForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const idSolicitante = new URLSearchParams(window.location.search).get('id');
    const nomeSolicitante = new URLSearchParams(window.location.search).get('nome');

    const solicitacao = {
        idSolicitante: idSolicitante,
        nomeSolicitante: nomeSolicitante,
        cliente: document.getElementById('cliente').value,
        tecnologia: document.getElementById('tecnologia').value,
        ordem: document.getElementById('ordem').value,
        operacao: document.getElementById('operacao').value,
        hrplan: document.getElementById('hrplan').value,
        hrconf: document.getElementById('hrconf').value,
        quantplan: document.getElementById('quantplan').value,
        quantconf: document.getElementById('quantconf').value,
        justificativa: document.getElementById('justificativa').value,
        status: 'pendente'
    };

    fetch('https://66566aae9f970b3b36c552c9.mockapi.io/nicety/v1/form', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(solicitacao)
    })
    .then(response => response.json())
    .then(data => {
        showPopup('Solicitação de Ajuste Enviada');
        document.getElementById('solicitacaoForm').reset();
    })
    .catch(error => {
        console.error('Erro ao enviar o formulário:', error);
        showPopup('Ocorreu um erro ao enviar o formulário. Tente novamente.');
    });
});

// Função para mostrar o pop-up
function showPopup(message) {
    const popup = document.getElementById('popup');
    const popupMessage = document.getElementById('popup-message');
    popupMessage.innerText = message;
    popup.style.display = 'block';
}

// Evento para o botão "Ir para a Home"
document.getElementById('homeButton').addEventListener('click', function() {
    window.location.href = 'home.html';
});
