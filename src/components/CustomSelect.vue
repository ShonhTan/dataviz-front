<template>
  <div class="custom-select" :class="{'is-active' : focus}">
    <div class="custom-select__box">
      <input v-model="input.country_name"
             type="text"
             @focus="onFocus"
             @blur="onBlur"
             @keyup.enter="onEnter">
      <svg>
        <use xlink:href="#select-arrow"/>
      </svg>
    </div>
    
    <div class="custom-select__list">
      <span v-for="item in filteredList"
            class="list-item"
            @click="select(item)"
            :value="item.country_code"
            :key="item.country_code">{{ item.country_name }}</span>
    </div>
  </div>  
</template>

<script>
import { setTimeout } from 'timers';

export default {
  watch: {
    value () {
      this.input = this.value
    }
  },
  props: {
    list: {
      type: Array,
      required: true
    },
    value: {
      type: Object,
      required: false
    }
  },
  data: () => ({
    input: {
      country_name: '',
      country_code: ''
    },
    focus: false,
  }),
  computed: {
    filteredList () {
      return this.list.filter(el => el.country_name.toLowerCase().includes(this.input.country_name.toLowerCase()))
    }
  },
  methods: {
    select (item) {
      this.focus = false
      this.input = {...item}
      this.$emit('input', this.input)
    },

    onFocus () {
      this.focus = true
      this.input.country_name = ""
    },

    onBlur () {
      setTimeout(() => {
        this.focus = false
      }, 100)
    },

    onEnter (e) {
      if (!this.filteredList.length) {
        return
      }
      this.select(this.filteredList[0])
      e.target.blur()
    }
  }
}
</script>