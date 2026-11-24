
function lerParametro(nome) {
    return new URLSearchParams(window.location.search).get(nome);
}

function mostrar(elemento, visivel) {
    elemento.classList.toggle("escondido", !visivel);
}

function criarCampo({
    rotulo,
    nome,
    tipo = "text",
    placeholder = "",
    dica = "",
    inputmode = ""
}) {
    const grupo = document.createElement("div");
    grupo.className = "grupo-campo";

    const label = document.createElement("label");
    label.htmlFor = nome;
    label.textContent = rotulo;

    const entrada = document.createElement(
        tipo === "textarea" ? "textarea" : "input"
    );

    entrada.id = nome;
    entrada.name = nome;

    if (tipo === "textarea") {
        entrada.rows = 3;
    } else {
        entrada.type = tipo;
    }

    entrada.placeholder = placeholder;

    if (inputmode) {
        entrada.inputMode = inputmode;
    }

    grupo.appendChild(label);
    grupo.appendChild(entrada);

    if (dica) {
        const small = document.createElement("small");
        small.textContent = dica;
        grupo.appendChild(small);
    }

    return grupo;
}

function mostrarMensagem(elemento, texto, tipo = "erro") {
    elemento.innerHTML = "";

    const itens = [].concat(texto || []);

    if (itens.length === 0) {
        mostrar(elemento, false);
        return;
    }

    elemento.className = tipo;

    itens.forEach(item => {
        const p = document.createElement("p");
        p.textContent = item;
        elemento.appendChild(p);
    });

    mostrar(elemento, true);
}
