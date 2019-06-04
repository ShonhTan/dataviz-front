<template>
  <div class="chart-view">
    <span>{{currentFoodData}}</span>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters('Selection',
      ['allCountriesFoodData']
    ),
    currentFoodData () {
      return this.allCountriesFoodData.map(el => {
        if (!el) return
        return {
          country: el.name,
          food: el.data.find(aliment => aliment.short_name === this.$route.params.aliment)
        }
      })
    },
  },
  mounted () {
    console.log(this.$route)
    console.log(this.allCountriesFoodData)
  },
}
</script>

<style>
.chart-view {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: #7AD7FF;
}
</style>