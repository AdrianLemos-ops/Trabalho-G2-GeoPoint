
// ELEMENTO DA TABELA
const tabela = document.getElementById("lista-pontos");

// LISTAR PONTOS
async function listarPontos() {
    try {
        const pontos = await listarPontosAPI();

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

            const nome = document.createElement("td");
            nome.textContent = ponto.name;

            const descricao = document.createElement("td");
            descricao.textContent = ponto.description || "Sem descrição";

            const latitude = document.createElement("td");
            latitude.textContent = ponto.latitude;

            const longitude = document.createElement("td");
            longitude.textContent = ponto.longitude;

            const acoes = document.createElement("td");

            // BOTÃO DETALHES
            const botaoDetalhes = document.createElement("button");
            botaoDetalhes.textContent = "Detalhes";
            botaoDetalhes.className = "botao-detalhes";

            botaoDetalhes.addEventListener("click", () => {
                verDetalhes(ponto);
            });

            // BOTÃO EDITAR
            const botaoEditar = document.createElement("button");
            botaoEditar.textContent = "Editar";
            botaoEditar.className = "botao-editar";

            botaoEditar.addEventListener("click", () => {
                editarPonto(ponto);
            });

            // BOTÃO EXCLUIR
            const botaoExcluir = document.createElement("button");
            botaoExcluir.textContent = "Excluir";
            botaoExcluir.className = "botao-excluir";

            botaoExcluir.addEventListener("click", () => {
                excluirPonto(ponto.id);
            });

            acoes.append(
                botaoDetalhes,
                botaoEditar,
                botaoExcluir
            );

            linha.append(
                nome,
                descricao,
                latitude,
                longitude,
                acoes
            );

            tabela.appendChild(linha);
        });

        aplicarPesquisa();

    } catch (erro) {
        console.error("Erro:", erro);

        tabela.innerHTML = `
            <tr>
                <td colspan="5">
                    Não foi possível carregar os pontos.
                </td>
            </tr>
        `;
    }
}

// PESQUISAR POR NOME OU DESCRIÇÃO
function aplicarPesquisa() {
    const campoPesquisa = document.getElementById("pesquisa");

    if (!campoPesquisa) return;

    const pesquisa = campoPesquisa.value.trim().toLowerCase();
    const linhas = tabela.querySelectorAll("tr");

    linhas.forEach(linha => {
        const nome = linha.cells[0].textContent.toLowerCase();
        const descricao = linha.cells[1].textContent.toLowerCase();

        linha.style.display =
            nome.includes(pesquisa) || descricao.includes(pesquisa)
                ? ""
                : "none";
    });
}

// EVENTO DA PESQUISA
const campoPesquisa = document.getElementById("pesquisa");

if (campoPesquisa) {
    campoPesquisa.addEventListener("input", aplicarPesquisa);
}

// ABRIR DETALHES NA MESMA ABA
function verDetalhes(ponto) {
    window.location.assign(`ponto.html?id=${ponto.id}`);
}

// ABRIR EDIÇÃO NA MESMA ABA
function editarPonto(ponto) {
    window.location.assign(`formulario.html?id=${ponto.id}`);
}

// EXCLUIR PONTO
async function excluirPonto(id) {
    const confirmar = confirm("Deseja realmente excluir este ponto?");

    if (!confirmar) return;

    try {
        await excluirPontoAPI(id);

        alert("Ponto excluído com sucesso!");

        listarPontos();

    } catch (erro) {
        console.error("Erro:", erro);
        alert("Não foi possível excluir o ponto: " + erro.message);
    }
}

// INICIAR LISTAGEM
listarPontos();
