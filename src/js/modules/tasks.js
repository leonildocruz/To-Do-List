// src/js/modules/tasks.js
export function adicionarNoArray(tarefas, novoTexto) {
  const novaTarefa = {
    id: Date.now(),
    texto: novoTexto,
    concluida: false,
  }
  // Retorna um novo array contendo todos os itens antigos + o novo texto
  return [novaTarefa, ...tarefas]
}

export function removerDoArray(tarefas, indexAlvo) {
  // Remove o item baseado no index usando filter
  return tarefas.filter((_, index) => index !== indexAlvo)
}

export function ordenarTarefas(tarefas, ordemAtual) {
  return [...tarefas].sort((a, b) => {
    return ordemAtual === "AZ" ? a.texto.localeCompare(b.texto) : b.texto.localeCompare(a.texto)
  })
}

export function aplicarFiltro(tarefas, filtroAtual) {
  if (filtroAtual === "done") {
    return tarefas.filter((e) => e.concluida === true)
  } else if (filtroAtual === "todo") {
    return tarefas.filter((e) => e.concluida === false)
  }
  return tarefas
}

export function pesquisarTarefas(tarefas, textoPesquisa) {
  const textoMinusculo = textoPesquisa.toLowerCase()

  return tarefas.filter((tarefa) => {
    const tarefaMinuscula = tarefa.texto.toLowerCase()
    return tarefaMinuscula.includes(textoMinusculo)
  })
}
