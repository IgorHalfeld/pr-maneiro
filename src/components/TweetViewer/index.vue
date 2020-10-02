<template>
  <div class="flex items-center py-5 pr-20">
    <icon-chevron-left class="mr-5" />

    <div class="tweet">
      <div class="flex items-center tweet-header">
        <div
          class="header-image"
          style="background-image: url('https://lh3.googleusercontent.com/proxy/rPxG6uFxACntHFkrcc7r47pBDro3eqZhacujb5UPjl79gsxTATrqSfNS-UNyonk9vBGMbGnCrbqenUonQ_hGtacyQMjYjGnA5xDA57NDN0WLGu8rt748TA');"
        />
        <div class="flex flex-col header-info">
          <h3 class="flex items-center text-lg font-bold">
            Igor
            <icon-verified />
          </h3>
          <p class="text-brand-gray">
            @igorhalfeld
          </p>
        </div>
        <span class="water-mark">@IgorHalfeld/pr-maneiro</span>
      </div>
      <div class="tweet-body">
        {{ currentTweet }}
      </div>
      <div class="tweet-label">
        July 16, 2020 ·
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

    <icon-chevron-right class="ml-5" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import IconVerified from '../IconVerified/index.vue'
import IconReply from '../IconReply/index.vue'
import IconRetweet from '../IconRetweet/index.vue'
import IconLike from '../IconLike/index.vue'
import IconShare from '../IconShare/index.vue'
import IconChevronLeft from '../IconChevronLeft/index.vue'
import IconChevronRight from '../IconChevronRight/index.vue'

type Props = {
  currentTweet: string;
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
  props: {
    currentTweet: {
      type: String as () => Props['currentTweet'],
      default: null
    }
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
