<template>
  <div class="chart-view" :class="$route.params.aliment">
    <v-chart class="chart" :options="myChart"/>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import Vue from 'vue'
import ECharts from 'vue-echarts'

import 'echarts/lib/chart/line'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legend'

Vue.component('v-chart', ECharts);

export default {
  components: {
    'v-chart': ECharts
  },
  data () {
    const colors = ['#FF7A00', '#BC7634', '#FFA620'];
    return {
      myChart: {
        color: colors,
        tooltip: {
          trigger: 'none',
          axisPointer: {
            type: 'cross'
          }
        },
        xAxis: [
          {
            type: 'category',
            axisTick: {
              alignWithLabel: true
            },
            axisLine: {
              onZero: false,
              lineStyle: {
                color: 'red'
              }
            },
            data: []
          },
          {
            type: 'category',
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name:'first country',
            type:'line',
            xAxisIndex: 1,
            smooth: true,
            data: []
          },
          {
            name:'second country',
            type:'line',
            xAxisIndex: 1,
            smooth: true,
            data: []
          },
          {
            name:'third country',
            type:'line',
            xAxisIndex: 1,
            smooth: true,
            data: []
          }
        ]
      }
    }
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
        'countriesSelected'
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
    console.log(this.$route);
    // when mounted for the first time
    if(this.currentFoodData[0]) {
      this.myChart.xAxis[0].data = this.currentFoodData[0].food.data.map(item =>  item.year);
      this.myChart.series[0].data = this.currentFoodData[0].food.data.map(item =>  item.quantity);
    }

  },
  watch: {
    currentFoodData(data) {
      this.myChart.xAxis[0].data = this.currentFoodData[0].food.data.map(item =>  item.year);
      data.map((item, i) => {
        if(data[i]) {
          this.myChart.series[i].data = this.currentFoodData[i].food.data.map(item =>  item.quantity);
        }
      });
      }
    }
  }

</script>

<style lang="scss" scoped>
  @import '~@/assets/stylesheets/partials/variables';
  .chart {
    padding-top: 180px;
    width: 100vw;
    height: 90vh;
  }
  .chart-view {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: #7AD7FF;

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