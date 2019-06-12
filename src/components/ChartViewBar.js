import { Bar, mixins } from 'vue-chartjs'

export default {
  extends: Bar,
  mixins: [mixins.reactiveProp],
  props: {
    chartData: {
      type: Object,
      required: true
    },
    height: {
      type:Number,
      required: false,
      default: 350
    }
  },
  data: () => ({
    options: {
      legend: {
        labels: {
          fontColor: "rgba(0,0,0, 0.8)",
          fontSize: 16,
          fontFamily: 'rumeur'
        }
      },
      responsive: true, 
      maintainAspectRatio: false,
      drawBorder: false,
      scales: {
        xAxes: [{
          categoryPercentage: 0.9,
          barPercentage: 1,
          gridLines: {
            color: "rgba(0, 0, 0, 0)",
          },
          ticks: {
            fontColor: "rgba(0,0,0, 0.8)",
            fontSize: 18,
            fontFamily: 'Overpass'
          }
        }],
        yAxes: [{
          
          gridLines: {
            color: "rgba(0, 0, 0, 0)",
          },
          ticks: {
            beginAtZero: true,
            fontColor: "rgba(0,0,0, 0.8)",
            fontSize: 10,
            fontStyle: 700,
            fontFamily: 'Overpass'
          }
        }]
      }
    }
  }),
  mounted () {
    this.renderChart(this.chartData, this.options)
  },
  methods: {
  }
}