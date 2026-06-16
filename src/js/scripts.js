// src/js/script.js
import { buscarTarefasDoStorage, salvarTarefasNoStorage } from "./modules/storage.js"
import { campoEstaVazio } from "./modules/validation.js"
import { adicionarNoArray, removerDoArray } from "./modules/tasks.js"
import { renderizarNaTela } from "./modules/render.js"

const ulList = document.querySelector("#list")
const input = document.querySelector("#tarefa")
const btnAdicionar = document.querySelector("#btn-adicionar")
const areaEditar = document.querySelector("#editar-tarefa")
const inputEditar = document.querySelector("#editar")
const btnEditar = document.querySelector("#btn-editar")
const btnCancelarEditar = document.querySelector("#btn-cancelar-edit")
const listContainer = document.querySelector("#todo-list")
const filtrar = document.querySelector("#filter-select")

let tarefas = buscarTarefasDoStorage()
renderizarNaTela(ulList, tarefas)
let indiceEmEdicao = null

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

// Escutador do clique no botão cancelar edição
btnCancelarEditar.addEventListener("click", () => {
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
    const indexParaRemover = Number(event.target.dataset.index)
    const novasTarefas = removerDoArray(tarefas, indexParaRemover)
    atualizarAplicacao(novasTarefas)
  }

  // Escutador do clique no ✏️ para editar
  if (event.target.classList.contains("btn-edit")) {
    const indexParaEditar = Number(event.target.dataset.index)
    indiceEmEdicao = indexParaEditar
    areaEditar.style.display = "block"
    inputEditar.value = tarefas[indexParaEditar].texto
    inputEditar.focus()
  }

  // Escutador do clique no ✅ para concluir
  if (event.target.classList.contains("btn-check")) {
    const idexParaCheck = Number(event.target.dataset.index)

    tarefas[idexParaCheck].concluida = !tarefas[idexParaCheck].concluida
    atualizarAplicacao(tarefas)
  }
})

filtrar.addEventListener("change", (event) => {
  let listaParaExibir = tarefas

  if (event.target.value === "done") {
    listaParaExibir = tarefas.filter((e) => e.concluida === true)
  } else if (event.target.value === "todo") {
    listaParaExibir = tarefas.filter((e) => e.concluida === false)
  }
  renderizarNaTela(ulList, listaParaExibir)
})
