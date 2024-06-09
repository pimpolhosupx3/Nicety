document.addEventListener('DOMContentLoaded', () => {
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
    const pendenteList = document.getElementById('pendente-list');
    const aprovadoList = document.getElementById('aprovado-list');
    const recusadoList = document.getElementById('recusado-list');

    solicitacoes.forEach(solicitacao => {
        const listItem = document.createElement('li');
        const statusDisplay = solicitacao.status
            ? `${solicitacao.status}`
            : 'Ainda não avaliado';
        listItem.textContent = `Nome: ${solicitacao.nomeSolicitante}, ID: ${solicitacao.idSolicitante}, Cliente: ${solicitacao.cliente}, Tecnologia: ${solicitacao.tecnologia}, Status: ${statusDisplay}`;
        listItem.addEventListener('click', () => viewDetalhesSolicitacao(solicitacao));

        if (solicitacao.status && (solicitacao.status.includes('Aprovado') || solicitacao.status.includes('Recusado'))) {
            if (solicitacao.status.includes('Aprovado')) {
                aprovadoList.appendChild(listItem);
            } else if (solicitacao.status.includes('Recusado')) {
                recusadoList.appendChild(listItem);
            }
        } else {
            pendenteList.appendChild(listItem);
        }
    });
}

function viewDetalhesSolicitacao(solicitacao) {
    const modal = document.getElementById('popup');
    const detalhesInfo = document.getElementById('detalhes-solicitacao');

    detalhesInfo.innerHTML = `
        <li><strong>Nome do Solicitante:</strong> ${solicitacao.nomeSolicitante}</li>
        <li><strong>ID:</strong> ${solicitacao.idSolicitante}</li>
        <li><strong>Cliente:</strong> ${solicitacao.cliente}</li>
        <li><strong>Tecnologia:</strong> ${solicitacao.tecnologia}</li>
        <li><strong>Ordem:</strong> ${solicitacao.ordem}</li>
        <li><strong>Operação:</strong> ${solicitacao.operacao}</li>
        <li><strong>Horas Planejadas:</strong> ${solicitacao.hrplan}</li>
        <li><strong>Horas Confirmadas:</strong> ${solicitacao.hrconf}</li>
        <li><strong>Quantidade Planejada:</strong> ${solicitacao.quantplan}</li>
        <li><strong>Quantidade Confirmada:</strong> ${solicitacao.quantconf}</li>
        <li><strong>Justificativa do Solicitante:</strong> ${solicitacao.justificativa || 'N/A'}</li>
        <li><strong>Status:</strong> ${solicitacao.status || 'N/A'}</li>
        <li><strong>Justificativa da Engenharia:</strong> ${solicitacao.justificativaEng || 'N/A'}</li>
    `;

    modal.style.display = 'block';
}

document.querySelectorAll('.close').forEach(button => {
    button.onclick = () => {
        document.getElementById('popup').style.display = 'none';
    };
});
