<template>
  <div class="range">
    <div class="range__valor">R$ 200</div>
    <div class="range__slider">
      <div class="range__slider__grabber">...</div>
    </div>
  </div>
</template>

<script>
export default {}
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
  }

  &__slider {
    width: 33%;
    height: 3em;
    border-radius: 15px;
    background: #334;
    position: relative;

    &__grabber {
      position: absolute;
      font-weight: bold;
      color: #fff;
      height: 3em;
      width: 5%;
      right: 0px;
    }
  }
}
</style>
