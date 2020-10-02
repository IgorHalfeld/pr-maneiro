<template>
  <main class="flex flex-col w-full h-full px-12 py-5">
    <custom-header />

    <div class="mt-10 grid grid-cols-12">
      <tweet-viewer
        :current-tweet="state.currentTweet"
        class=" col-span-8"
      />
      <toolbar class="col-span-4" />
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import CustomHeader from './components/CustomHeader/index.vue'
import TweetViewer from './components/TweetViewer/index.vue'
import Toolbar from './components/Toolbar/index.vue'
import { useStore } from './store'

export default defineComponent({
  components: {
    CustomHeader,
    TweetViewer,
    Toolbar
  },
  setup () {
    const store = useStore()

    return {
      state: store
    }
  }
})
</script>
