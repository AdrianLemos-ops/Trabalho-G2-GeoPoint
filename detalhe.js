
const id = lerParametro("id");

const elCarregando = document.getElementById("carregando");
const secaoErro = document.getElementById("secao-erro");
const elErro = document.getElementById("erro");
const secaoDetalhe = document.getElementById("secao-detalhe");

let ponto = null;

// MOSTRAR ERRO
function mostrarErro(mensagem) {
    mostrarMensagem(elErro, mensagem);
    mostrar(secaoErro, true);
}

// PREENCHER A PÁGINA COM OS DADOS
function preencherTela() {
    document.title = `${ponto.name} - GeoPoint`;

    document.getElementById("nome").textContent = ponto.name;
    document.getElementById("descricao").textContent =
        ponto.description || "Sem descrição";

    document.getElementById("latitude").textContent = ponto.latitude;
    document.getElementById("longitude").textContent = ponto.longitude;
    document.getElementById("ponto-id").textContent = ponto.id;

    mostrar(secaoDetalhe, true);
}

// BUSCAR O PONTO NA API
async function carregar() {
    if (!id) {
        mostrar(elCarregando, false);
        mostrarErro("Nenhum ponto foi informado.");
        return;
    }

    try {
        ponto = await buscarPonto(id);
        preencherTela();

    } catch (erro) {
        mostrarErro("Não foi possível carregar o ponto: " + erro.message);

    } finally {
        mostrar(elCarregando, false);
    }
}

// INICIAR
carregar();
