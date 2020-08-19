<template>
  <div ref="range" class="range">
    <div class="range__valor">{{ value }}</div>
    <div class="range__slider" :style="{ width: `${slider}%` }">
      <div class="range__slider__grabber" draggable="true" @drag="handleDrag">
        ...
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    slider: 10,
    value: 200,
  }),

  methods: {
    handleDrag(e) {
      if (e.clientX === 0) return false

      const rangeWidth = this.$refs.range.offsetWidth
      let pct = ((e.x - this.$refs.range.offsetLeft) / rangeWidth) * 100
      if (pct > 100) {
        pct = 100
      } else if (pct < 0) {
        pct = 0
      }

      this.slider = pct
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/variables.scss';

.range {
  width: 15rem;
  height: 3em;
  border-radius: 15px;
  background: #fafafa;
  position: relative;

  &__valor {
    font-size: 1rem;
    font-weight: bold;
    color: #fff;
    position: absolute;
    top: calc(50% - 0.5rem);
    left: 10px;
    z-index: $layer-foreground;
    mix-blend-mode: difference;
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
      width: 5%;
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
