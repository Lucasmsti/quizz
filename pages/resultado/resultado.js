
function inserir_resultado() {
    const section_pontuacao = document.querySelector(".pontuacao");

    const pontos = localStorage.getItem("pontos");

    section_pontuacao.innerHTML = `
        <span>${pontos}</span>
        <p>de 10</p>
    `;
};

inserir_resultado();