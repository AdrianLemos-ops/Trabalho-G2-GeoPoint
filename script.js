
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

            // Botão Editar
            const botaoEditar = document.createElement("button");
            botaoEditar.textContent = "Editar";
            botaoEditar.className = "botao-editar";

            botaoEditar.addEventListener("click", () => {
                editarPonto(ponto);
            });

            // Botão Excluir
            const botaoExcluir = document.createElement("button");
            botaoExcluir.textContent = "Excluir";
            botaoExcluir.className = "botao-excluir";

            botaoExcluir.addEventListener("click", () => {
                excluirPonto(ponto.id);
            });

            linha.lastElementChild.appendChild(botaoEditar);
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

// Função de exclusão
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

// Função de edição (vamos implementar na próxima etapa)
async function editarPonto(ponto) {
    const nome = prompt("Digite o novo nome:", ponto.name);

    if (nome === null || nome.trim() === "") {
        return;
    }

    const descricao = prompt(
        "Digite a nova descrição:",
        ponto.description || ""
    );

    if (descricao === null) {
        return;
    }

    const latitude = prompt(
        "Digite a nova latitude:",
        ponto.latitude
    );

    if (latitude === null) {
        return;
    }

    const longitude = prompt(
        "Digite a nova longitude:",
        ponto.longitude
    );

    if (longitude === null) {
        return;
    }

    try {
        const resposta = await fetch(`${API_URL}/${ponto.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: nome.trim(),
                description: descricao.trim(),
                latitude: Number(latitude),
                longitude: Number(longitude)
            })
        });

        if (!resposta.ok) {
            throw new Error("Erro ao atualizar o ponto.");
        }

        alert("Ponto atualizado com sucesso!");

        listarPontos();

    } catch (erro) {
        console.error("Erro:", erro);
        alert("Não foi possível atualizar o ponto.");
    }
}

listarPontos();
