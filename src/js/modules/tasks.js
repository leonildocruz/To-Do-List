// src/js/modules/tasks.js
export function adicionarNoArray(tarefas, novoTexto) {
  // Retorna um novo array contendo todos os itens antigos + o novo texto
  return [...tarefas, novoTexto]
}

export function removerDoArray(tarefas, indexAlvo) {
  // Remove o item baseado no index usando filter
  return tarefas.filter((_, index) => index !== indexAlvo)
}
