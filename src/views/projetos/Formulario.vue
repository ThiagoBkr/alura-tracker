<template>
    <section>
        <form @submit.prevent="salvar">
            <div class="field">
                <label for="nomeDoProjeto" class="label">
                    Nome do Projeto
                </label>
                <input type="text" class="input" v-model="nomeDoProjeto" id="nomedoProjeto" />
            </div>
            <div class="field">
                <button class="button" type="submit">
                    Salvar
                </button>
            </div>
        </form>
    </section>

</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useStore } from "@/store";
import { ALTERA_PROJETO, ADICIONA_PROJETO, NOTIFICAR } from "@/store/tipo-mutacoes";
import { TipoNotificacao } from "@/Interfaces/INotificacao";

export default defineComponent({
    name: 'Formulario',
    props: {
        id: {
            type: String
        }
    },
    mounted() {
        if (this.id) {
            const projeto = this.store.state.projetos.find(proj => proj.id == this.id)
            this.nomeDoProjeto = projeto?.nome || ''
        }
    },
    data() {
        return {
            nomeDoProjeto: "",
        }
    },
    methods: {
        salvar() {
            if (this.id) {
                this.store.commit(ALTERA_PROJETO, {
                    id: this.id,
                    nome: this.nomeDoProjeto
                })
            } else {
                this.store.commit(ADICIONA_PROJETO, this.nomeDoProjeto)
            }
            this.nomeDoProjeto = "";
            this.store.commit(NOTIFICAR, {
                titulo: 'projeto salvo',
                texto: 'salvou um projeto hein fera. NICE',
                tipo: TipoNotificacao.SUCESSO
            })
            this.$router.push('/projetos')

        }
    },
    setup() {
        const store = useStore()
        return {
            store
        }
    }
})
</script>

