<template>
  <section class="section dataviz" :class="{ 'dataviz--on-menu' : mobileMenuOpen }">
    <div class="dataviz-filters">
      <h4 class="dataviz-filters__title">
        Choose a time and period
      </h4>
      <CustomSelect v-model="selectedCountry" :list="countryList"/>
      <button class="dataviz-filters__add">
        <svg>
          <use xlink:href="#plus-icon"/>
        </svg>
      </button>
      <select class="dataviz-filters__period"
              v-model="selectedYear" name="year" id="year">
        <option v-for="item in yearList"
                :value="item.year"
                :key="item.year">{{ item.year }}</option>
      </select>
      <button class="dataviz-filters__close" @click="mobileMenuOpen=false">
        <svg>
          <use xlink:href="#close-icon"/>
        </svg>
      </button>
    </div>
    <button class="dataviz__mobile-menu-button" @click="mobileMenuOpen=true"/>
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
          <svg>
            <use :xlink:href="`#${ item.short_name }-icon`"/>
          </svg>
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
    rerenderkey: 0,
    mobileMenuOpen: false
  }),
  computed: {
    currentData () {
      if (!this.selectedYear || !this.selectedCountry || !this.food) {
        return {}
      }
      return this.food.data.map(el => ({
        aliment_name: el.aliment_name,
        aliment_name_fr: el.aliment_name_fr,
        short_name: el.short_name,
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
      return Array(Math.round(percentage*Math.floor((window.innerHeight-300)/50)*2) || 1)
    }
  },
}
</script>