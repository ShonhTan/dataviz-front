<template>
  <div class="custom-select" :class="{'is-active' : focus}"
       v-click-outside="onBlur">
    <div class="custom-select__box" v-if="input">
      <input v-model="input.country_name"
             type="text"
             @focus="onFocus"
             @keyup.enter="onEnter"
             placeholder="Select a country">
      <span class="arrow" @click.prevent="toggleInput"/>
    </div>
    
    <div class="custom-select__list" v-if="filteredList.length">
      <span v-for="item in filteredList"
            class="list-item"
            @click="onSelect(item)"
            :key="'l' + item.country_code">{{ item.country_name }}</span>
    </div>
    <div class="custom-select__list" v-else>
      <span class="list-item">
        Aucun pays trouvé
      </span>
    </div>

    <div class="custom-select__box custom-select__box--mobile"
         @click.stop="$refs['mobile-select'].click()">
      <span>{{ input.country_name }}</span>
      <select v-model="input.country_code"
              name="country" id="country"
              ref="mobile-select"
              @change="onSelectMobile">
        <option v-for="(item, i) in countryList"
                :value="item.country_code"
                :key="'o' + item.country_code + i">
          {{ item.country_name }}
        </option>
      </select>
    </div>

    <button v-if="removable"
            class="custom-select__remove"
            @click="$emit('remove')">
      <svg>
        <use xlink:href="#remove-icon"/>
      </svg>
    </button>

    <div class="color-circle" v-if="$route.params.aliment">
      <svg :style="{fill: color}">
        <use xlink:href="#chart-color-icon"/>
      </svg>
    </div>
  </div>
</template>

<script>
import { setTimeout } from 'timers';
import { mapGetters } from 'vuex'

export default {
  watch: {
    value () {
      this.input = this.value
    },
  },
  props: {
    value: {
      type: Object,
      required: false
    },
    removable: {
      type: Boolean,
      required: false,
      default: false
    },
    color: {
      type: String, 
      required: false,
      default: ''
    }
  },
  data: () => ({
    input: {
      country_name: '',
      country_code: ''
    },
    memory: null,
    focus: false,
  }),

  computed: {
    ...mapGetters('Params', [
      'countryList'
    ]),

    filteredList () {
      return this.countryList.filter(el => el.country_name && el.country_name.toLowerCase().includes(this.input.country_name && this.input.country_name.toLowerCase()))
    }
  },

  mounted () {
    this.input = this.value
  },

  methods: {
    toggleInput () {
      this.focus = !this.focus
    },
    
    onSelect (item) {
      this.memory = null
      this.focus = false
      this.input = {...item}
      this.$emit('input', this.input)
    },

    onSelectMobile (a) {
      this.input = this.countryList.find(el => el.country_code === a.target.value)
      this.$emit('input', this.input)
    },

    onFocus () {
      this.memory = { ...this.input }
      this.focus = true
      this.input.country_name = ""
    },

    onBlur () {
      setTimeout(() => {
        if (this.memory) {
          this.input = { ...this.memory }
          this.memory = null
        }
        this.focus = false
      }, 0)
    },

    onEnter (e) {
      if (!this.filteredList.length) {
        return
      }
      this.onSelect(this.filteredList[0])
      e.target.blur()
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/assets/stylesheets/partials/variables';

.custom-select {
  position: relative;
  z-index: 3;

  &__box {
    display: none;
    position: relative;
    background: white;
    border: 2px solid #000000;
    border-radius: 3px;

    @media (min-width:$bp) {
      display: block;
    }
    &--mobile {
      position: relative;
      display: block;
      width: 30rem;
      select {
        position: absolute;
        opacity: 0;
        height: 100%;
        width: 100%;
        top: 0;
        left: 0;
      }
      span {
        pointer-events: none;
        line-height: 5rem;
        padding: 0 3rem;
        font-size: 2.2rem;
        font-family: 'rumeur';
        white-space: nowrap;
      }
      @media (min-width:$bp) {
        display: none;
      }
    }
    .arrow {
      position: absolute;
      display: block;
      top: 50%;
      right: 3rem;
      height: 1rem;
      width: 1rem;
      border-right: 2px solid #000000;
      border-bottom: 2px solid #000000;
      transform: translateY(-50%) rotateZ(45deg);
      transition: transform 0.3s ease;
      cursor: pointer;
    }
      
    input {
      line-height: 5rem;
      border: none;
      width: 100%;
      padding: 0 5rem 0 3rem;
      font-size: 2.2rem;
      font-family: 'rumeur';
      cursor: pointer;
      &:focus {
        cursor: text;
      }
    }
  }

  &.is-active {
    .custom-select__list {
      visibility: visible;
      opacity: 1;
      transform: scale3d(1, 1, 1);
    }
    .custom-select__box .arrow {
      transform: translateY(-50%) rotateZ(-135deg);
    }
  }
  
  &__list {
    display: none;
    @media (min-width:$bp) {
      display: block;
    }
    transition: all 0.1s ease;
    opacity: 0;
    visibility: hidden;
    transform: scale3d(0.9, 0.9, 1);
    position: absolute;
    top: calc(100% - 2px);
    left: 0;
    display: block;
    max-height: 60vh;
    overflow-y: auto;
    padding: 1rem 0;
    min-width: 100%;
    border: 2px solid #000000;
    background-color: #ffffff;

    .list-item {
      display: block;
      padding: 3rem;
      cursor: pointer;
      white-space: nowrap;
      font-size: 2.2rem;
      font-family: 'rumeur';
      &:hover {
        background-color: #C4C4C4;
      }
    }
  }

  &__remove {
    position: absolute;
    border: none;
    background: transparent;
    padding: 0;
    top: -14px;
    right: -14px;
    cursor: pointer;
    svg {
      width: 30px;
      height: 30px;
    }
  }

  .color-circle {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    bottom: -20px;
    left: -20px;
    width: 45px;
    height: 45px;
    border: 2px solid #000000;
    border-radius: 45px;
    background-color: #ffffff;
    svg {
      width: 25px;
      height: 21px;
    }
  }
}
</style>
