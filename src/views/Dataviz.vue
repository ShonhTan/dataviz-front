<template>
  <section class="section dataviz" :class="{ 'dataviz--on-menu' : mobileMenuOpen }">
    <FilterComponent @close="mobileMenuOpen=false"/>
    <button class="dataviz__mobile-menu-button" @click="mobileMenuOpen=true"/>
    <div class="dataviz-data" ref="datavizElement">
      <div class="dataviz-data__item"
           v-for="(item, index) in currentData"
           :key="index+rerenderkey">
        <div class="item-base">
          <div class="item-gauge">
           
            <span :class="`unit ${item.short_name}`" v-for="(unit, uindex) in arrayGauge(item.quantity)"
                  :key="item.aliment_name + uindex + rerenderkey"></span>
            <span class="item-quantity">{{ item.quantity }}</span>
          </div>
          <router-link :to="`/dataviz/${item.short_name}`">
            <svg>
              <use :xlink:href="`#${item.short_name}-icon`"/>
            </svg>
            <span class="item-name">{{ item.aliment_name }}</span>
          </router-link>
        </div>
      </div>
    </div>
    <router-view/>
  </section>
</template>

<script>
import FilterComponent from '../components/Filter.vue'

import { mapState, mapActions, mapGetters } from 'vuex'

export default {
  components: {
    FilterComponent
  },

  data: () => ({
    rerenderkey: 0,
    mobileMenuOpen: false
  }),

  computed: {
    ...mapState('Selection', [
      'country',
      'food',
      'selectedDecade'
    ]),

    ...mapState('Params', [
      'countryList',
    ]),

    ...mapGetters('Params', [
      'decades'
    ]),

    /**
     * data de la liste des aliments formatées pour être affichée
     */
    currentData () {
      if (!(this.selectedDecade || this.selectedDecade === 0) || !this.country || !this.food) {
        return {}
      }
      return this.food.data.map(el => ({
        aliment_name: el.aliment_name,
        aliment_name_fr: el.aliment_name_fr,
        short_name: el.short_name,
        quantity: this.decades[this.selectedDecade].reduce((acc, curr) => acc += el.data.find(el => el.year===curr).quantity, 0)
      }))
    },

    /**
     * recherche de la plus grande quantité parmis les aliments affichés
     */
    currentMaxValue () {
      const max = Math.max(...this.currentData.map(el => el.quantity))
      return max > 100 ? max : 100
    },
  },

  mounted () {
    this.getParams()
    this.setCountry({
      country_name: 'France',
      country_code: 'FRA'
    })
    window.addEventListener('resize', () => {
      this.rerenderkey++
    })
  },

  methods: {
    ...mapActions('Selection', [
      'setCountry',
    ]),

    ...mapActions('Params', [
      'getParams'
    ]),
    
    arrayGauge (quantity) {
      if (!quantity) {
        return 0
      }
      const percentage = quantity/this.currentMaxValue
      return Array(Math.round(percentage*Math.floor((window.innerHeight-350)/50)*2) || 1)
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~@/assets/stylesheets/partials/variables';

.dataviz {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  background: #FFFBF4;
  
  &__mobile-menu-button {
    z-index: 10;
    height: 13rem;
    width: 13rem;
    border-radius: 13rem;
    border: none;
    background-color: #7AD7FF;
    position: fixed;
    top: -3rem;
    right: -3rem;
    @media (min-width: $bp) {
      display: none;
    }
  }

  &--on-menu {
    .dataviz-filters {
      display: flex;
    }
    .dataviz__mobile-menu-button {
      display: none;
    }
  }


  &-data {
    flex: 1;
    display: flex;
    align-items: stretch;
    margin: auto;
    overflow-x: scroll; 
    max-width: 100vw;
    padding-bottom: 2rem;

    &__item {
      margin: 0 1.5rem;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      width: 10rem;
      text-align: center;
      .item {
        &-base {
          margin-top: 2rem;
          text-align: center;
          // background-color: #C4C4C4;
          // border-radius: 10rem;
          display: flex;
          padding: 1rem;
          line-height: 2.3rem;
          position: relative;
          .item-name {
            margin: auto;
          }
          a {
            display: block;
            height: 115px;
            margin: auto;
            position: relative;
            text-decoration: none;
            svg {
              height: 6rem;
              width: 6rem;
            }
            .item-name {
              text-align: center;
              color: #000000;
            }
          }

        }

        &-gauge {
          position: absolute;
          display: flex;
          flex-direction: row;
          flex-wrap: wrap-reverse;
          width: 100%;
          bottom: 100%;
          margin-bottom: 2rem;
          left: 0;
          .unit {
            height: 50px;
            width: 50%;
            display: flex;
            &::after {
              content: "";
              height: 20px;
              width: 20px;
              border-radius: 20px;
              margin: auto;
            }
          }
        }

        &-quantity {
          font-size: 1rem;
          font-weight: 600;
          opacity: 0.6;
          width: 4rem;
          line-height: 4rem;
          border: 1px solid #C4C4C4;
          border-radius: 4rem;
          position: absolute;
          margin: 0 auto 1.5rem;
          bottom: 100%;
          left: 50%;
          transform: translateX(-50%);
        }

      }
    }
  }
}

.rice {
  &.unit::after {
    background: $rice;
    border: 1px solid $borderRice;
  }
}

.fish {
  &.unit::after {
    background: $fish;
    border: 1px solid $borderFish;
  }
}

.palm_oil {
  &.unit::after {
    background: $palm_oil;
    border: 1px solid $borderPalm_oil;
  }
}

.cereals {
  &.unit::after {
    background: $cereals;
    border: 1px solid $borderCereals;
  }
}

.meat {
  &.unit::after {
    background: $meat;
    border: 1px solid $borderMeat;
  }
}

.sugar {
  &.unit::after {
    background: $sugar;
    border: 1px solid $borderSugar;
  }
}

.milk {
  &.unit::after {
    background: $milk;
    border: 1px solid $borderMilk;
  }
}

.coffee {
  &.unit::after {
    background: $coffee;
    border: 1px solid $borderCoffee;
  }
}


</style>
