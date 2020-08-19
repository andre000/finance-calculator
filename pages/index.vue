<template>
  <div class="index enter">
    <div class="index__head gradient-background">
      <h1 class="index__head__title">Simulador Financeiro</h1>
      <span class="index__head__description">
        Insira um valor mensal e o tempo de investimento
      </span>
    </div>
    <div class="index__body">
      <calc-form @submit="handleSubmit"></calc-form>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import gsap from 'gsap'

export default {
  mounted() {
    this.SET_FORM({
      name: '',
      monthPayment: 0,
      time: 0,
    })

    this.SET_TOTAL(0)
    this.animateEnter()
  },

  methods: {
    async handleSubmit(form) {
      await this.animateLeave()
      this.SET_FORM(form)
      this.$router.push('/total')
    },

    animateEnter() {
      const page = document.querySelector('.index')
      const head = document.querySelector('.index__head')
      const body = document.querySelector('.index__body')

      gsap.fromTo(
        page,
        {
          gridTemplateColumns: '100vw 0vw',
        },
        {
          gridTemplateColumns: '33vw 77vw',
          duration: 1,
          delay: 1,
        }
      )

      gsap.fromTo(
        [...head.children, ...body.children],
        {
          opacity: 0,
        },
        {
          opacity: 1,
          delay: 2,
          onComplete() {
            page.classList.remove('enter')
          },
        }
      )
    },

    animateLeave() {
      const page = document.querySelector('.index')
      const head = document.querySelector('.index__head')
      const body = document.querySelector('.index__body')

      return new Promise((resolve) => {
        gsap.fromTo(
          page,
          {
            gridTemplateColumns: '33vw 77vw',
          },
          {
            gridTemplateColumns: '100vw 0vw',
            duration: 1,
            delay: 0.5,
            onComplete() {
              resolve(true)
            },
          }
        )

        gsap.fromTo(
          [...head.children, ...body.children],
          {
            opacity: 1,
          },
          {
            opacity: 0,
          }
        )
      })
    },
    ...mapMutations(['SET_FORM', 'SET_TOTAL']),
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/variables.scss';

.index {
  display: grid;
  grid-template-columns: 33vw 77vw;
  grid-template-rows: 1fr;
  gap: 1px 1px;
  grid-template-areas: 'head body';
  min-height: 100vh;
  overflow: hidden;

  &.enter {
    grid-template-columns: 100vw 0vw;
  }

  &__head {
    grid-area: head;
    padding: 5rem;
    color: #ffffff;

    &__title {
      .enter & {
        opacity: 0;
      }
      margin: 0px 0px 1.5rem;
      font-size: 2.5rem;
      font-weight: 900;
    }

    &__description {
      .enter & {
        opacity: 0;
      }
      color: #eeeeee;
      font-weight: 100;
    }
  }

  &__body {
    padding: 5rem;
    grid-area: body;
  }
}
</style>
;
