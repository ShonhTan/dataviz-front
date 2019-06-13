<template>
  <section class="section home">
    <div class="home__center">
      <h1 class="home__logo">
        <img src="@/assets/img/logo-dailybread.png" alt="" draggable="false">
      </h1>
      <p class="home__text">As humans, we sure are producing a lot of food to sustain our needs. <br>But have you ever wondered what it tells us about the world ?</p>
      <router-link class="start-button" draggable="false" to="/dataviz"/>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@import '~@/assets/stylesheets/partials/variables';

.home {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.2rem;
  position: relative;
  background-image: url('~@/assets/svg/background.svg?external');
  background-size: cover;
  background-position: left;

  &__center {
    position: relative;
    z-index: 2;
    display: flex;
    flex-direction: column;
    width: 80rem;
    align-items: center;
    padding: 0 2rem;
    font-weight: 600;
  } 

  &__logo {
    margin-bottom: 3rem;
    img {
      width: 44rem;
      height: 9rem;
    }
  }

  &__text {
    text-align: center;
    line-height: 3.2rem;
    margin-bottom: 3rem;
  }

  .start-button {
    border: none;
    background-color: transparent;
    background-image: url('~@/assets/svg/btn-start.svg?external');
    background-position: bottom 0 right 0;
    background-size: 180px 50px;
    background-repeat: no-repeat; 
    height: 50px;
    width: 180px;
    cursor: pointer;
    &:active {
      transform: translateX(2px);
      background-size: 180px 50px;
      background-image: url('~@/assets/svg/btn-start-active.svg?external');
    }
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
