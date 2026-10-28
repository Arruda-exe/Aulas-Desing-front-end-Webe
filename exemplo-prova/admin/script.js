const form = document.getElementById(`formProduto`);
const tbody = document.querySelector(`#tabela tbody`);

// Produtos ficam salvos no navegador para não sumirem ao recarregar
let produtos = JSON.parse(localStorage.getItem(`produtos`)) || [];
let indiceEditando = null;

mostrarProdutos();

form.addEventListener(`submit`, evento => {
    evento.preventDefault();
    limparMensagem();

    const produto = {
        nome: form.nome.value.trim(),
        quantidade: form.quantidade.value,
        preco: form.preco.value.trim(),
        email: form.email.value.trim(),
        dataValidade: form.dataValidade.value,
        disponivel: form.disponivel.checked
    };

    if (produto.nome === `` || produto.quantidade === `` || produto.preco === ``) {
        mostrarMensagem(`Preencha nome, quantidade e preço.`, `erro`);
        return;
    }

    if (Number(produto.quantidade) < 1) {
        mostrarMensagem(`A quantidade deve ser maior que zero.`, `erro`);
        return;
    }

    if (isNaN(Number(produto.preco.replace(`,`, `.`)))) {
        mostrarMensagem(`O preço deve ser um número.`, `erro`);
        return;
    }

    if (indiceEditando === null) {
        produtos.push(produto);
        mostrarMensagem(`Produto cadastrado!`, `sucesso`);
    } else {
        produtos[indiceEditando] = produto;
        indiceEditando = null;
        form.querySelector(`button[type="submit"]`).textContent = `Cadastrar`;
        mostrarMensagem(`Produto atualizado!`, `sucesso`);
    }

    salvar();
    mostrarProdutos();
    form.reset();
});

form.addEventListener(`reset`, () => {
    indiceEditando = null;
    form.querySelector(`button[type="submit"]`).textContent = `Cadastrar`;
    limparMensagem();
});

function mostrarProdutos() {
    tbody.innerHTML = ``;

    produtos.forEach((produto, indice) => {
        const linha = document.createElement(`tr`);
        linha.innerHTML = `
            <td>${produto.nome}</td>
            <td>${produto.quantidade}</td>
            <td>R$ ${Number(produto.preco.replace(`,`, `.`)).toFixed(2).replace(`.`, `,`)}</td>
            <td>${produto.email}</td>
            <td>${formatarData(produto.dataValidade)}</td>
            <td>${produto.disponivel ? `Sim` : `Não`}</td>
            <td>
                <a href="#" onclick="editar(${indice}); return false;">Editar</a>
                <a href="#" onclick="excluir(${indice}); return false;">Excluir</a>
            </td>
        `;
        tbody.appendChild(linha);
    });
}

function editar(indice) {
    const produto = produtos[indice];
    form.nome.value = produto.nome;
    form.quantidade.value = produto.quantidade;
    form.preco.value = produto.preco;
    form.email.value = produto.email;
    form.dataValidade.value = produto.dataValidade;
    form.disponivel.checked = produto.disponivel;

    indiceEditando = indice;
    form.querySelector(`button[type="submit"]`).textContent = `Salvar`;
    limparMensagem();
}

function excluir(indice) {
    if (confirm(`Deseja excluir o produto "${produtos[indice].nome}"?`)) {
        produtos.splice(indice, 1);
        salvar();
        mostrarProdutos();
    }
}

function salvar() {
    localStorage.setItem(`produtos`, JSON.stringify(produtos));
}

function formatarData(data) {
    if (data === ``) {
        return `-`;
    }
    const [ano, mes, dia] = data.split(`-`);
    return `${dia}/${mes}/${ano}`;
}

function mostrarMensagem(texto, tipo) {
    const mensagem = document.createElement(`p`);
    mensagem.classList.add(tipo);
    mensagem.textContent = texto;
    form.prepend(mensagem);
}

function limparMensagem() {
    const mensagem = form.querySelector(`p.erro, p.sucesso`);
    if (mensagem) {
        mensagem.remove();
    }
}
