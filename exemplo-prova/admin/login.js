// Se não fez login, volta para a página inicial
if (sessionStorage.getItem(`logado`) !== `sim`) {
    window.location.href = `../index.html`;
}

document.addEventListener(`DOMContentLoaded`, () => {
    const btnLogout = document.getElementById(`logout`);
    btnLogout.addEventListener(`click`, evento => {
        evento.preventDefault();
        sessionStorage.removeItem(`logado`);
        window.location.href = `../index.html`;
    });
});
