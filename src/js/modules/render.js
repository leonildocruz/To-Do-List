// src/js/modules/render.js
export function renderizarNaTela(elementoUl, listaDeTarefas) {
  elementoUl.innerHTML = "" // Limpa a tela antes de redesenhar

  listaDeTarefas.forEach((tarefa, index) => {
    const li = document.createElement("li")

    // Injeta o texto e guarda o index no atributo data-index
    li.innerHTML = `
            <p>${tarefa}</p>
            <div class="btn-tarefas">
              <span class="btn-check" data-index="${index}">✅</span>
              <span class="btn-edit" data-index="${index}">✏️</span>
              <span class="btn-remover" data-index="${index}">❌</span>
            </div>
        `

    elementoUl.appendChild(li)
  })
}
