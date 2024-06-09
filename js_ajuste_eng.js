document.addEventListener('DOMContentLoaded', () => {
    const userName = localStorage.getItem('userName');
    if (userName) {
        document.getElementById('nome-eng').textContent = userName;
    } else {
        window.location.href = 'index.html';
    }

    document.getElementById('logoutButton').addEventListener('click', () => {
        localStorage.removeItem('userName');
        window.location.href = 'index.html';
    });

    fetchSolicitacoes();
});

async function fetchSolicitacoes() {
    try {
        const response = await fetch('https://66566aae9f970b3b36c552c9.mockapi.io/nicety/v1/form/');
        const solicitacoes = await response.json();
        displaySolicitacoes(solicitacoes);
    } catch (error) {
        console.error('Erro ao buscar solicitações:', error);
    }
}

function displaySolicitacoes(solicitacoes) {
    const pendentesList = document.getElementById('pendentes-list');
    const concluidosList = document.getElementById('concluidos-list');

    solicitacoes.forEach(solicitacao => {
        const listItem = document.createElement('li');
        const statusDisplay = solicitacao.status
            ? `${solicitacao.status}`
            : 'Ainda não avaliado';
        listItem.textContent = `Nome: ${solicitacao.nomeSolicitante}, ID: ${solicitacao.idSolicitante}, Cliente: ${solicitacao.cliente}, Tecnologia: ${solicitacao.tecnologia}, Status: ${statusDisplay}`;
        listItem.addEventListener('click', () => viewDetalhesSolicitacao(solicitacao));

        if (solicitacao.status === 'Aprovado por ' + solicitacao.aprovador || solicitacao.status === 'Recusado por ' + solicitacao.aprovador) {
            concluidosList.appendChild(listItem);
        } else {
            pendentesList.appendChild(listItem);
        }
    });
}

function viewDetalhesSolicitacao(solicitacao) {
    const modal = document.getElementById('popup');
    const detalhesInfo = document.getElementById('detalhes-solicitacao');
    const status = document.getElementById('status');

    const statusDisplay = solicitacao.status
        ? `${solicitacao.status}`
        : 'Ainda não avaliado';

    detalhesInfo.innerHTML = `
        <p><strong>Nome:</strong> ${solicitacao.nomeSolicitante}</p>
        <p><strong>ID:</strong> ${solicitacao.idSolicitante}</p>
        <p><strong>Cliente:</strong> ${solicitacao.cliente}</p>
        <p><strong>Tecnologia:</strong> ${solicitacao.tecnologia}</p>
        <p><strong>Ordem:</strong> ${solicitacao.ordem}</p>
        <p><strong>Operação:</strong> ${solicitacao.operacao}</p>
        <p><strong>Horas Planejadas:</strong> ${solicitacao.hrplan}</p>
        <p><strong>Horas Confirmadas:</strong> ${solicitacao.hrconf}</p>
        <p><strong>Quantidade Planejada:</strong> ${solicitacao.quantplan}</p>
        <p><strong>Quantidade Confirmada:</strong> ${solicitacao.quantconf}</p>
        <p><strong>Justificativa do Solicitante:</strong> ${solicitacao.justificativa || 'N/A'}</p>
    `;

    status.innerHTML = `<p><strong>Status:</strong> ${statusDisplay}</p>`;

    const justificativaEng = document.getElementById('justificativa');
    justificativaEng.value = solicitacao.justificativaEng || '';
    const aprovarButton = document.getElementById('aprovarButton');
    const rejeitarButton = document.getElementById('rejeitarButton');

    aprovarButton.onclick = () => updateSolicitacaoStatus(solicitacao, 'Aprovado');
    rejeitarButton.onclick = () => updateSolicitacaoStatus(solicitacao, 'Recusado');

    modal.style.display = 'flex';
}

function updateSolicitacaoStatus(solicitacao, status) {
    const justificativaEng = document.getElementById('justificativa').value;
    const aprovador = localStorage.getItem('userName');

    const updatedSolicitacao = {
        ...solicitacao,
        status: `${status} por ${aprovador}`,
        justificativaEng,
        aprovador
    };

    fetch(`https://66566aae9f970b3b36c552c9.mockapi.io/nicety/v1/form/${solicitacao.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedSolicitacao)
    })
    .then(response => response.json())
    .then(updatedSolicitacao => {
        alert(`Solicitação ${status.toLowerCase()} com sucesso!`);
        location.reload();
    })
    .catch(error => {
        console.error('Erro ao atualizar solicitação:', error);
    });
}

document.querySelectorAll('.close').forEach(button => {
    button.onclick = () => {
        document.getElementById('popup').style.display = 'none';
    };
});
