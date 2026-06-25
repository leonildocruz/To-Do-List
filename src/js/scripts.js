// src/js/script.js
import { buscarTarefasDoStorage, salvarTarefasNoStorage } from "./modules/storage.js"
import { campoEstaVazio } from "./modules/validation.js"
import { adicionarNoArray, removerDoArray, ordenarTarefas, aplicarFiltro } from "./modules/tasks.js"
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
const ordenar = document.querySelector("#ordenar")

let tarefas = buscarTarefasDoStorage()
renderizarNaTela(ulList, tarefas)
let indiceEmEdicao
let ordemAtual = "AZ"
let filtroAtual = "all"

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
  atualizarUI()
  // renderizarNaTela(ulList, tarefas)
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
  const elementoClocado = event.target
  if (!elementoClocado.classList.contains("btn-remover") && !elementoClocado.classList.contains("btn-edit") && !elementoClocado.classList.contains("btn-check")) {
    return
  }
  const id = Number(event.target.dataset.id)
  const indiceReal = tarefas.findIndex((tarefa) => tarefa.id === id)

  if (event.target.classList.contains("btn-remover")) {
    const novasTarefas = removerDoArray(tarefas, indiceReal)
    atualizarAplicacao(novasTarefas)
  }

  // Escutador do clique no ✏️ para editar
  if (event.target.classList.contains("btn-edit")) {
    indiceEmEdicao = indiceReal

    areaEditar.style.display = "block"
    inputEditar.value = tarefas[indiceReal].texto
    inputEditar.focus()
  }

  // Escutador do clique no ✅ para concluir
  if (event.target.classList.contains("btn-check")) {
    tarefas[indiceReal].concluida = !tarefas[indiceReal].concluida
    atualizarAplicacao(tarefas)
  }
})
ordenar.addEventListener("click", () => {
  ordemAtual = ordemAtual === "AZ" ? "ZA" : "AZ"
  atualizarUI()
})

function atualizarUI() {
  let lista = tarefas

  lista = aplicarFiltro(lista, filtroAtual)
  lista = ordenarTarefas(lista, ordemAtual)

  renderizarNaTela(ulList, lista)
}

filtrar.addEventListener("change", (event) => {
  filtroAtual = event.target.value
  atualizarUI()
})
