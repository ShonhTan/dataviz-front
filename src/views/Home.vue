<template>
  <section class="section home">
    <svg class="home__bg-item home__bg-item--1"><use xlink:href="#home-bg"/></svg>
    <svg class="home__bg-item home__bg-item--2"><use xlink:href="#home-bg-2"/></svg>

    <div class="home__center">
      <h1 class="home__logo">Logo</h1>
      <p class="home__text">As humans, we sure areproducting a lot  of food to sustain our need.<br>But have you everwondered what it tells us about our world ?</p>
      <button class="home__start-button"
              @click="start">Start</button>
    </div>
  </section>
</template>

<script>
export default {
  methods: {
    start () {
      this.$emit('toDataviz')
    }
  }
}
</script>