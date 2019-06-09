<template>
  <div class="chart-view" :class="$route.params.aliment">
    <span>{{currentFoodData}}</span>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
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
      return this.allCountriesFoodData.map(el => {
        if (!el || !this.decades.length) return
        const currentFood = el.data.find(aliment => aliment.short_name === this.$route.params.aliment)
        return {
          country: el.name,
          food: {
            ...currentFood,
            data: this.decades[this.selectedDecade].map(year => currentFood.data.find(el => el.year===year))
          }
        }
      })
    },
  },
  mounted () {
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
</style>