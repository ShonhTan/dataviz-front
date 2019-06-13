<template>
  <div class="chart-view" :class="$route.params.aliment" :data-name="bgName">
    <div class="chart-container" :class="{ 'chart-container--bar' : !chartline }" v-if="$route.params.aliment">
      <transition name="fade" mode="out-in">
        <component :height="heightChart" v-if="currentFoodData.length && currentFoodData[0]" :is="chartType" :chartData="chartData"/>
      </transition>
      <div class="switch-container">
        <svg><use :xlink:href="`#line-icon`"/></svg>
        <label class="switch" for="switch-chart">
          <input id="switch-chart" type="checkbox" v-model="chartline">
          <span class="toggle"></span>
        </label>
        <svg><use :xlink:href="`#bar-icon`"/></svg>
      </div>
      <router-link class="link link--left" :to="`/dataviz/${previousAliment}`">
        <svg><use :xlink:href="`#${previousAliment}-icon`"/></svg>
      </router-link>
      <router-link class="link link--right" :to="`/dataviz/${nextAliment}`">
        <svg><use :xlink:href="`#${nextAliment}-icon`"/></svg>
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import ChartViewBar from '../components/charts/ChartViewBar.js'
import ChartViewLine from '../components/charts/ChartViewLine.js'
import colors from '../assets/colors.json'

const alimentList = ['fruit', 'vegetable', 'meat', 'fish', 'sugar', 'cereals', 'coffee', 'milk']

export default {
  components: {
    'chart-view-bar': ChartViewBar,
    'chart-view-line': ChartViewLine
  },
  data: () => ({
    chartline: true
  }),
  computed: {
    ...mapGetters('Params', [
      'decades'
    ]),   
    ...mapState('Selection', [
      'selectedDecade',
    ]),
    ...mapGetters('Selection', [
        'allCountriesFoodData',
      ]
    ),

    heightChart () {
      return window.innerHeight-400
    },

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
        datasets: this.currentFoodData.map((el, i) => ({
            label: el.country,
            backgroundColor: colors[this.$route.params.aliment].charts[i],
            data: el.food.reduce((acc, curr) => {
              acc[0] += curr.quantity
              return acc
            }, [0]),
            borderWidth: 2,
            borderColor: "black",
          })
        )
      }
    },

    chartDataLine () {
      return {
        labels: this.currentFoodData[0].food.map(el => el.year),
        datasets: this.currentFoodData.map((el, i) => ({
            label: el.country,
            borderColor: colors[this.$route.params.aliment].charts[i],
            pointHoverBackgroundColor: colors[this.$route.params.aliment].charts[i],
            borderWidth: 4,
            backgroundColor: 'rgba(0,0,0,0)',
            data: el.food.map(al => al.quantity),
            pointHoverRadius: 5,
            pointHitRadius: 20,
          })
        )
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

  &::before {
    content: '';
    background-image: url('~@/assets/svg/chartview-shape-background.svg?external');
    background-size: 100vw 100vh;
    background-repeat: no-repeat;
    background-position: right 0 bottom 0rem;
    width: 100vw;
    height: 100vw;
    bottom: 0;
    position: absolute;
  }

  &:after {
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

  transition: background-color 0.3s ease;
  &.fruit {
    background: $fruit;
  }

  &.fish {
    background: $fish;
  }

  &.vegetable {
    background: $vegetable;
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
    top: 45%;
    display: flex;
    align-items: center;
    &:hover {
      svg {
        animation-name: popJump;
        animation-duration: 0.5s;
      }
    }
    svg {
      height: 7rem;
      width: 7rem;
    }

    &--left {
      left: 1rem;
      &::before {
        content: '';
        background-image: url('~@/assets/svg/arrow.svg?external');
        background-size: 25px 25px;
        height: 25px;
        width: 25px;
        margin-right: 0.3rem;
      }
    }
    &--right {
      right: 1rem;
      &::after {
        content: '';
        background-image: url('~@/assets/svg/arrow.svg?external');
        background-size: 25px 25px;
        height: 25px;
        width: 25px;
        margin-left: 0.3rem;
        transform: rotateZ(180deg);
      }
    }
  }
}

.chart-container {
  z-index: 2;
  margin-top: auto;
  margin-bottom: 8rem;
  padding: 0 16rem 0 16rem;
  position: relative;
  &::before {
    content: '';
    height: 2px;
    width: 100vw;
    background-color: #000000;
    position: absolute;
    left: 0;
    bottom: 9rem;
  }
  &::after {
    content: '';
    height: 105%;
    width: 2px;
    background-color: #000000;
    position: absolute;
    left: 22rem;
    bottom: 0;
  }
  
  > div:first-child {
    position: relative;
    &:before {
      content: 'kilotons';
      position: absolute;
      left: 30px;
      top: -50px;
    }
  }
}

.switch-container {
  display: flex;
  justify-content: center;
  margin: 1.5rem auto 0;
  align-items: flex-end;
  svg {
    height: 36px;
    width: 36px;
    margin: 0 1rem;
  }
    
  .switch {
    z-index: 2;
    height: 3rem;
    width: fit-content;
    display: block;
    font-family: 'rumeur';

    .toggle {
      display: inline-block;
      height: 100%;
      width: 7rem;
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

    input {
      display: none;
      &:checked + .toggle:after {
        margin-left: 0;
      }
    }
  }
}

</style>