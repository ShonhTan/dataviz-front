<template>
  <div id="app">
    <transition>
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  data: () => ({
    currentSection: 'home'
  }),
  methods: {
    toDataviz () {
      this.currentSection = 'dataviz'
    }
  }

}
</script>

