let quiz = {};
let pontos = 0;
let pergunta = 1;
let resposta = "";
let id_input_resposta = "";
let id_resposta_correta = "";

async function buscar_perguntas () {
    const url_dados = "../../data.json";

    const resposta = await fetch(url_dados);
    const dados = await resposta.json();
    quiz = dados;
};

function montar_pergunta() {
    const main = document.querySelector("main");

    main.innerHTML = `
        <section class="pergunta">
            <div>
                <p>Questão ${pergunta} de 10</p>
                <h2>${quiz.perguntas[pergunta-1].pergunta}</h2>
            </div>
            <div class="barra-progresso">
                <div style="width: ${pergunta * 10}%"></div>
            </div>
        </section>

        <section class="alternativas">
            <form action="">
                <label for="alternativa-a">
                    <input type="radio" id="alternativa-a" name="alternativa" value="${quiz.perguntas[pergunta-1].alternativas[0]}"/>
                <div>
                    <span>A</span>
                    ${quiz.perguntas[pergunta-1].alternativas[0]}
                </div>
            </label>

            <label for="alternativa-b">
                <input type="radio" id="alternativa-b" name="alternativa" value="${quiz.perguntas[pergunta-1].alternativas[1]}"/>
                <div>
                <span>B</span>
                ${quiz.perguntas[pergunta-1].alternativas[1]}
                </div>
            </label>
            <label for="alternativa-c">
                <input type="radio" id="alternativa-c" name="alternativa" value="${quiz.perguntas[pergunta-1].alternativas[2]}"/>
                <div>
                <span>C</span>
                ${quiz.perguntas[pergunta-1].alternativas[2]}
                </div>
            </label>
            <label for="alternativa-d">
                <input type="radio" id="alternativa-d" name="alternativa" value="${quiz.perguntas[pergunta-1].alternativas[3]}"/>
                <div>
                <span>D</span>
                ${quiz.perguntas[pergunta-1].alternativas[3]}
                </div>
            </label>
            <label for="alternativa-e">
                <input type="radio" id="alternativa-e" name="alternativa" value="${quiz.perguntas[pergunta-1].alternativas[4]}"/>
                <div>
                <span>E</span>
                ${quiz.perguntas[pergunta-1].alternativas[4]}
                </div>
            </label>
            </form>

            <button>Responder</button>
        </section>
      ` 
};

function guardar_resposta(evento) {
    resposta = evento.target.value;
    id_input_resposta = evento.target.id;

    const btn_enviar = document.querySelector(".alternativas button");
    btn_enviar.addEventListener("click", validar_reposta);

};

function validar_reposta() {
    const btn_enviar = document.querySelector(".alternativas button");

    btn_enviar.innerText = "Próxima";

    btn_enviar.removeEventListener("click", validar_reposta);

    if (pergunta === 10) {
        btn_enviar.innerText = "Finalizar";

        btn_enviar.addEventListener("click", finalizar);
    } else {
        btn_enviar.addEventListener("click", proxima_pergunta);
    }

    if (resposta === quiz.perguntas[pergunta-1].correct) {
        document.querySelector(`label[for='${id_input_resposta}']`).setAttribute("id", "certo");
        pontos += 1;
    } else {
        document.querySelector(`label[for='${id_input_resposta}']`).setAttribute("id", "errado");

    }

    pergunta += 1;
};

function finalizar() {
    localStorage.setItem("pontos", pontos);
    window.location.href = "../resultado/resultado.html"
};

function proxima_pergunta() {
    montar_pergunta()
    adicionar_eventos_inputs();
};

function adicionar_eventos_inputs() {
    const input_resposta = document.querySelectorAll(".alternativas input");
    input_resposta.forEach(input => {
        input.addEventListener("click", guardar_resposta);

        if (input.value === quiz.perguntas[pergunta-1].correct) {
            id_resposta_correta = input.id;
        }
    });
};

async function iniciar() {
    await buscar_perguntas();
    montar_pergunta();
    adicionar_eventos_inputs();
};

iniciar();