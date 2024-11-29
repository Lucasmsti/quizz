let quiz = {};
let pontos = 0;
let pergunta = 0; // Começar em 0 para usar como índice
let resposta = "";
let id_input_resposta = "";
let id_resposta_correta = "";
const music = document.getElementById("background-music");
music.volume = 0.1;
const correctSound = document.getElementById("correct-sound");
correctSound.volume = 0.3;
const wrongSound = document.getElementById("wrong-sound");
wrongSound.volume = 0.3;

async function buscar_perguntas() {
    const url_dados = "../../data.json";
    const resposta = await fetch(url_dados);
    const dados = await resposta.json();
    quiz = dados;
    

    embaralhar_perguntas(); // Embaralhar perguntas após carregá-las
}

function playCorrectSound() {
    correctSound.currentTime = 0; // Recomeça o som
    correctSound.play();
}

function playWrongSound() {
    wrongSound.currentTime = 0; // Recomeça o som
    wrongSound.play();
}

function embaralhar_perguntas() {
    for (let i = quiz.perguntas.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [quiz.perguntas[i], quiz.perguntas[j]] = [quiz.perguntas[j], quiz.perguntas[i]];
    }

    // Embaralhar as alternativas de cada pergunta
    quiz.perguntas.forEach(pergunta => {
        embaralhar_alternativas(pergunta);
    });
}

function embaralhar_alternativas(pergunta) {
    const alternativas = pergunta.alternativas;
    for (let i = alternativas.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [alternativas[i], alternativas[j]] = [alternativas[j], alternativas[i]];
    }
}

function montar_pergunta() {
    const main = document.querySelector("main");
    main.innerHTML = `
        <section class="pergunta">
            <div>
                <p>Questão ${pergunta + 1} de ${quiz.perguntas.length}</p>
                <h2>${quiz.perguntas[pergunta].pergunta}</h2>
            </div>
            <div class="barra-progresso">
                <div style="width: ${(pergunta + 1) * (100 / quiz.perguntas.length)}%"></div>
            </div>
        </section>

        <section class="alternativas">
            <form action="">
                <label for="alternativa-a">
                    <input type="radio" id="alternativa-a" name="alternativa" value="${quiz.perguntas[pergunta].alternativas[0]}"/>
                    <div>
                        <span>A</span>
                        ${quiz.perguntas[pergunta].alternativas[0]}
                    </div>
                </label>

                <label for="alternativa-b">
                    <input type="radio" id="alternativa-b" name="alternativa" value="${quiz.perguntas[pergunta].alternativas[1]}"/>
                    <div>
                        <span>B</span>
                        ${quiz.perguntas[pergunta].alternativas[1]}
                    </div>
                </label>
                <label for="alternativa-c">
                    <input type="radio" id="alternativa-c" name="alternativa" value="${quiz.perguntas[pergunta].alternativas[2]}"/>
                    <div>
                        <span>C</span>
                        ${quiz.perguntas[pergunta].alternativas[2]}
                    </div>
                </label>
                <label for="alternativa-d">
                    <input type="radio" id="alternativa-d" name="alternativa" value="${quiz.perguntas[pergunta].alternativas[3]}"/>
                    <div>
                        <span>D</span>
                        ${quiz.perguntas[pergunta].alternativas[3]}
                    </div>
                </label>
                <label for="alternativa-e">
                    <input type="radio" id="alternativa-e" name="alternativa" value="${quiz.perguntas[pergunta].alternativas[4]}"/>
                    <div>
                        <span>E</span>
                        ${quiz.perguntas[pergunta].alternativas[4]}
                    </div>
                </label>
            </form>

            <button>Responder</button>
        </section>
    `;
   
}


function guardar_resposta(evento) {
   

    resposta = evento.target.value;
    id_input_resposta = evento.target.id;

    const btn_enviar = document.querySelector(".alternativas button");
    btn_enviar.addEventListener("click", validar_reposta);
    
}

function validar_reposta() {
    const btn_enviar = document.querySelector(".alternativas button");

    btn_enviar.innerText = "Próxima";
    btn_enviar.removeEventListener("click", validar_reposta);

    // Verifica se é a última pergunta
    if (pergunta === quiz.perguntas.length - 1) {
        btn_enviar.innerText = "Finalizar";
        btn_enviar.addEventListener("click", finalizar);
    } else {
        btn_enviar.addEventListener("click", proxima_pergunta);
    }

    // Verifica se a resposta está correta
    if (resposta === quiz.perguntas[pergunta].correct) {
        document.querySelector(`label[for='${id_input_resposta}']`).setAttribute("id", "certo");
        pontos += 1;
        playCorrectSound();
    } else {
        document.querySelector(`label[for='${id_input_resposta}']`).setAttribute("id", "errado");
        playWrongSound();

        const correctAnswer = quiz.perguntas[pergunta].correct;
        const correctAnswerIndex = quiz.perguntas[pergunta].alternativas.indexOf(correctAnswer);
        const correctAnswerLabel = document.querySelector(`label[for='alternativa-${String.fromCharCode(97 + correctAnswerIndex)}']`); 
        correctAnswerLabel.setAttribute("id", "correto");
    }
    const input_resposta = document.querySelectorAll(".alternativas input");
    input_resposta.forEach(input => {
        input.disabled = true; // Desabilita o input
    });

    // Avança para a próxima pergunta
    pergunta += 1;
}

function finalizar() {
    localStorage.setItem("pontos", pontos);
    music.pause();
    window.location.href = "../resultado/resultado.html"; // Redireciona para a página de resultado
}

function proxima_pergunta() {
    montar_pergunta();
    adicionar_eventos_inputs();
}

function adicionar_eventos_inputs() {
    const input_resposta = document.querySelectorAll(".alternativas input");
    input_resposta.forEach(input => {
        input.addEventListener("click", guardar_resposta);
    });
}

async function iniciar() {
    music.play();
    await buscar_perguntas();
    montar_pergunta();
    adicionar_eventos_inputs();
    
}

// Inicia o quiz
iniciar();