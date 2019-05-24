<template>
    <div>
        <v-chart class="chart" :options="myChart"/>
    </div>
</template>

<script>

    import store from '../store.js'
    import Vue from 'vue'
    import ECharts from 'vue-echarts'
    import axios from '../http'

    import 'echarts/lib/chart/line'

    Vue.component('v-chart', ECharts)

    export default {
        components: {
            'v-chart': ECharts
        },

        data () {
            const colors = ['red', '#d14a61', '#675bba'];

            return {
                allFoods: {
                    food: null,
                    rice: null,
                    sugar: null,
                    palmOil: null,
                    coffee: null,
                    milk: null,
                    cereals: null,
                    meat: null,
                    fish: null,
                    foodSelected: null,
                    years: null,
                    quantity: null
                },
                myChart: {
                    color: colors,

                    tooltip: {
                        trigger: 'none',
                        axisPointer: {
                            type: 'cross'
                        }
                    },

                    title: {
                        text: 'test'
                    },
                    legend: {
                        data:['2015 降水量', '2016 降水量']
                    },
                    grid: {
                        top: 70,
                        bottom: 50
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
                                    color: colors[1]
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
                            name:'2015 降水量',
                            type:'line',
                            xAxisIndex: 1,
                            smooth: true,
                            data: []
                        }
                    ]
                }
            }
        },
        mounted() {
            this.getFoodData()
        },
        methods: {
            getFoodData () {
                axios.get('/food', {
                    params: { country_code: store.selectedCountry.country_code }
                }).then(res => {
                    this.allFoods.food = res.data
                    this.allFoods.rice = res.data.data[0].data
                    this.allFoods.sugar = res.data.data[1].data
                    this.allFoods.palmOil = res.data.data[2].data
                    this.allFoods.coffee = res.data.data[3].data
                    this.allFoods.milk = res.data.data[4].data
                    this.allFoods.cereals = res.data.data[5].data
                    this.allFoods.meat = res.data.data[6].data
                    this.allFoods.fish = res.data.data[7].data
                    this.allFoods.foodSelected =  window.location.pathname.split('/')[2]
                    this.allFoods.years = this.allFoods[this.allFoods.foodSelected].map(i => i.year)
                    this.allFoods.quantity = this.allFoods[this.allFoods.foodSelected].map(i => i.quantity)
                    this.myChart.xAxis[0].data = this.allFoods.years
                    this.myChart.series[0].data = this.allFoods.quantity
                })
            },
        }
    }
</script>

<style scoped>
    .chart {
        width: 100vw;
        height: 70vh;
    }
</style>