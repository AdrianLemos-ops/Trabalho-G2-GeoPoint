
const API_URL = "https://geopoint-6x4u.onrender.com";

async function requisicao(caminho, opcoes = {}) {
    const resposta = await fetch(`${API_URL}${caminho}`, {
        headers: {
            "Content-Type": "application/json"
        },
        ...opcoes
    });

    if (!resposta.ok) {
        const corpo = await resposta.json().catch(() => ({}));
        throw new Error(
            corpo.message || corpo.erro || `Erro ${resposta.status}`
        );
    }

    if (resposta.status === 204) {
        return null;
    }

    return resposta.json();
}

const listarPontosAPI = () => requisicao("/api/points");

const buscarPonto = (id) =>
    requisicao(`/api/points/${id}`);

const criarPonto = (ponto) =>
    requisicao("/api/points", {
        method: "POST",
        body: JSON.stringify(ponto)
    });

const atualizarPonto = (id, ponto) =>
    requisicao(`/api/points/${id}`, {
        method: "PUT",
        body: JSON.stringify(ponto)
    });

const excluirPontoAPI = (id) =>
    requisicao(`/api/points/${id}`, {
        method: "DELETE"
    });
