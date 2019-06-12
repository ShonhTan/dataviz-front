<template>
  <section class="section home">
    <svg class="home__bg-item home__bg-item--1"><use xlink:href="#home-bg"/></svg>
    <svg class="home__bg-item home__bg-item--2"><use xlink:href="#home-bg-2"/></svg>
    <!-- <svg class="home__bg-item home__bg-item--mobile"><use xlink:href="#background"/></svg> -->

    <div class="home__center">
      <h1 class="home__logo">
        <svg>
          <use xlink:href="#logo-dailybread"/>
        </svg>
      </h1>
      <p class="home__text">As humans, we sure areproducting a lot  of food to sustain our need.<br>But have you everwondered what it tells us about our world ?</p>
      <svg class="home__start-button"
              @click="start">
        <use xlink:href="#start-button"/>
      </svg>
    </div>
  </section>
</template>

<script>
export default {
  methods: {
    start () {
      this.$router.push('/dataviz')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/assets/stylesheets/partials/variables';

.home {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.2rem;
  position: relative;
  background-image: url('~@/assets/svg/background.png');
  background-size: cover;
  background-position: left;

  &__center {
    position: relative;
    z-index: 2;
    display: flex;
    flex-direction: column;
    width: 70rem;
    align-items: center;
    padding: 0 2rem;
    font-weight: 600;
  } 

  &__logo {
    margin-bottom: 3rem;
    svg {
      width: 44rem;
      height: 9rem;
    }
  }

  &__text {
    text-align: center;
    line-height: 2.6rem;
    margin-bottom: 6rem;
  }
  
  &__start-button {
    height: 8rem;
    width: 21rem;
    text-transform: uppercase;
    cursor: pointer;
  }


  &__bg-item {
    position: absolute;
    height: 80rem;
    width: 80rem;
    &--mobile {
      top: -5vh;
      left: -5vw;
      min-height: 110vh;
      min-width: 110vw;
    }
    &--2, &--1 {
      display: none;
    } 
    @media (min-width:768px) {
      &--2 {
        top: -18rem;
        right: -30rem;
      }
      &--1 {
        bottom: -18rem;
        left: -30rem;
      }
    }
  }
}
</style>
