import Vue from 'vue'

Vue.filter('formatInt', (value) => {
  return new Intl.NumberFormat('fr-FR').format(value)
})