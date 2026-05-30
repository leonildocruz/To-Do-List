// src/js/script.js
import { buscarTarefasDoStorage, salvarTarefasNoStorage } from "./modules/storage.js"
import { campoEstaVazio } from "./modules/validation.js"
import { adicionarNoArray, removerDoArray } from "./modules/tasks.js"
import { renderizarNaTela } from "./modules/render.js"

const ulList = document.getElementById("list")
const input = document.getElementById("tarefa")
const btnAdicionar = document.getElementById("btn-adicionar")

let tarefas = buscarTarefasDoStorage()
renderizarNaTela(ulList, tarefas)

function adicionarTarefa() {
  const textoDaTarefa = input.value.trim()

  if (campoEstaVazio(textoDaTarefa)) {
    return
  }

  const novasTarefas = adicionarNoArray(tarefas, textoDaTarefa)
  atualizarAplicacao(novasTarefas)

  input.value = ""
  input.focus()
}

function atualizarAplicacao(novoArray) {
  tarefas = novoArray
  salvarTarefasNoStorage(tarefas)
  renderizarNaTela(ulList, tarefas)
}

// Escutador do clique no botão
btnAdicionar.addEventListener("click", () => {
  adicionarTarefa()
})

// Escutador do Enter no teclado
input.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    adicionarTarefa()
  }
})

// Escutador do clique no ❌ para remover
ulList.addEventListener("click", (event) => {
  if (event.target.classList.contains("btn-remover")) {
    const indexParaRemover = Number(event.target.getAttribute("data-index"))
    const novasTarefas = removerDoArray(tarefas, indexParaRemover)
    atualizarAplicacao(novasTarefas)
  }
})
