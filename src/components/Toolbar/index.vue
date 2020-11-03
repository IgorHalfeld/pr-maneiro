<template>
  <aside class="flex flex-col p-5 rounded bg-brand-secondary dark:bg-gray-700">
    <label class="block">
      <span class="text-lg font-semibold text-gray-700 dark:text-brand-secondary">Coloque seu tweet 😍</span>
      <textarea
        v-model="state.text"
        class="block w-full mt-1 text-gray-700 border-0 form-input"
        placeholder="Mensagem aqui.."
      />
    </label>

    <div class="flex flex-col mt-6">
      <switch-box
        :checked="{ value: Source.iphone, label: 'iPhone' }"
        :unchecked="{ value: Source.android, label: 'Android' }"
        :value="state.source"
        @change="state.source = $event"
      />
    </div>

    <label class="block mt-6">
      <span class="text-lg font-semibold text-gray-700 dark:text-brand-secondary">Template</span>
      <template-auto-complete
        class="block w-full mt-1"
        @item-click="handleTweetSelect"
      />
    </label>

    <div class="flex flex-col items-center mt-6">
      <div>
        <button
          class="px-8 py-3 text-lg font-bold text-white uppercase rounded bg-brand-primary dark:bg-brand-accent focus:outline-none"
          @click="handleCopy"
        >
          {{ state.copyLabel }}
        </button>
      </div>
      <span class="font-light text-brand-gray dark:text-brand-secondary">ou</span>
      <div>
        <button
          class="font-bold text-brand-gray dark:text-brand-secondary focus:outline-none"
          @click="handleDownload"
        >
          baixe a imagem
        </button>
      </div>
    </div>
  </aside>
</template>

<script lang="ts">
import { defineComponent, reactive, watch } from 'vue'
import { setCurrentTweet } from '../../store'
import { Person, Source } from '../../types'
import { Persons } from '../../utils/persons'
import TemplateAutoComplete from '../TemplateAutoComplete/index.vue'
import SwitchBox from '../SwitchBox/index.vue'

type State = {
  persons: Person[];
  copyLabel: string;
  text: string;
  source: Source;
}

export default defineComponent({
  components: { TemplateAutoComplete, SwitchBox },
  emits: ['tweet-message-change', 'tweet-source-change', 'template-change', 'copy', 'download'],
  setup (_, { emit }) {
    const state = reactive<State>({
      text: '',
      copyLabel: 'copiar',
      persons: Object.values(Persons),
      source: Source.iphone
    })

    watch(() => state.text, () => {
      emit('tweet-message-change', state.text)
    })

    watch(() => state.source, () => {
      emit('tweet-source-change', state.source)
    })

    function handleTweetSelect (person: Person): void {
      emit('template-change', person)
    }

    function handleDownload (): void {
      emit('download')
    }

    function handleCopy () {
      emit('copy')
      state.copyLabel = 'Copiado 🔥'
      setTimeout(() => {
        state.copyLabel = 'Copiar'
      }, 1000)
    }

    return {
      state,
      handleCopy,
      handleDownload,
      setCurrentTweet,
      handleTweetSelect,
      Source
    }
  }
})
</script>
