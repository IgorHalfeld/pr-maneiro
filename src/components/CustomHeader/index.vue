<template>
  <header class="flex items-center justify-between">
    <div class="flex flex-col">
      <h1 class="text-2xl font-bold md:text-3xl text-brand-black">
        PR Maneiro <small class="px-2 py-1 text-sm font-light text-white rounded-full bg-brand-primary">v2.beta</small>
      </h1>
      <p class="text-sm font-medium md:text-base text-brand-black">
        Faça alguém feliz com um comentário no Pull Request.
      </p>
      <p class="text-sm font-small md:text-base text-brand-black">
        <a
          class="flex flex-row"
          href="https://github.com/IgorHalfeld/pr-maneiro"
          target="_blank"
          rel="noopener noreferrer"
        >
          <icon-github class="mr-1" />PR Maneiro
        </a>
      </p>
    </div>

    <div class="w-24">
      <img
        class="w-full"
        src="../../assets/icon.svg"
        alt="PR Maneiro logo"
      >
    </div>
  </header>
</template>

<script>
import IconGithub from '../IconGithub/index.vue'

export default {
  components: {
    IconGithub
  }
}
</script>
