import IProjeto from "@/Interfaces/IProjeto"
import { InjectionKey } from "vue"
import { createStore, Store } from "vuex"
import { ADICIONA_TAREFA, ATUALIZA_TAREFA, REMOVE_TAREFA } from "./tipo-mutacoes"

interface State {
    projetos: IProjeto[],
    tarefas: ITarefa[],
  }
  
  export const key: InjectionKey<Store<State>> = Symbol()
  
  export const store = createStore<State>({
    state: {
      projetos: [],
      tarefas: []
    },
    mutations: {
      // mutations de projeto omitidos
      [ADICIONA_TAREFA] (state, tarefa: ITarefa) {
        tarefa.id = new Date().toISOString()
        state.tarefas.push(tarefa)
      },
      [ATUALIZA_TAREFA](state, tarefa: ITarefa) {
        const indice = state.tarefas.findIndex(p => p.id == tarefa.id)
        state.tarefas[indice] = tarefa
      },
      [REMOVE_TAREFA] (state, id: string) {
        state.projetos = state.projetos.filter(p => p.id != id)
      },
    }
  })
  
  // o campo id na ITarefa
  export default interface ITarefa {
    id: string
    duracaoEmSegundos: number
    descricao: string
    projeto?: IProjeto
  }