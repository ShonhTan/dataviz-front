<template>
  <div class="custom-select" :class="{'is-active' : focus}">
    <div class="custom-select__box" v-if="input">
      <input v-model="input.country_name"
             type="text"
             @focus="onFocus"
             @blur="onBlur"
             @keyup.enter="onEnter">
    </div>
    
    <div class="custom-select__list" v-if="input">
      <span v-for="item in filteredList"
            class="list-item"
            @click="onSelect(item)"
            :key="'l' + item.country_code">{{ item.country_name }}</span>
    </div>

    <div class="custom-select__box custom-select__box--mobile"
         @click.stop="$refs['mobile-select'].click()">
      <span>{{ input.country_name }}</span>
      <select v-model="input.country_code"
              name="country" id="country"
              ref="mobile-select"
              @change="onSelectMobile">
        <option v-for="(item, i) in list"
                :value="item.country_code"
                :key="'o' + item.country_code + i">
          {{ item.country_name }}
        </option>
      </select>
    </div>
  </div>
</template>

<script>
import { setTimeout } from 'timers';

export default {
  watch: {
    value () {
      this.input = this.value
    },

    input (a, b) {
      if(!a) {
        a = b
      }
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
      return this.list.filter(el => el.country_name && el.country_name.toLowerCase().includes(this.input.country_name && this.input.country_name.toLowerCase()))
    }
  },

  methods: {
    onSelect (item) {
      this.focus = false
      this.input = {...item}
      this.$emit('input', this.input)
    },

    onSelectMobile (a) {
      this.input = this.list.find(el => el.country_code === a.target.value)
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
      this.onSelect(this.filteredList[0])
      e.target.blur()
    }
  }
}
</script>