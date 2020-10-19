<template>
  <custom-header class="w-full px-4 md:px-12 py-5 mx-auto xl:w-3/5" />

  <main class="flex flex-col items-center justify-center w-full px-4 md:px-12 py-5">
    <div class="self-center w-full xl:w-3/5 grid grid-cols-12">
      <tweet-viewer
        class="col-span-12 md:col-span-8 md:mr-20"
        :tweet="state.currentTweet"
        :search="state.search"
        @tweet-update="handleTweetUpdate"
        @next="nextTweet"
        @previous="previousTweet"
      />
      <toolbar
        class="col-span-12 md:col-span-4"
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
import { gsap } from 'gsap'
import CustomHeader from './components/CustomHeader/index.vue'
import TweetViewer from './components/TweetViewer/index.vue'
import Toolbar from './components/Toolbar/index.vue'
import { useStore, setCurrentTweet, setTweetRef, setSearch } from './store'
import { Person, Win, GSAP } from './types'
import { Persons } from './utils/persons'
import { buildCopyFn, buildDownloadFn } from './utils/domtoimage'

interface AnimationHooks {
  onExitFinish(): void;
}
const getHooksDefault = (): AnimationHooks => ({ onExitFinish: () => ({}) })

const ARROW_RIGHT = 39
const ARROW_LEFT = 37

const copy = buildCopyFn(window as unknown as Win)
const download = buildDownloadFn(document)

function buildPreviousAnimateFn (g: GSAP) {
  return (tweet: Ref, hooks?: AnimationHooks): void => {
    const { onExitFinish } = hooks ?? getHooksDefault()

    g.to(tweet, {
      duration: 0.3,
      ease: 'sine.out',
      css: {
        opacity: 0,
        marginRight: '-200px'
      },
      onComplete () {
        onExitFinish()

        const from = { opacity: 0, marginRight: '200px' }
        const to = {
          duration: 0.3,
          ease: 'sine.out',
          css: { opacity: 1, marginRight: '0px' }
        }
        g.fromTo(tweet, from, to)
      }
    })
  }
}

function buildNextAnimateFn (g: GSAP) {
  return (tweet: Ref, hooks?: AnimationHooks): void => {
    const { onExitFinish } = hooks ?? getHooksDefault()

    g.to(tweet, {
      duration: 0.3,
      ease: 'sine.out',
      css: {
        opacity: 0,
        marginLeft: '-200px'
      },
      onComplete () {
        onExitFinish()

        const from = { opacity: 0, marginLeft: '200px' }
        const to = {
          duration: 0.3,
          ease: 'sine.out',
          css: { opacity: 1, marginLeft: '0px' }
        }
        g.fromTo(tweet, from, to)
      }
    })
  }
}

const animatePrevious = buildPreviousAnimateFn(gsap)
const animateNext = buildNextAnimateFn(gsap)

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
      currentIndex = currentIndex >= persons.length - 1 ? 0 : currentIndex += 1
      const tweet = persons[currentIndex]
      animateNext(store.tweetRef, {
        onExitFinish: () => setCurrentTweet(tweet)
      })
    }

    function previousTweet (): void {
      currentIndex = currentIndex <= 0 ? persons.length - 1 : currentIndex -= 1
      const tweet = persons[currentIndex]
      animatePrevious(store.tweetRef, {
        onExitFinish: () => setCurrentTweet(tweet)
      })
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

    function handleTouch (event: TouchEvent): void {
      const width = event?.view?.innerWidth || 0
      const touched = event?.targetTouches[0]
      touched?.clientX > width / 2 ? nextTweet() : previousTweet()
    }

    onMounted(() => {
      window.addEventListener('keyup', handleKeyup)

      store.tweetRef.addEventListener('touchstart', handleTouch, false)
    })

    onUnmounted(() => {
      window.removeEventListener('keyup', handleKeyup)

      store.tweetRef.removeEventListener('touchstart', handleTouch, false)
    })

    return {
      state: store,
      handleTweetMessageChange,
      handleTemplateChange,
      handleTweetUpdate,
      handleDownload,
      handleCopy,
      nextTweet,
      previousTweet
    }
  }
})
</script>
