<template>
  <main class="relative flex flex-col items-center justify-center w-full h-full px-12 py-5">
    <custom-header class="absolute top-0 w-3/5 px-12 py-5 mx-auto" />

    <div class="self-center w-3/5 grid grid-cols-12">
      <tweet-viewer
        class="col-span-8"
        :tweet="state.currentTweet"
        :search="state.search"
        @tweet-update="handleTweetUpdate"
      />
      <toolbar
        class="col-span-4"
        @tweet-message-change="handleTweetMessageChange"
        @template-change="handleTemplateChange"
        @copy="handleCopy"
        @download="handleDownload"
      />
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted, Ref } from 'vue'
import CustomHeader from './components/CustomHeader/index.vue'
import TweetViewer from './components/TweetViewer/index.vue'
import Toolbar from './components/Toolbar/index.vue'
import { useStore, setCurrentTweet, setTweetRef, setSearch } from './store'
import { Person, Win } from './types'
import { Persons } from './utils/persons'
import { buildCopyFn, buildDownloadFn } from './utils/domtoimage'

const ARROW_RIGHT = 39
const ARROW_LEFT = 37

const copy = buildCopyFn(window as unknown as Win)
const download = buildDownloadFn(document)

export default defineComponent({
  components: {
    CustomHeader,
    TweetViewer,
    Toolbar
  },
  setup () {
    const persons = Object.values(Persons)
    const store = useStore()
    let currentIndex = 0

    function nextTweet (): void {
      if (currentIndex >= (persons.length - 1)) {
        return
      }
      currentIndex += 1
      const tweet = persons[currentIndex]
      setCurrentTweet(tweet)
    }

    function previousTweet (): void {
      if (currentIndex <= 0) {
        return
      }
      currentIndex -= 1
      const tweet = persons[currentIndex]
      setCurrentTweet(tweet)
    }

    function handleKeyup (event: KeyboardEvent): void {
      const code = event.keyCode
      if (code === ARROW_RIGHT) {
        nextTweet()
      }

      if (code === ARROW_LEFT) {
        previousTweet()
      }
    }

    function handleTweetUpdate (ref: Ref): void {
      setTweetRef(ref)
    }

    async function handleCopy (): Promise<void> {
      await copy(store.tweetRef)
    }

    async function handleDownload (): Promise<void> {
      await download(store.tweetRef)
    }

    function handleTweetMessageChange (msg: string): void {
      const tweet = { ...store.currentTweet }

      if (msg.length) {
        tweet.msg = msg
      } else {
        const match = persons.find(p => p.username === tweet.username)
        tweet.msg = match?.msg ?? msg
      }

      setSearch(tweet.msg)
      setCurrentTweet(tweet)
    }

    function handleTemplateChange (template: Person): void {
      setCurrentTweet(template)
    }

    onMounted(() => {
      window.addEventListener('keyup', handleKeyup)
    })

    onUnmounted(() => {
      window.removeEventListener('keyup', handleKeyup)
    })

    return {
      state: store,
      handleTweetMessageChange,
      handleTemplateChange,
      handleTweetUpdate,
      handleDownload,
      handleCopy
    }
  }
})
</script>
