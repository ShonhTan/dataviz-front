<template>
  <div class="dataviz-filters">
    <h4 class="dataviz-filters__title">Choose a time and period</h4>
    <CustomSelect class="custom-select"
                  v-model="selectedCountry"
                  :list="countryList"/>
    <DateSelect class="date-select"
                @select="onDateSelect"
                :yearList="decades"/>
    <button class="dataviz-filters__close" @click="$emit('close')">
      <svg>
        <use xlink:href="#close-icon"/>
      </svg>
    </button>
  </div>
</template>

<script>
  import CustomSelect from './CustomSelect.vue'
  import DateSelect from './DateSelect.vue'

  import { mapState, mapGetters, mapActions } from 'vuex'

  export default {
    components: {
      CustomSelect,
      DateSelect
    },

    computed: {
      ...mapState('Selection', [
        'country',
        'selectedYear'
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
      }
    },

    methods: {
      ...mapActions('Selection', [
        'setCountry',
        'setYear'
      ]),

      onDateSelect (i) {
        this.setYear(this.decades[i].min)
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
      .custom-select {
        margin-top: 4rem;
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
