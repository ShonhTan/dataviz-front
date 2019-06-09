<template>
  <div class="chart-view" :class="$route.params.aliment">
    <div class="chart-container">
      <ChartViewBar :height="500" v-if="currentFoodData.length" :chartData="currentFoodData"/>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import ChartViewBar from '../components/ChartViewBar.js'

export default {
  components: {
    ChartViewBar
  },
  computed: {
    ...mapGetters('Params', [
      'decades'
    ]),   
    ...mapState('Selection', [
      'selectedDecade'
    ]),
    ...mapGetters('Selection', [
        'allCountriesFoodData',
      ]
    ),

    currentFoodData () {
      return this.allCountriesFoodData.filter(el => el).map(el => {
        if (!el || !this.decades.length) return
        const currentFood = el.data.find(aliment => aliment.short_name === this.$route.params.aliment)
        return {
          country: el.name,
          food: this.decades[this.selectedDecade].map(year => currentFood.data.find(el => el.year===year))
        }
      })
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~@/assets/stylesheets/partials/variables';

.chart-view {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  
  &.rice {
    background: $rice;
  }

  &.fish {
    background: $fish;
  }

  &.palm_oil {
    background: $palm_oil;
  }

  &.cereals {
    background: $cereals;
  }

  &.meat {
    background: $meat;
  }

  &.sugar {
    background: $sugar;
  }

  &.milk {
    background: $milk;
  }

  &.coffee {
    background: $coffee;
  }
}

.chart-container {
  margin-top: auto;
  margin-bottom: 8rem;
}
</style>