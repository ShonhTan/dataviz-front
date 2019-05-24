import Vue from 'vue'

const stopProp = (event) => { 
  event.stopPropagation()
}

Vue.directive('click-outside', {
  bind (el, binding, vnode) {
    vnode.context.event = event => vnode.context.$emit(binding.expression, event)
    el.addEventListener('click', stopProp)
    document.body.addEventListener('click', binding.value)
  },   
  unbind (el, binding) {
    el.removeEventListener('click', stopProp)
    document.body.removeEventListener('click', binding.value)
  }
})