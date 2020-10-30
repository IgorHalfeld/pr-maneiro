<template>
  <div class="relative flex flex-col w-full">
    <div class="flex w-full">
      <input
        ref="input"
        v-model="state.search"
        type="text"
        class="w-full p-3 border-0 outline-none rounded-md focus:outline form-input"
        placeholder="Busque um template. ex: neymar"
        @input="handleInput"
      >
    </div>

    <div
      v-if="state.completeIsOpen"
      class="absolute top-0 left-0 flex flex-col w-full mt-10 bg-white dark:bg-gray-600 rounded-bl-md rounded-br-md animated fadeIn faster"
    >
      <div
        v-for="(person, index) in state.persons"
        :key="person.name"
        :class="{
          'mt-3': !index
        }"
        class="flex flex-col px-5 py-2 font-medium text-left text-gray-600 dark:text-white cursor-pointer text-md"
        @click="() => handleAutoCompleteClick(person)"
      >
        {{ person.name }}
        <span class="text-sm text-gray-500 dark:text-gray-100 font-lightitalic">@{{ person.username }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { Person } from '../../types'
import { Persons } from '../../utils/persons'

type State = {
  persons: Person[];
  search: string;
  completeIsOpen: boolean;
}

export default defineComponent({
  emits: ['item-click'],
  setup (_, { emit }) {
    const persons: Person[] = Object.values(Persons)
    const state = reactive<State>({
      persons,
      search: '',
      completeIsOpen: false
    })

    function handleInput () {
      if (state.search.length) {
        const key = new RegExp(state.search, 'ig')
        state.persons = persons.filter(p => key.test(p.name))
        state.completeIsOpen = true

        return
      }
      state.completeIsOpen = false
    }

    function handleAutoCompleteClick (item: Person) {
      state.search = item.name
      state.completeIsOpen = false
      emit('item-click', item)
    }

    return {
      state,
      handleInput,
      handleAutoCompleteClick
    }
  }
})
</script>
