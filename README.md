### **Descrição do desafio:**
**Amigo Secreto**

Neste desafio, você desenvolverá uma aplicação que permita aos usuários inserir nomes de amigos em uma lista para, em seguida, realizar um sorteio aleatório e determinar quem é o "*amigo secreto*".

O usuário deverá adicionar nomes por meio de um campo de texto e de um botão "Adicionar".

Os nomes inseridos serão exibidos em uma lista visível na página, e ao finalizar, um botão "Sortear Amigo" selecionará um dos nomes de forma aleatória, exibindo o resultado na tela.

### **Funcionalidades Requeridas:**

**Adicionar nomes:** Os usuários escreverão o nome de um amigo em um campo de texto e o adicionarão a uma lista visível ao clicar em "Adicionar".

**Validar entrada:** Se o campo de texto estiver vazio, o programa exibirá um alerta solicitando um nome válido.

**Visualizar a lista:** Os nomes inseridos aparecerão em uma lista abaixo do campo de entrada.

**Sorteio aleatório:** Ao clicar no botão "Sortear Amigo", um nome da lista será selecionado aleatoriamente e exibido na página.


Vamos verificar se todas as funcionalidades descritas foram atendidas no código:

### **Funcionalidades Verificadas:**

1. **Adicionar nomes:**
   - **Descrição:** Os usuários escreverão o nome de um amigo em um campo de texto e o adicionarão a uma lista visível ao clicar em "Adicionar".
   - **Código Verificado:**
     ```javascript
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
     ```

2. **Validar entrada:**
   - **Descrição:** Se o campo de texto estiver vazio, o programa exibirá um alerta solicitando um nome válido.
   - **Código Verificado:**
     ```javascript
     function nomeValido(nome) {
         return nome !== '' && isNaN(nome);
     }

     function adicionarAmigo() {
         const input = document.getElementById('amigo');
         const nome = input.value.trim();

         if (!nomeValido(nome)) {
             alert('Por favor, insira um nome válido.');
             return;
         }

         // Resto do código...
     }
     ```

3. **Visualizar a lista:**
   - **Descrição:** Os nomes inseridos aparecerão em uma lista abaixo do campo de entrada.
   - **Código Verificado:**
     ```javascript
     function atualizarLista() {
         const lista = document.getElementById('listaAmigos');
         lista.innerHTML = '';

         amigos.forEach((amigo, index) => {
             const li = document.createElement('li');
             li.textContent = `${amigo}${index < amigos.length - 1 ? ', ' : ''}`;
             lista.appendChild(li);
         });
     }

     function adicionarAmigo() {
         // Código para adicionar amigo...
         atualizarLista();
     }
     ```

4. **Sorteio aleatório:**
   - **Descrição:** Ao clicar no botão "Sortear Amigo", um nome da lista será selecionado aleatoriamente e exibido na página.
   - **Código Verificado:**
     ```javascript
     function sortearAmigo() {
         if (amigos.length === 0) {
             alert('A lista de amigos está vazia.');
             return;
         }

         if (sorteados.length === amigos.length) {
             alert('Todos os amigos já foram sorteados.');
             reiniciarSorteio();
             alert('O sorteio foi reiniciado. Por favor, realize um novo sorteio.');
             return;
         }

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
     ```

### **Verificação e Validação de Requisitos**

Todas as funcionalidades descritas foram implementadas e verificadas no código:

1. **Adicionar nomes:** Os nomes podem ser adicionados através do campo de texto e do botão "Adicionar".
2. **Validar entrada:** A entrada do nome é validada para garantir que não esteja vazia e não seja numérica.
3. **Visualizar a lista:** Os nomes são exibidos em uma lista visível na página.
4. **Sorteio aleatório:** Um nome é selecionado aleatoriamente ao clicar no botão "Sortear Amigo" e o resultado é exibido na tela.

O código atende aos requisitos do desafio e todas as funcionalidades esperadas estão implementadas corretamente.

Além das funcionalidades básicas descritas no desafio, o código implementa algumas funcionalidades extras que melhoram a experiência do usuário e a robustez da aplicação:

1. **Desfazer Sorteio:**
   - **Descrição:** Permite desfazer o último sorteio realizado, restaurando o estado anterior.
   - **Implementação:**
     ```javascript
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
     ```

2. **Reiniciar Sorteio:**
   - **Descrição:** Permite reiniciar completamente o sorteio quando todos os amigos já foram sorteados.
   - **Implementação:**
     ```javascript
     function reiniciarSorteio() {
         sorteados = [];
         amigos = [];
         estadoAnterior.sorteados = [];
         estadoAnterior.resultado = '';
         limparLista();
         document.getElementById('resultado').innerHTML = '';
     }
     ```

3. **Atalhos de Teclado:**
   - **Descrição:** Implementa atalhos de teclado para melhorar a usabilidade, como adicionar um amigo ao pressionar Enter e desfazer o último sorteio ao pressionar Ctrl + Backspace.
   - **Implementação:**
     ```javascript
     // Adiciona um listener ao campo de entrada 'amigo' para chamar 'adicionarAmigo' ao pressionar Enter.
     document.getElementById('amigo').addEventListener('keydown', function(event) {
         if (event.key === 'Enter') {
             adicionarAmigo();
         }
     });

     // Adiciona um ouvinte de eventos para detectar Ctrl + Backspace em todo o documento
     document.addEventListener('keydown', function(event) {
         if (event.key === 'Backspace' && event.ctrlKey) {
             event.preventDefault(); // Evita o comportamento padrão do Backspace
             
             if (sorteados.length > 0) {
                 if (confirm('Tem certeza que deseja desfazer o último sorteio?')) {
                     desfazerSorteio(); // Chama a função para desfazer o sorteio
                 }
             } else {
                 alert('Não há sorteio para desfazer.');
             }
         }
     });
     ```

4. **Capitalização Automática dos Nomes:**
   - **Descrição:** Automatiza a capitalização da primeira letra dos nomes inseridos, garantindo padronização.
   - **Implementação:**
     ```javascript
     function capitalizarPrimeiraLetra(nome) {
         return nome.charAt(0).toUpperCase() + nome.slice(1).toLowerCase();
     }
     ```

5. **Feedback Visual e Mensagens:**
   - **Descrição:** Exibe mensagens de alerta para feedback ao usuário, como notificações de entrada inválida, confirmação de sorteio, e quando não há sorteio para desfazer.
   - **Implementação:** Uso de `alert()` para fornecer feedback imediato ao usuário.
     ```javascript
     if (!nomeValido(nome)) {
         alert('Por favor, insira um nome válido.');
         return;
     }

     if (sorteados.length === amigos.length) {
         alert('Todos os amigos já foram sorteados.');
         reiniciarSorteio();
         alert('O sorteio foi reiniciado. Por favor, realize um novo sorteio.');
         return;
     }
     ```

Essas funcionalidades adicionais melhoram significativamente a experiência do usuário, adicionando recursos práticos e interativos ao aplicativo de sorteio de amigo secreto. Elas garantem uma aplicação mais robusta e amigável, proporcionando um uso mais intuitivo e satisfatório. Se tiver mais alguma questão ou precisar de mais detalhes, estou à disposição!

### **Conclusão**
Este exercício é uma oportunidade valiosa para desenvolver uma ampla gama de habilidades técnicas e boas práticas de programação, essenciais para qualquer desenvolvedor front-end.

Trabalhar com este código me ajudou a desenvolver uma base sólida em JavaScript e habilidades essenciais para a programação web, incluindo a interação com o DOM e a gestão de eventos.
O desafio é um ótimo para quem deseja aprimorar suas habilidades de desenvolvimento front-end. O desenvolvimento deste código trabalhou várias competências importantes, abrangendo tanto habilidades técnicas quanto de resolução de problemas.
Aqui estão algumas das principais competências envolvidas:

1. **Lógica de Programação:**
   - Estruturação de funções e uso de condicionais para tomar decisões no código.
   - Controle de fluxo, como loops (`forEach`) e condicionais (`if`).

2. **Manipulação de Arrays:**
   - Adição e verificação de elementos em arrays (`push`, `includes`).
   - Uso de métodos de array (`forEach`) para iterar e manipular dados.

3. **Gerenciamento de Estado:**
   - Manutenção do estado do sorteio usando variáveis (`amigos`, `sorteados`, `estadoAnterior`).
   - Salvamento e restauração de estados anteriores para permitir desfazer ações.

4. **Interação com o DOM:**
   - Manipulação de elementos HTML usando JavaScript (`getElementById`, `innerHTML`).
   - Atualização dinâmica da interface do usuário com dados provenientes do código.

5. **Validação de Entrada:**
   - Verificação de entradas do usuário para garantir que os dados sejam válidos (`nomeValido`).
   - Tratamento de erros e feedback ao usuário (`alert`).

6. **Eventos de Teclado:**
   - Captura de eventos de teclado (`keydown`).
   - Implementação de atalhos de teclado (Enter, Ctrl + Backspace) para melhorar a experiência do usuário.

7. **Funções e Modularização:**
   - Criação de funções reutilizáveis para realizar tarefas específicas (validação, atualização de lista, sorteio, desfazer sorteio).
   - Organização do código de forma modular e clara para facilitar a manutenção e legibilidade.

8. **Uso de Métodos de Array:**
   - Métodos como `push`, `includes`, `forEach` e `slice` foram utilizados para manipulação eficiente de arrays.

9. **Interatividade e UX:**
   - Desenvolvimento de uma interface interativa que responde às ações do usuário.
   - Implementação de feedback visual e notificações para guiar o usuário (mensagens de alerta).

10. **Boas Práticas de Codificação:**
    - Uso de comentários para explicar a funcionalidade e a lógica do código.
    - Manutenção de um código organizado e legível, com nomes de variáveis e funções descritivas.
