// src/js/script.js
import { buscarTarefasDoStorage, salvarTarefasNoStorage } from "./modules/storage.js"
import { campoEstaVazio } from "./modules/validation.js"
import { adicionarNoArray, removerDoArray } from "./modules/tasks.js"
import { renderizarNaTela } from "./modules/render.js"

const ulList = document.getElementById("list")
const input = document.getElementById("tarefa")
const btnAdicionar = document.getElementById("btn-adicionar")
const areaEditar = document.getElementById("editar-tarefa")
const inputEditar = document.getElementById("editar")
const btnEditar = document.getElementById("btn-editar")
const btnCancelarEditar = document.getElementById("btn-cancelar-edit")

let tarefas = buscarTarefasDoStorage()
let indiceEmEdicao = null
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

// Escutador do clique no botão adicionar
btnAdicionar.addEventListener("click", () => {
  adicionarTarefa()
})

// Escutador do clique no botão cancelar edição
btnCancelarEditar.addEventListener("click", () => {
  inputEditar.value = ""
  indiceEmEdicao = null
  input.focus()
  areaEditar.style.display = "none"
})

// Escutador do clique no botão editar
btnEditar.addEventListener("click", () => {
  const textoDaEdicao = inputEditar.value.trim()

  if (campoEstaVazio(textoDaEdicao)) {
    return
  }
  tarefas[indiceEmEdicao].texto = textoDaEdicao
  atualizarAplicacao(tarefas)

  inputEditar.value = ""
  indiceEmEdicao = null
  input.focus()
  areaEditar.style.display = "none"
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

  // Escutador do clique no ✏️ para editar
  if (event.target.classList.contains("btn-edit")) {
    const indexParaEditar = Number(event.target.getAttribute("data-index"))
    indiceEmEdicao = indexParaEditar
    areaEditar.style.display = "block"
    inputEditar.value = tarefas[indexParaEditar].texto
    inputEditar.focus()
  }
})
