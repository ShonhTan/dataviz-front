import { Bar } from 'vue-chartjs'

export default {
  watch: {
    chartData () {
      this.render()
    }
  },
  extends: Bar,
  props: {
    chartData: {
      type: Array,
      required: true
    }
  },
  data: () => ({
    colors: ['#f87979', '#3D5B96', '#1EFFFF'],
    options: {
      legend: {
        labels: {
          fontColor: "rgba(0,0,0, 0.8)",
          fontSize: 16
        }
      },
      responsive: true, 
      maintainAspectRatio: false,
      drawBorder: false,
      scales: {
        xAxes: [{
          stacked: true,
          categoryPercentage: 0.9,
          barPercentage: 1,
          gridLines: {
            color: "rgba(0, 0, 0, 0)",
          },
          ticks: {
            fontColor: "rgba(0,0,0, 0.8)",
            fontSize: 18,
          }
        }],
        yAxes: [{
          stacked: true,
          gridLines: {
            color: "rgba(0, 0, 0, 0)",
          },
          ticks: {
            fontColor: "rgba(0,0,0, 0.8)",
            fontSize: 10,
          }
        }]
      }
    }
  }),
  computed: {
    labels () {
      return this.chartData[0].food.map(el => el.year)
    },
    datasets () {
      return this.chartData.map((el, i) => {
        return {
          label: el.country,
          backgroundColor: this.colors[i],
          data: el.food.map(al => al.quantity)
        }
      })
    }
  },
  mounted () {
    this.render()
    this.options.animation = {duration:0}
  },
  methods: {
    render () {
      this.renderChart({
        labels: this.labels,
        datasets: this.datasets
      }, this.options)
    }
  }
}