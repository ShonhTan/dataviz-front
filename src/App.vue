<template>
  <div id="app">
    <transition>
      <component :is="currentSection"
                 @toDataviz="toDataviz"/>
    </transition>
  </div>
</template>

<script>
//components
import Home from './views/Home.vue'
import Dataviz from './views/Dataviz.vue'

export default {
  components: {
    'home': Home,
    'dataviz': Dataviz
  },
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

