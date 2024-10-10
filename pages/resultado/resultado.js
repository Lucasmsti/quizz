const btn_jogar_novamente = document.querySelector("main button");

btn_jogar_novamente.addEventListener("click", jogar_novamente);

function inserir_resultado() {
    const section_pontuacao = document.querySelector(".pontuacao");

    const pontos = localStorage.getItem("pontos");

    section_pontuacao.innerHTML = `
        <span>${pontos}</span>
        <p>de 10</p>
    `;
};

function jogar_novamente() {
    localStorage.removeItem("pontos");

    window.location.href = "../../index.html"
};


inserir_resultado();