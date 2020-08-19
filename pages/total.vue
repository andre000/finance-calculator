<template>
  <div class="total gradient-background">
    <div class="total__message">
      <h1>Total</h1>
    </div>
    <div class="total__actions">
      <button class="button" @click="$router.push('/')">Voltar</button>
    </div>
  </div>
</template>

<script>
import gsap from 'gsap'
export default {
  mounted() {
    gsap.fromTo(
      '.total *',
      {
        opacity: 0,
      },
      {
        opacity: 1,
      }
    )
  },

  transition: {
    css: false,
  },
}
</script>

<style lang="scss" scoped>
.total {
  height: calc(100vh - 10rem);
  padding: 5rem;
  color: #fff;
}
</style>
