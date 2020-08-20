<template>
  <div class="total gradient-background">
    <div class="total__message">
      <h1>Olá {{ form.name.length > 0 ? form.name : 'estranho' }}!</h1>
      <p>
        Juntando {{ currency(form.monthPayment) }} todo mês, você terá
        {{ currency(total) }} em {{ form.time }} meses
      </p>
    </div>
    <div class="total__actions">
      <button class="button" @click="$router.push('/')">Voltar</button>
    </div>
  </div>
</template>

<script>
import gsap from 'gsap'
import { mapActions, mapState } from 'vuex'
import { currency } from '@/utils/format'

export default {
  computed: {
    ...mapState(['total', 'form']),
  },

  mounted() {
    this.getTotal()
    gsap.fromTo('.total *', { opacity: 0 }, { opacity: 1 })
  },

  methods: {
    currency,
    ...mapActions(['getTotal']),
  },

  transition: {
    css: false,
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/variables.scss';

.total {
  height: calc(100vh - 10rem);
  padding: 5rem;
  color: #fff;

  @media #{$screen-xs} {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: calc(100vh);
    padding: 0rem 3rem;

    h1 {
      margin-top: 0px;
    }
  }

  &__actions {
    button {
      background: #fffd;
      color: $primary-color;

      @media #{$screen-xs} {
        margin-top: 5rem;
      }
    }
  }
}
</style>
