<template>
  <div class="chart-view" :class="$route.params.aliment" :data-name="bgName">
    <div class="chart-container" :class="{ 'chart-container--bar' : !chartline }" v-if="$route.params.aliment">
      <transition name="fade" mode="out-in">
        <component v-if="currentFoodData.length" :is="chartType" :chartData="chartData"/>
      </transition>
      <label class="switch" for="switch-chart">
        <input id="switch-chart" type="checkbox" v-model="chartline">
        curve
        <span></span>
        chart
      </label>
      <router-link class="link link--left" :to="`/dataviz/${previousAliment}`">
        &lt;--
        <svg><use :xlink:href="`#${previousAliment}-icon`"/></svg>
      </router-link>
      <router-link class="link link--right" :to="`/dataviz/${nextAliment}`">
        <svg><use :xlink:href="`#${nextAliment}-icon`"/></svg>
        --&gt;
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import ChartViewBar from '../components/ChartViewBar.js'
import ChartViewLine from '../components/ChartViewLine.js'

const alimentList = ['rice', 'fish', 'meat', 'sugar', 'milk', 'cereals', 'palm_oil', 'coffee']

export default {
  components: {
    'chart-view-bar': ChartViewBar,
    'chart-view-line': ChartViewLine
  },
  data: () => ({
    colors: ['#f87979', '#3D5B96', '#1EFFFF'],
    chartline: true
  }),
  computed: {
    ...mapGetters('Params', [
      'decades'
    ]),   
    ...mapState('Selection', [
      'selectedDecade',
      'world'
    ]),
    ...mapGetters('Selection', [
        'allCountriesFoodData',
        'zaWarudo'
      ]
    ),

    bgName () {
      return this.$route.params.aliment ? this.$route.params.aliment.split('_').join(' ').toUpperCase() : ''
    },

    chartType () {
      return this.chartline ? 'chart-view-line' : 'chart-view-bar'
    },

    chartData () {
      return this.chartline ? this.chartDataLine : this.chartDataBar
    },

    currentFoodData () {
      let data = this.allCountriesFoodData
      if (this.world.state) {
        data = this.zaWarudo
      }
      return data.filter(el => el).map(el => {
        if (!el || !this.decades.length) return
        const currentFood = el.data.find(aliment => aliment.short_name === this.$route.params.aliment)
        return {
          country: el.name,
          food: this.decades[this.selectedDecade].map(year => currentFood.data.find(el => el.year===year))
        }
      })
    },

    chartDataBar () {
      return {
        labels: [`${this.currentFoodData[0].food[0].year} - ${this.currentFoodData[0].food[this.currentFoodData[0].food.length -1].year}`],
        datasets: this.currentFoodData.map((el, i) => {
          return {
            label: el.country,
            backgroundColor: this.colors[i],
            data: el.food.reduce((acc, curr) => {
              acc[0] += curr.quantity
              return acc
            }, [0])
          }
        })
      }
    },

    chartDataLine () {
      return {
        labels: this.currentFoodData[0].food.map(el => el.year),
        datasets: this.currentFoodData.map((el, i) => {
          return {
            label: el.country,
            borderColor: this.colors[i],
            backgroundColor: 'rgba(0,0,0,0)',
            data: el.food.map(al => al.quantity)
          }
        })
      }
    },

    previousAliment () {
      const currentIndex = alimentList.findIndex(el => el===this.$route.params.aliment)
      return alimentList[currentIndex-1] || alimentList[alimentList.length-1]
    },

    nextAliment () {
      const currentIndex = alimentList.findIndex(el => el===this.$route.params.aliment)
      return alimentList[currentIndex+1] || alimentList[0]
    }
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
  align-items: stretch;
  background: #ffffff !important;

  &:before {
    content: attr(data-name);
    position: absolute;
    left: 50%;
    transform: translate(-50%);
    bottom: 10%;
    font-size: 30rem;
    font-weight: 800;
    opacity: 0.05;
    white-space: nowrap;
  }

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

  .link {
    position: fixed;
    svg {
      height: 32px;
      width: 32px;
    }
    top: 90%;
    &--left {
      left: 1rem;
    }
    &--right {
      right: 1rem;
    }
  }
}

.chart-container {
  z-index: 2;
  margin-top: auto;
  margin-bottom: 8rem;
  
  &--bar {
    width: 800px;
    margin-left: auto;
    margin-right: auto;
  }
}

.switch {
  z-index: 2;
  height: 3rem;
  width: fit-content;
  margin: 5rem auto 0;
  display: block;
  font-family: 'rumeur';
  input {
    display: none;
  }
  span {
    display: inline-block;
    height: 100%;
    width: 10rem;
    margin: 0 0.5rem;
    background-color: #7AD7FF;
    border: 2px solid #000000;
    border-radius: 15px;
    overflow: hidden;
    &:after {
      content: '';
      display: block;
      border-radius: 15px;
      height: 100%;
      width: 50%;
      background-color: #ffffff;
      margin-left: 50%;
      transition: margin 0.3s ease;
    } 
  }
  input:checked + span:after {
    margin-left: 0;
  }
}
</style>