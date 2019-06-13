<template>
  <section class="section dataviz" :class="{ 'dataviz--on-menu' : mobileMenuOpen }">
    <FilterComponent @close="mobileMenuOpen=false"/>
    <button class="dataviz__mobile-menu-button" @click="mobileMenuOpen=true"/>
    <p class="instructions">Chose a country and period to see where and when the different foods are the most produced !</p>
    <div class="dataviz-data" ref="datavizElement">
      <div class="dataviz-data__item"
           v-for="(item, index) in currentData"
           :key="index+rerenderkey">
        <div class="item-base"
             @click="$router.push(`/dataviz/${item.short_name}`)">
          <div class="item-gauge">
            <span :class="`unit ${item.short_name}`" v-for="(unit, uindex) in arrayGauge(item.quantity)"
                  :key="item.aliment_name + uindex + rerenderkey"></span>
            <span :class="`item-quantity ${item.short_name}`">{{ item.quantity | formatInt }} kt</span>
          </div>
          <span :to="`/dataviz/${item.short_name}`">
            <svg>
              <use :xlink:href="`#${item.short_name}-icon`"/>
            </svg>
            <span class="item-name">{{ item.aliment_name }}</span>
          </span>
        </div>
      </div>
    </div>
    <transition name="fade" mode="out-in">
      <keep-alive>
        <router-view/>
      </keep-alive>
    </transition>
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

    ...mapGetters('Params', [
      'decades'
    ]),

    /**
     * data de la liste des aliments formatées pour être affichée
     */
    currentData () {
      if (!this.decades.length || !this.country || !this.food) {
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
      country_name: 'World',
      country_code: '000'
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
      return Array(Math.round(percentage*Math.floor((window.innerHeight-450)/50)*2) || 1)
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
  position: relative;
  &::before {
    content: '';
    position: absolute;
    background-image: url('~@/assets/svg/background-header.svg?external');
    width: 2070px;
    height: 440px;
    top: -315px;
    left: 50%;
    transform: translateX(-50%);
  }

  .instructions {
    padding: 18rem 0 0 2.4rem;
    font-family: 'rumeur';
    font-size: 2.2rem;
    font-weight: 600;
  }
  
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
    overflow-x: auto; 
    max-width: 100vw;
    padding-bottom: 2rem;

    &__item {
      margin: 0 5rem;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      width: 10rem;
      text-align: center;
      .item {
        &-base {
          cursor: pointer;
          margin-top: 2rem;
          text-align: center;
          display: flex;
          padding: 1rem;
          line-height: 2.3rem;
          position: relative;
          &:hover {
            svg {
              animation-name: popJump;
              animation-duration: 0.5s;
            }
           .item-quantity {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .item-name {
            margin: auto;
          }
          > span {
            display: block;
            height: 115px;
            margin: auto;
            position: relative;
            text-decoration: none;
            svg {
              height: 8rem;
              width: 8rem;
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
          padding-bottom: 2rem;
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

            &.fruit {
              &.unit::after {
                background: $fruit;
                border: 1px solid $borderFruit;
              }
            }

            &.vegetable {
              &.unit::after {
                background: $vegetable;
                border: 1px solid $borderVegetable;
              }
            }

            &.fish {
              &.unit::after {
                background: $fish;
                border: 1px solid $borderFish;
              }
            }

            &.cereals {
              &.unit::after {
                background: $cereals;
                border: 1px solid $borderCereals;
              }
            }

            &.meat {
              &.unit::after {
                background: $meat;
                border: 1px solid $borderMeat;
              }
            }

            &.sugar {
              &.unit::after {
                background: $sugar;
                border: 1px solid $borderSugar;
              }
            }

            &.milk {
              &.unit::after {
                background: $milk;
                border: 1px solid $borderMilk;
              }
            }

            &.coffee {
              &.unit::after {
                background: $coffee;
                border: 1px solid $borderCoffee;
              }
            }
          }
        }

        &-quantity {
          opacity: 0;
          transform: translateY(-10px);
          font-size: 1.4rem;
          font-weight: 600;
          font-size: 'rumeur';
          border: 2px solid #000000;
          background-color: #ffffff;
          padding: 1.7rem 1rem;
          border-radius: 5px;
          position: absolute;
          margin: 0 auto 1.5rem;
          top: -70px;
          right: 25%;
          white-space: nowrap;
          transition: all 0.3s ease;
         &::before {
            content: '';
            position: absolute;
            display : inline-block;
            height : 0;
            width : 0;
            border-top : 21px solid red;
            border-left : 21px solid transparent;
            top: 100%;
            right: 20px;
          }
          &::after {
            content: '';
            position: absolute;
            display : inline-block;
            height : 0;
            width : 0;
            border-top : 16px solid #ffffff;
            border-left : 16px solid transparent;
            top: 100%;
            right: 22px;
          } 

          &.fruit {
            border-color: $fruit;
            &::before {
              border-top-color: $fruit;
            }
          }

          &.vegetable {
            border-color: $vegetable;
            &::before {
              border-top-color: $vegetable;
            }
          }

          &.fish {
            border-color: $fish;
            &::before {
              border-top-color: $fish;
            }
          }

          &.cereals {
            border-color: $cereals;
            &::before {
              border-top-color: $cereals;
            }
          }

          &.meat {
            border-color: $meat;
            &::before {
              border-top-color: $meat;
            }
          }

          &.sugar {
            border-color: $sugar;
            &::before {
              border-top-color: $sugar;
            }
          }

          &.milk {
            border-color: #000000;
            &::before {
              border-top-color: #000000;
            }
          }

          &.coffee {
            border-color: $coffee;
            &::before {
              border-top-color: $coffee;
            }
          }
        }
      }
    }
  }
}


</style>
