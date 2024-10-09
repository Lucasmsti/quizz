let quiz = {};
let pontos = 0;
let pergunta = 1;
let resposta = "";
let id_input_resposta = "";

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

            <button>Enviar</button>
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
    if (resposta === quiz.perguntas[pergunta-1].resposta_correta) {
        document.querySelector(`label[for='${id_input_resposta}']`).setAttribute("id", "certo");
        pontos = pontos + 1;
    }
};

async function iniciar() {
    await buscar_perguntas();
    montar_pergunta();

    const input_resposta = document.querySelectorAll(".alternativas input");
    input_resposta.forEach(input => {
        input.addEventListener("click", guardar_resposta);
    });
};

iniciar();