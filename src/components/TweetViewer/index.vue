<template>
  <div class="flex items-center py-5">
    <icon-chevron-left class="mr-5" />

    <div class="flex flex-col items-center w-full">
      <div
        ref="tweetRef"
        class="tweet"
      >
        <div class="flex items-center tweet-header">
          <div
            class="header-image"
            :style="{
              backgroundImage: `url(${tweet.image})`
            }"
          />
          <div class="flex flex-col header-info">
            <h3 class="flex items-center -mb-1 text-lg font-bold">
              {{ tweet.name }}
              <icon-verified />
            </h3>
            <p class="text-brand-gray">
              @{{ tweet.username }}
            </p>
          </div>
          <span class="water-mark">@igorhalfeld/pr-maneiro</span>
        </div>
        <div class="tweet-body">
          {{ tweet.msg }}
        </div>
        <div class="tweet-label">
          {{ state.date }} ·
          <a
            href="https://help.twitter.com/en/using-twitter/how-to-tweet#source-labels"
          >
            Twitter for iPhone
          </a>
        </div>
        <div class="flex tweet-analytics">
          <span>
            <strong>424.3k</strong>
            Retweets
          </span>
          <span>
            <strong>998.9k</strong>
            Likes
          </span>
        </div>
        <div class="flex justify-around tweet-actions">
          <icon-reply />
          <icon-retweet />
          <icon-like />
          <icon-share />
        </div>
      </div>
      <p class="mt-10 text-brand-gray">
        *Use as setas do teclado para explorar os templates
      </p>
    </div>

    <icon-chevron-right class="ml-5" />
  </div>
</template>

<script lang="ts">
import { defineComponent, watch, reactive, ref, onMounted } from 'vue'
import IconVerified from '../IconVerified/index.vue'
import IconReply from '../IconReply/index.vue'
import IconRetweet from '../IconRetweet/index.vue'
import IconLike from '../IconLike/index.vue'
import IconShare from '../IconShare/index.vue'
import IconChevronLeft from '../IconChevronLeft/index.vue'
import IconChevronRight from '../IconChevronRight/index.vue'
import { Person } from '@/types'
import { getCurrentTimeFormated } from '../../utils/date'

type Props = {
  tweet: Person;
  search: string;
}

export default defineComponent({
  components: {
    IconVerified,
    IconReply,
    IconRetweet,
    IconLike,
    IconShare,
    IconChevronRight,
    IconChevronLeft
  },
  emits: ['tweet-update'],
  props: {
    tweet: {
      type: Object as () => Props['tweet'],
      default: null
    },
    search: {
      type: String as () => Props['search'],
      default: ''
    }
  },
  setup (props: Props, { emit }) {
    const tweetRef = ref(null)
    const state = reactive({
      date: getCurrentTimeFormated()
    })

    watch(() => props.search, () => {
      emit('tweet-update', tweetRef)
    })

    onMounted(() => {
      emit('tweet-update', tweetRef)
    })

    return { state, tweetRef }
  }
})
</script>

<style scoped>
.tweet {
  width: 100%;
  height: auto;
  padding: 15px;
  border: 1px solid #f4f4f4;
  transition: background-color 0.2s ease;
  box-shadow: 0px 39px 72px rgba(0, 0, 0, 0.16);
  background-color: white;
}

.header-image {
  width: 49px;
  height: 49px;
  overflow: hidden;
  border-radius: 50%;
  background-size: cover;
  background-position: center;
}
.header-image > img {
  width: 100%;
}

.header-info {
  margin-left: 10px;
}
.header-info > h3 {
  color: var(--color-text1);
}

.water-mark {
  flex: 1;
  opacity: 0.2;
  text-align: end;
}

.tweet-body {
  padding: 10px 0;
  line-height: 1.3125;
  font-size: 23px;
  color: var(--color-text1);
}

.tweet-analytics span {
  color: var(--color-text2);
}

.tweet-actions {
  padding: 15px 0px;
}

.tweet-label {
  padding: 10px 0;
  color: var(--color-text2);
}
.tweet-label > a {
  color: var(--color-twitter);
  text-decoration: none;
}
.tweet-label > a:hover {
  text-decoration: underline;
}

.tweet-analytics {
  padding: 15px 0;
  border-top: 1px solid var(--color-grey);
  border-bottom: 1px solid var(--color-grey);
}

.tweet-analytics span:last-child {
  margin-left: 15px;
}
.tweet-analytics span {
  color: var(--color-text2);
}
.tweet-analytics span strong {
  color: var(--color-text1);
}
.dark-mode .tweet-analytics span strong {
  color: var(--color-text-dark-mode);
}
</style>
