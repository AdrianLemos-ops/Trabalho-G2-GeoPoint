
const id = lerParametro("id");
const editando = Boolean(id);

const form = document.getElementById("form-ponto");
const areaCampos = document.getElementById("campos");
const titulo = document.getElementById("titulo");
const elMensagem = document.getElementById("mensagem");
const elCarregando = document.getElementById("carregando");
const secaoForm = document.getElementById("secao-form");
const btnSalvar = document.getElementById("btn-salvar");

const CAMPOS = [
    {
        rotulo: "Nome *",
        nome: "name",
        placeholder: "Digite o nome do ponto"
    },
    {
        rotulo: "Descrição",
        nome: "description",
        tipo: "textarea",
        placeholder: "Descrição do ponto (opcional)"
    },
    {
        rotulo: "Latitude *",
        nome: "latitude",
        inputmode: "decimal",
        placeholder: "Entre -90 e 90"
    },
    {
        rotulo: "Longitude *",
        nome: "longitude",
        inputmode: "decimal",
        placeholder: "Entre -180 e 180"
    }
];

// CRIAR OS CAMPOS
function montarCampos() {
    CAMPOS.forEach(campo => {
        areaCampos.appendChild(criarCampo(campo));
    });
}

// PREENCHER OS DADOS NA EDIÇÃO
function preencherFormulario(ponto) {
    for (const campo of CAMPOS) {
        form.elements[campo.nome].value = ponto[campo.nome] ?? "";
    }
}

// CONVERTER TEXTO EM NÚMERO
function lerNumero(texto) {
    const valor = texto.trim().replace(",", ".");
    return valor === "" ? NaN : Number(valor);
}

// LER OS DADOS DO FORMULÁRIO
function lerFormulario() {
    return {
        name: form.elements.name.value.trim(),
        description: form.elements.description.value.trim(),
        latitude: lerNumero(form.elements.latitude.value),
        longitude: lerNumero(form.elements.longitude.value)
    };
}

// VALIDAR OS DADOS
function validar(dados) {
    const erros = [];

    if (!dados.name) {
        erros.push("Informe o nome do ponto.");
    } else if (dados.name.length > 100) {
        erros.push("O nome deve ter no máximo 100 caracteres.");
    }

    if (dados.description.length > 255) {
        erros.push("A descrição deve ter no máximo 255 caracteres.");
    }

    if (Number.isNaN(dados.latitude)) {
        erros.push("Informe uma latitude válida.");
    } else if (dados.latitude < -90 || dados.latitude > 90) {
        erros.push("A latitude deve estar entre -90 e 90.");
    }

    if (Number.isNaN(dados.longitude)) {
        erros.push("Informe uma longitude válida.");
    } else if (dados.longitude < -180 || dados.longitude > 180) {
        erros.push("A longitude deve estar entre -180 e 180.");
    }

    return erros;
}

// INICIAR O FORMULÁRIO
async function iniciar() {
    montarCampos();

    if (editando) {
        titulo.textContent = "Editar ponto";
        btnSalvar.textContent = "Salvar alterações";

        mostrar(elCarregando, true);

        try {
            const ponto = await buscarPonto(id);
            preencherFormulario(ponto);
            mostrar(secaoForm, true);

        } catch (erro) {
            mostrarMensagem(
                elMensagem,
                "Não foi possível carregar o ponto: " + erro.message
            );

            mostrar(secaoForm, true);
            form.classList.add("escondido");

        } finally {
            mostrar(elCarregando, false);
        }

    } else {
        titulo.textContent = "Novo ponto";
        btnSalvar.textContent = "Cadastrar";

        mostrar(elCarregando, false);
        mostrar(secaoForm, true);
    }
}

// SALVAR CADASTRO OU EDIÇÃO
form.addEventListener("submit", async (evento) => {
    evento.preventDefault();

    mostrarMensagem(elMensagem, "");

    const dados = lerFormulario();
    const erros = validar(dados);

    if (erros.length > 0) {
        mostrarMensagem(elMensagem, erros);
        return;
    }

    try {
        btnSalvar.disabled = true;
        btnSalvar.textContent = "Salvando...";

        if (editando) {
            await atualizarPonto(id, dados);
        } else {
            await criarPonto(dados);
        }

        alert(
            editando
                ? "Ponto atualizado com sucesso!"
                : "Ponto cadastrado com sucesso!"
        );

        window.location.href = "index.html";

    } catch (erro) {
        mostrarMensagem(
            elMensagem,
            "Erro ao salvar: " + erro.message
        );

        btnSalvar.disabled = false;
        btnSalvar.textContent = editando
            ? "Salvar alterações"
            : "Cadastrar";
    }
});

// EXECUTAR
iniciar();
