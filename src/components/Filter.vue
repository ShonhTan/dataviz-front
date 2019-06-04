<template>
  <div class="dataviz-filters">
    <h4 class="dataviz-filters__title">Choose a time and period</h4>
    <div class="dataviz-filters__select-container">
      <CustomSelect class="custom-select"
                    v-model="selectedCountry"
                    :list="countryList"/>
      <template>
        <CustomSelect class="custom-select"
                      v-show="$route.params.aliment"
                      v-if="comparedCountries[0]"
                      v-model="selectedCompareCountry1"
                      :removable="true"
                      :list="countryList"
                      @remove="onCustomSelectRemove(0)"/>
        <CustomSelect class="custom-select"
                      v-show="$route.params.aliment"
                      v-if="comparedCountries[1]"
                      v-model="selectedCompareCountry2"
                      :removable="true"
                      :list="countryList"
                      @remove="onCustomSelectRemove(1)"/>
        <button class="dataviz-filters__add"
                v-show="$route.params.aliment"
                v-if="comparedCountries.length < 2"
                @click="addCompareCountry">
          <svg>
            <use xlink:href="#plus-icon"/>
          </svg>
      </button>
      </template>
    </div>
    <DateSelect class="date-select"
                @select="onDateSelect"
                :yearList="decades"/>
    <button class="dataviz-filters__close" @click="$emit('close')">
      <svg>
        <use xlink:href="#close-icon"/>
      </svg>
    </button>
    <router-link :style="{color: 'white', position: 'fixed', top: '3rem', right: '3rem', fontSize:'4rem', textDecoration: 'none'}" to="/dataviz" v-if="$route.params.aliment">X</router-link>
  </div>
</template>

<script>
  import CustomSelect from './CustomSelect.vue'
  import DateSelect from './DateSelect.vue'

  import { mapState, mapGetters, mapActions } from 'vuex'

  export default {
    watch:{
      $route (to, from){
        console.log(this.comparedCountries[0])

      }
    },
    components: {
      CustomSelect,
      DateSelect
    },

    computed: {
      ...mapState('Selection', [
        'country',
        'selectedYear',
        'comparedCountries'
      ]),

      ...mapState('Params', [
        'countryList',
        'yearList'
      ]),

      ...mapGetters('Params', [
        'decades'
      ]),

      /**
       * select country v-model
       */
      selectedCountry: {
        get () {
          return this.country
        },
        set (country) {
          this.setCountry(country)
        }
      },

      selectedCompareCountry1: {
        get () {
          return this.comparedCountries[0]
        },
        set (country) {
          this.setCompareCountry({country, index: 0})
        }
      },

      selectedCompareCountry2: {
        get () {
          return this.comparedCountries[1]
        },
        set (country) {
          this.setCompareCountry({country, index: 1})
        }
      }
    },

    methods: {
      ...mapActions('Selection', [
        'setCountry',
        'setYear',
        'addCompareCountry',
        'removeCompareCountry',
        'setCompareCountry'
      ]),

      onDateSelect (i) {
        this.setYear(this.decades[i].min)
      },

      onCustomSelectRemove (i) {
        this.removeCompareCountry(i)
      }
    }
  }
</script>

<style lang="scss">
.dataviz-filters {
    position: fixed;
    z-index: 10;
    height: 100vh;
    width: 100vw;
    display: none;
    flex-direction: column;
    padding: 8rem 4.5rem 9rem;
    align-items: center;
    background-color: rgba(#7AD7FF, 0.8);
    @media (min-width: 768px) {
      padding: 2rem 4rem;
      background-color: transparent;
      display: flex;
      flex-direction: row;
      align-items: flex-start;
      height: unset;
      width: 100vw;
      top: 0;
      .custom-select:not(:last-child) {
        margin-right: 2rem;
      }
    }
    &__title {
      font-size: 2.2rem;
      margin-bottom: 3.6rem;
      text-align: center;
      @media (min-width: 768px) {
        display: none;
      }
    }

    &__select-container {
      display: flex;
      align-items: center;
      @media (min-width: 768px) {
        margin-top: 4rem;
      }
    }
    &__add {
      margin-top: 1.5rem;
      border: 2px solid #000000;
      width: 37px;
      height: 37px;
      font-size: 2.5rem;
      line-height: 1px;
      border-radius: 4rem;
      cursor: pointer;
      @media (min-width: 768px) {
        margin: 0 3rem;
      }
      svg {
        height: 16px;
        width: 16px;
      }
    }
    .date-select {
      margin-top: auto;
      @media (min-width: 768px) {
        margin: 0 0 0 auto;
      }
    }
    &__close {
      border: none;
      background: none;
      position: absolute;
      cursor: pointer;
      top: 2.5rem;
      right: 2.5rem;
      svg {
        height: 24px;
        width: 24px;
      }
      @media (min-width: 768px) {
        display: none;
      }
    }
  }
</style>
