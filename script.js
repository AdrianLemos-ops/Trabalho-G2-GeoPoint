
const API_URL = "https://geopoint-6x4u.onrender.com/api/points";

async function listarPontos() {
    const tabela = document.getElementById("lista-pontos");

    try {
        const resposta = await fetch(API_URL);

        if (!resposta.ok) {
            throw new Error("Erro ao buscar os pontos.");
        }

        const pontos = await resposta.json();

        tabela.innerHTML = "";

        if (pontos.length === 0) {
            tabela.innerHTML = `
                <tr>
                    <td colspan="5">Nenhum ponto cadastrado.</td>
                </tr>
            `;
            return;
        }

        pontos.forEach(ponto => {
            const linha = document.createElement("tr");

            linha.innerHTML = `
                <td>${ponto.name}</td>
                <td>${ponto.description || "Sem descrição"}</td>
                <td>${ponto.latitude}</td>
                <td>${ponto.longitude}</td>
                <td></td>
            `;

            const botaoExcluir = document.createElement("button");
            botaoExcluir.textContent = "Excluir";
            botaoExcluir.className = "botao-excluir";

            botaoExcluir.addEventListener("click", () => {
                excluirPonto(ponto.id);
            });

            linha.lastElementChild.appendChild(botaoExcluir);

            tabela.appendChild(linha);
        });

    } catch (erro) {
        console.error("Erro:", erro);

        tabela.innerHTML = `
            <tr>
                <td colspan="5">Não foi possível carregar os pontos.</td>
            </tr>
        `;
    }
}

async function excluirPonto(id) {
    const confirmar = confirm("Deseja realmente excluir este ponto?");

    if (!confirmar) {
        return;
    }

    try {
        const resposta = await fetch(`${API_URL}/${id}`, {
            method: "DELETE"
        });

        if (!resposta.ok) {
            throw new Error("Não foi possível excluir o ponto.");
        }

        alert("Ponto excluído com sucesso!");

        listarPontos();

    } catch (erro) {
        console.error("Erro:", erro);
        alert("Erro ao excluir o ponto.");
    }
}

listarPontos();
