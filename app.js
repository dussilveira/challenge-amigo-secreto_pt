// O principal objetivo deste desafio é fortalecer suas habilidades em lógica de programação. Aqui você deverá desenvolver a lógica para resolver o problema.
// Desafio: Desenvolver uma aplicação de Amigo Secreto que permite adicionar amigos, sortear nomes e gerenciar o estado do sorteio.

// Inicializar Arrays
// Criar arrays para armazenar os nomes dos amigos e os nomes sorteados.
// Array que armazena os nomes dos amigos participantes do Amigo Secreto.
let amigos = [];

// Array que mantém registro dos amigos que já foram sorteados, evitando repetições.
let sorteados = [];

// Objeto que salva o estado anterior do sorteio para possibilitar desfazer ações.
let estadoAnterior = {
    sorteados: [],
    resultado: ''
};

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

// Função para Limpar a Lista de Amigos:
// Criar a função limparLista para limpar a exibição da lista de amigos na interface.

function limparLista() {
    const lista = document.getElementById('listaAmigos');
    lista.innerHTML = '';
}

// Função para Sortear Amigo Secreto:
// Criar a função sortearAmigo para sortear aleatoriamente um amigo que ainda não foi sorteado.
// A função deve verificar se há amigos na lista, salvar o estado anterior, sortear um amigo e atualizar a interface.

function sortearAmigo() {
    if (amigos.length === 0) {
        alert('A lista de amigos está vazia.');
        return;
    }

    if (sorteados.length === amigos.length) {
        alert('Todos os amigos já foram sorteados.');
        reiniciarSorteio(); // Reinicia completamente o sorteio
        alert('O sorteio foi reiniciado. Por favor, realize um novo sorteio.');
        return;
    }

    // Salva o estado anterior ao sorteio
    estadoAnterior.sorteados = [...sorteados];
    estadoAnterior.resultado = document.getElementById('resultado').innerHTML;

    let indiceSorteado;
    let amigoSorteado;

    do {
        indiceSorteado = Math.floor(Math.random() * amigos.length);
        amigoSorteado = amigos[indiceSorteado];
    } while (sorteados.includes(amigoSorteado));

    sorteados.push(amigoSorteado);

    const resultado = document.getElementById('resultado');
    resultado.innerHTML = `O amigo secreto sorteado é: ${amigoSorteado}`;
}


// Função para Reiniciar Sorteio:
//Criar a função reiniciarSorteio para reiniciar completamente o sorteio, limpando listas e estados.

function reiniciarSorteio() {
    sorteados = [];
    amigos = [];
    estadoAnterior.sorteados = [];
    estadoAnterior.resultado = '';
    limparLista();
    document.getElementById('resultado').innerHTML = '';
}


// Função para Desfazer Sorteio:
// Criar a função desfazerSorteio para desfazer o último sorteio, restaurando o estado anterior.

function desfazerSorteio() {
    if (sorteados.length === 0) {
        alert('Não há sorteio para desfazer.');
        return;
    }

    // Restaura o estado anterior do sorteio
    sorteados = [...estadoAnterior.sorteados];
    document.getElementById('resultado').innerHTML = estadoAnterior.resultado;

    alert('O último sorteio foi desfeito.');
}

// Eventos de teclado

// Adicionar eventos de teclado interação com a Tecla Enter:
// Adicione um ouvinte de eventos para detectar a tecla Enter e chamar a função adicionarAmigo.

document.getElementById('amigo').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        adicionarAmigo();
    }
});


// Adicionar Ouvinte de Ctrl + Backspace:
// Adicione um ouvinte de eventos para detectar Ctrl + Backspace e chamar a função desfazerSorteio com confirmação.

document.addEventListener('keydown', function(event) {
    // Verifica se a tecla pressionada é Backspace e se a tecla Ctrl está sendo mantida
    if (event.key === 'Backspace' && event.ctrlKey) {
        event.preventDefault(); // Evita o comportamento padrão do Backspace
        
        // Verifica se há sorteios para desfazer
        if (sorteados.length > 0) {
            // Pede confirmação antes de desfazer
            if (confirm('Tem certeza que deseja desfazer o último sorteio?')) {
                desfazerSorteio(); // Chama a função para desfazer o sorteio
            }
        } else {
            alert('Não há sorteio para desfazer.');
        }
    }
});
