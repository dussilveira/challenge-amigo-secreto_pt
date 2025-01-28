// O principal objetivo deste desafio é fortalecer suas habilidades em lógica de programação. Aqui você deverá desenvolver a lógica para resolver o problema.
// Desafio: Desenvolver uma aplicação de Amigo Secreto que permite adicionar amigos, sortear nomes e gerenciar o estado do sorteio.

// Inicializar Arrays
// Criar arrays para armazenar os nomes dos amigos e os nomes sorteados.
// Array que armazena os nomes dos amigos participantes do Amigo Secreto.
let amigos = [];

// Array que mantém registro dos amigos que já foram sorteados, evitando repetições.
let sorteados = [];


// Função para Adicionar Amigo:
// Criar a função adicionarAmigo para adicionar novos amigos à lista.
// A função deve validar o nome, capitalizar a primeira letra e atualizar a lista de amigos na interface.

function adicionarAmigo() {
    const input = document.getElementById('amigo');
    const nome = input.value.trim();

    if (!nomeValido(nome)) {
        alert('Por favor, insira um nome válido.');
        return;
    }

    const nomeCapitalizado = capitalizarPrimeiraLetra(nome);
    amigos.push(nomeCapitalizado);
    atualizarLista();
    input.value = '';
    input.focus();
}

// Função para Validar Nome:
// Criar a função nomeValido para verificar se o nome não está vazio e não é numérico.

function nomeValido(nome) {
    return nome !== '' && isNaN(nome);
}

// Criar uma Função para Capitalizar a Primeira Letra:
// Crie a função capitalizarPrimeiraLetra para padronizar os nomes dos amigos.

function capitalizarPrimeiraLetra(nome) {
    return nome.charAt(0).toUpperCase() + nome.slice(1).toLowerCase();
}

// Função para Atualizar a Lista de Amigos:
// Criar a função atualizarLista para atualizar a visualização da lista de amigos na interface.

function atualizarLista() {
    const lista = document.getElementById('listaAmigos');
    lista.innerHTML = '';

    amigos.forEach((amigo, index) => {
        const li = document.createElement('li');
        li.textContent = `${amigo}${index < amigos.length - 1 ? ', ' : ''}`;
        lista.appendChild(li);
    });
}


