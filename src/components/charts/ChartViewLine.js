import { Line, mixins } from 'vue-chartjs'

export default {
  extends: Line,
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
      layout: {
        padding: {
          right: 140
        }
      },
      legend: {
        display: false,
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
            fontFamily: 'Overpass',
            padding: 100,
            callback: function(value) {
              if (value !== 0) return new Intl.NumberFormat('fr-FR').format(value);
            }
          }
        }]
      },
      tooltips: {
        custom: function(tooltip) {
          if (!tooltip) return;
          // disable displaying the color box;
          tooltip.displayColors = false;
        },
        callbacks: {
          label: function (tooltipItem, data) {
            return `${data.datasets[tooltipItem.datasetIndex].label}: ${new Intl.NumberFormat('fr-FR').format(tooltipItem.value)} kt`
          }
        }
      }
    }
  }),
  mounted () {
    this.renderChart(this.chartData, this.options)
  }
}