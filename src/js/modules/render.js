// src/js/modules/render.js
export function renderizarNaTela(elementoUl, listaDeTarefas) {
  elementoUl.innerHTML = "" // Limpa a tela antes de redesenhar

  listaDeTarefas.forEach((tarefa, index) => {
    const li = document.createElement("li")

    // Injeta o texto e guarda o index no atributo data-index
    li.innerHTML = `
            <span>${tarefa}</span>
            <div class="btn-tarefas">
              <button class="btn-check btn-lista" data-index="${index}">✅</button>
              <button class="btn-edit btn-lista" data-index="${index}">✏️</button>
              <button class="btn-remover btn-lista" data-index="${index}">❌</button>
            </div>
        `

    elementoUl.appendChild(li)
  })
}
