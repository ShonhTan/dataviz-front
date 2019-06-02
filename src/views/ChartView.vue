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
    import 'echarts/lib/component/title'
    import 'echarts/lib/component/legend'

    Vue.component('v-chart', ECharts)

    export default {
        components: {
            'v-chart': ECharts
        },

        data () {
            const colors = ['#FF7A00', '#BC7634', '#FFA620'];

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
                            name:'123',
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
                /* if we create a new object data example :
                this.myChart.series.push({
                    name: String,
                    type:'line',
                    xAxisIndex: 1,
                    smooth: true,
                    data: ['1100', '1213', '8000','1100', '1213']
                })*/
        }
    }
</script>

<style scoped>
    .chart {
        width: 100vw;
        height: 70vh;
    }
</style>