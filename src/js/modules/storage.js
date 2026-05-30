const CHAVE = "to-do-list"

export function buscarTarefasDoStorage() {
  // Retorna o array salvo ou um array vazio se não houver nada
  return JSON.parse(localStorage.getItem(CHAVE)) || []
}

export function salvarTarefasNoStorage(tarefas) {
  localStorage.setItem(CHAVE, JSON.stringify(tarefas))
}
