<template>
  <footer class="text-sm font-small md:text-base text-brand-black bg-gray-200">
    <!-- github -->
    <a
      class="flex flex-row"
      href="https://github.com/IgorHalfeld/pr-maneiro"
      target="_blank"
      rel="noopener noreferrer"
    >
      <icon-github class="github" />
    </a>

    <!-- twitter -->
    <a
      class="flex flex-row"
      href="https://twitter.com/igorhalfeld"
      target="_blank"
      rel="noopener noreferrer"
    >
      <icon-twitter class="twitter" />
    </a>

    <!-- blog -->
    <a
      class="flex flex-row"
      href="https://igorluiz.me/"
      target="_blank"
      rel="noopener noreferrer"
    >
      <icon-blog class="blog" />
    </a>

    <!-- instagram -->
    <a
      class="flex flex-row"
      href="https://www.instagram.com/igor.halfeld/"
      target="_blank"
      rel="noopener noreferrer"
    >
      <icon-instagram class="instagram" />
    </a>

    <!-- youtube -->
    <a
      class="flex flex-row"
      href="https://www.youtube.com/channel/UC0l5hTu-idkd4jfzyTzI1sw"
      target="_blank"
      rel="noopener noreferrer"
    >
      <icon-youtube class="youtube" />
    </a>

    <!-- twitch -->
    <a
      class="flex flex-row"
      href="https://www.twitch.tv/igorhalfeld"
      target="_blank"
      rel="noopener noreferrer"
    >
      <icon-twitch class="twitch" />
    </a>

    <!-- linkedin -->
    <a
      class="flex flex-row"
      href="https://www.linkedin.com/in/igorhalfeld/"
      target="_blank"
      rel="noopener noreferrer"
    >
      <icon-linkedin class="linkedin" />
    </a>
  </footer>
</template>

<script>
import IconGithub from '../IconGithub/index.vue'
import IconTwitter from '../IconTwitter/index.vue'
import IconYoutube from '../IconYoutube/index.vue'
import IconTwitch from '../IconTwitch/index.vue'
import IconBlog from '../IconBlog/index.vue'
import IconInstagram from '../IconInstagram/index.vue'
import IconLinkedin from '../IconLinkedIn/index.vue'

export default {
  components: {
    IconGithub,
    IconTwitter,
    IconTwitch,
    IconYoutube,
    IconBlog,
    IconInstagram,
    IconLinkedin
  }
}
</script>

<style scoped>
footer svg {
  width: 1.5rem;
  height: 1.5rem;
  margin-left: 1.5rem;
}

.github
.twitter
.youtube
.twitch
.linkedin
.blog,
.instagram {
  fill: #A8A8A8;
}

</style>
