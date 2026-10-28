const modalLogin = document.getElementById(`login`);
const formLogin = modalLogin.querySelector(`form`);
const btnFechar = document.getElementById(`btnFechar`);

// Usuário de exemplo (apenas para a aula, não é seguro para um site real)
const usuario = {
    email: `admin@email.com`,
    senha: `123456`
};

btnFechar.addEventListener(`click`, () => {
    limparErro();
    formLogin.reset();
    modalLogin.close();
});

formLogin.addEventListener(`submit`, evento => {
    evento.preventDefault();
    limparErro();

    const email = document.getElementById(`email`).value.trim();
    const senha = document.getElementById(`senha`).value;

    if (email === `` || senha === ``) {
        mostrarErro(`Preencha o e-mail e a senha.`);
        return;
    }

    if (email !== usuario.email || senha !== usuario.senha) {
        mostrarErro(`E-mail ou senha inválidos.`);
        return;
    }

    sessionStorage.setItem(`logado`, `sim`);
    window.location.href = `./admin/index.html`;
});

function mostrarErro(mensagem) {
    const erro = document.createElement(`p`);
    erro.classList.add(`erro`);
    erro.textContent = mensagem;
    formLogin.insertBefore(erro, formLogin.querySelector(`h2`).nextSibling);
}

function limparErro() {
    const erro = formLogin.querySelector(`p.erro`);
    if (erro) {
        erro.remove();
    }
}
