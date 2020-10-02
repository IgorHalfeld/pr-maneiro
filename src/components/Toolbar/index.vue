<template>
  <aside class="flex flex-col p-5 rounded bg-brand-secondary">
    <label class="block">
      <span class="text-lg font-semibold text-gray-700">Coloque seu tweet 😍</span>
      <textarea
        class="block w-full mt-1 text-gray-700 border-0 form-input"
        placeholder="Mensagem aqui.."
        @keyup="($event) => setCurrentTweet($event.target.value)"
      />
    </label>

    <label class="block mt-6">
      <span class="text-lg font-semibold text-gray-700">Template</span>
      <select class="block w-full mt-1 text-gray-700 border-0 form-select">
        <option>Neymar JR</option>
      </select>
    </label>

    <div class="flex flex-col items-center mt-10">
      <div>
        <button class="px-8 py-3 text-lg font-bold text-white uppercase rounded bg-brand-primary">
          copiar
        </button>
      </div>
      <span class="font-light text-brand-gray">ou</span>
      <div>
        <button class="font-bold text-brand-gray focus:outline-none">
          baixe a imagem
        </button>
      </div>
    </div>
  </aside>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { setCurrentTweet } from '../../store'

export default defineComponent({
  setup () {
    return {
      setCurrentTweet
    }
  }
})
</script>
