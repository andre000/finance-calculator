<template>
  <div class="field">
    <label @click="handleEdit"> {{ label }} </label>
    <div ref="range" class="range input">
      <div class="range__valor">
        <input
          v-if="editMode"
          ref="range-input"
          type="number"
          :value="value"
          @input="handleInput"
          @blur="editMode = false"
          @keydown.enter="editMode = false"
        />
        <span v-else @click="handleEdit">{{
          currency ? formatCurrency(value) : value
        }}</span>
      </div>
      <div class="range__slider" :style="{ width: `${slider}%` }">
        <div class="range__slider__grabber" draggable="true" @drag="handleDrag">
          ...
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: '',
    },
    value: {
      type: Number,
      required: true,
    },
    limit: {
      type: Number,
      required: true,
    },
    currency: {
      type: Boolean,
      default: false,
    },
    step: {
      type: Number,
      default: 1,
    },
    stopAtLimit: {
      type: Boolean,
      default: false,
    },
    allowNegtives: {
      type: Boolean,
      default: false,
    },
  },

  data: () => ({
    // slider: 10,
    editMode: false,
  }),

  computed: {
    slider() {
      return this.value <= this.limit
        ? ~~((this.value / this.limit) * 100)
        : 100
    },
  },

  methods: {
    handleDrag(e) {
      if (e.clientX === 0) return false

      const rangeWidth = this.$refs.range.offsetWidth
      let pct = ((e.x - this.$refs.range.offsetLeft) / rangeWidth) * 100
      if (pct > 100 && this.stopAtLimit) {
        pct = 100
      } else if (pct < 0) {
        pct = 0
      }

      const valueRounded = Number(Number((pct * this.limit) / 100).toFixed(2))
      const stepIncrement = this.step - (valueRounded % this.step)

      let value =
        valueRounded < stepIncrement ? 0 : valueRounded + stepIncrement

      const hasLimit = this.stopAtLimit && value > this.limit

      if (hasLimit) {
        value = this.limit
      }

      this.$emit(
        'input',
        this.stopAtLimit && value > this.limit ? this.limit : value
      )
    },

    handleInput(event) {
      let value = event.target.value || 0

      const isGreaterThanLimit = this.stopAtLimit && value > this.limit
      const disallowNegatives = !this.allowNegtives && value < 0

      if (isGreaterThanLimit) {
        value = this.limit
      } else if (disallowNegatives) {
        value = 0
      }
      this.$emit('input', value)
    },

    async handleEdit() {
      this.editMode = true
      await this.$nextTick()
      this.$refs['range-input'].focus()
    },

    formatCurrency(value) {
      return Number(value).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      })
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/variables.scss';

.range {
  &__valor {
    font-size: 1rem;
    font-weight: bold;
    color: #fff;
    position: absolute;
    top: calc(50% - 0.5rem);
    left: 10px;
    z-index: $layer-foreground;
    mix-blend-mode: difference;
    cursor: pointer;

    input {
      background: none;
      border: none;
      height: 2rem;
      margin-top: -1rem;
      color: #fff;
      outline: none;

      &::-webkit-outer-spin-button,
      &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }
      &[type='number'] {
        -moz-appearance: textfield;
      }
    }
  }

  &__slider {
    height: 3em;
    border-radius: 15px;
    background: #334;
    position: relative;

    &__grabber {
      position: absolute;
      font-weight: bold;
      color: #fffa;
      height: 3em;
      width: 5px;
      right: 0px;
      writing-mode: vertical-lr;
      top: calc(50% - 0.5rem);
      right: 5px;
      cursor: grab;
      user-select: none;
      z-index: $layer-foreground-2;
    }
  }
}
</style>
