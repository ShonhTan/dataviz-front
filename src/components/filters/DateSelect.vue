<template>
    
  <div>
    <svg width="176" height="177" viewBox="0 0 176 177" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="88" cy="89" r="65" fill="white"/>
      <path d="M137.901 160.266C122.851 170.804 104.851 176.307 86.4816 175.987C68.1119 175.666 50.3151 169.538 35.6421 158.481L48.7316 141.111C59.7363 149.404 73.0839 154 86.8612 154.24C100.639 154.481 114.138 150.353 125.426 142.45L137.901 160.266Z" stroke="black" stroke-width="2" :class="checkIndex(0)" @click="onClick(0)" @mouseover="hover(0)" @mouseout="out"/>
      <path d="M171.199 63.5637C176.57 81.1335 176.242 99.9528 170.26 117.324C164.279 134.696 152.951 149.728 137.901 160.266L125.426 142.45C136.713 134.546 145.209 123.272 149.695 110.243C154.181 97.2146 154.428 83.1001 150.399 69.9228L171.199 63.5637Z" stroke="black" stroke-width="2" :class="checkIndex(1)" @click="onClick(1)" @mouseover="hover(1)" @mouseout="out"/>
      <path d="M89.5184 2.01325C107.888 2.33389 125.685 8.4618 140.358 19.5187C155.031 30.5756 165.827 45.9939 171.199 63.5637L150.399 69.9227C146.37 56.7454 138.273 45.1817 127.268 36.889C116.264 28.5964 102.916 24.0004 89.1388 23.7599L89.5184 2.01325Z" stroke="black" stroke-width="2" :class="checkIndex(2)" @click="onClick(2)" @mouseover="hover(2)" @mouseout="out"/>
      <path d="M5.73989 60.6756C11.7214 43.3039 23.0489 28.2719 38.0989 17.7338C53.1488 7.19569 71.1486 1.69261 89.5184 2.01325L89.1388 23.7599C75.3614 23.5195 61.8616 27.6468 50.5741 35.5503C39.2867 43.4539 30.7911 54.728 26.3049 67.7567L5.73989 60.6756Z" stroke="black" stroke-width="2" :class="checkIndex(3)" @click="onClick(3)" @mouseover="hover(3)" @mouseout="out"/>
      <path d="M35.6421 158.481C20.9691 147.424 10.1731 132.006 4.80149 114.436C-0.57014 96.8665 -0.241648 78.0472 5.73988 60.6756L26.3049 67.7567C21.8188 80.7854 21.5724 94.8999 25.6011 108.077C29.6298 121.255 37.7268 132.818 48.7316 141.111L35.6421 158.481Z" stroke="black" stroke-width="2" :class="checkIndex(4)" @click="onClick(4)" @mouseover="hover(4)" @mouseout="out"/>
    </svg>
    <span v-if="showDecade">{{ decades[selectedDecade][0] }}<br>•<br>{{ decades[selectedDecade][decades[selectedDecade].length - 1] }}</span>
    <span v-else-if="hoverSelect">{{ hoverSelect[0] }}<br>•<br>{{ hoverSelect[hoverSelect.length - 1] }}</span>
  </div>

</template>

<script>
  import { mapGetters, mapState, mapActions } from 'vuex'

  export default {
    data: () => ({
      index: 0,
      hoverSelect: null
    }),

    computed: {
      ...mapState('Selection', [
        'selectedDecade'
      ]),

      ...mapGetters('Params', [
        'decades'
      ]),

      showDecade () {
        return this.decades && this.decades.length && (this.selectedDecade || this.selectedDecade === 0) && !this.hoverSelect
      }
    },

    methods: {
      ...mapActions('Selection', [
        'setDecade'
      ]),

      checkIndex (i) {
        return this.selectedDecade === i ? 'green' : ''
      },

      onClick(i) {
        this.setDecade(i)
      },

      hover (i) {
        this.hoverSelect = [...this.decades[i]]
      },

      out () {
        this.hoverSelect = null
      }
    }
  }
</script>

<style scoped lang="scss">
div {
  position: relative;
  svg {
    transition: transform 1s ease;
    path {
      transition: fill 0.2s ease;
      fill: #ffffff;
      &:hover {
        fill: #C2FFB8;
        cursor: pointer;
      }
      &.green {
        fill: #6FE35C;
      }
    }
  }
  span {
    user-select: none;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    font-size: 2.6rem;
    line-height: 2.2rem;
    font-weight: 600;
  }
}
</style>
