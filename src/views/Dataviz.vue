<template>
  <section class="section dataviz">
    <div class="dataviz-filters">
      <CustomSelect v-model="selectedCountry" :list="countryList"/>
      <select v-model="selectedYear" name="year" id="year">
        <option v-for="item in yearList"
                :value="item.year"
                :key="item.year">{{ item.year }}</option>
      </select>
    </div>
    <div class="dataviz-data" ref="datavizElement">
      <div class="dataviz-data__item"
           v-for="(item, index) in currentData"
           :key="index+rerenderkey">
        <div class="item-base">
          <div class="item-gauge">
            <span class="unit" v-for="(unit, uindex) in arrayGauge(item.quantity)"
                  :key="item.aliment_name + uindex + rerenderkey"></span>
            <span class="item-quantity">{{ item.quantity }}</span>
          </div>
          <span class="item-name">{{ item.aliment_name }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from '../http'
import CustomSelect from '../components/CustomSelect.vue'

export default {
  components: {
    CustomSelect
  },
  watch: {
    selectedCountry () {
      this.getFoodData()
    }
  },
  data: () => ({
    countryList: [],
    selectedCountry: null,
    yearList: [],
    selectedYear: null,
    food: null,
    rerenderkey: 0
  }),
  computed: {
    currentData () {
      if (!this.selectedYear || !this.selectedCountry || !this.food) {
        return {}
      }
      return this.food.data.map(el => ({
        aliment_name: el.aliment_name,
        quantity: el.data.find(el => el.year===this.selectedYear).quantity
      }))
    },

    currentMaxValue () {
      const max = Math.max(...this.currentData.map(el => el.quantity))
      return max > 100 ? max : 100
    },
  },

  mounted () {
    this.getCountries()
    this.getYears()
    window.addEventListener('resize', () => {
      this.rerenderkey++
    })
  },

  methods: {
    getCountries () {
      axios.get('/countries')
        .then(res => {
          this.countryList = res.data
          this.selectedCountry = {
            country_name: 'France',
            country_code: 'FRA'
          }
        })
    },

    getYears () {
      axios.get('/years')
        .then(res => {
          this.yearList = res.data
          this.selectedYear = 2000
        })
    },

    getFoodData () {
      axios.get('/food', {
        params: { country_code: this.selectedCountry.country_code }
      }).then(res => {
          this.food = res.data
        })
    },
    arrayGauge (quantity) {
      if (!quantity) {
        return 0
      }
      const percentage = quantity/this.currentMaxValue
      console.log(Math.floor(percentage*100))
      return Array(Math.round(percentage*Math.floor((window.innerHeight-300)/50)*2) || 1)
    }
  },
}
</script>