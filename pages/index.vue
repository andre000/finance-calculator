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

      const transitionEnter =
        window.screen.width > 480
          ? { gridTemplateColumns: '100vw 0vw' }
          : { gridTemplateRows: '100vh 0vh' }

      const transitionLeave =
        window.screen.width > 480
          ? { gridTemplateColumns: '33vw 77vw' }
          : { gridTemplateRows: '4fr 6fr' }

      gsap.fromTo(page, transitionEnter, {
        ...transitionLeave,
        duration: 1,
        delay: 1,
      })

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
            page.removeAttribute('style')
          },
        }
      )
    },

    animateLeave() {
      const page = document.querySelector('.index')
      const head = document.querySelector('.index__head')
      const body = document.querySelector('.index__body')

      const transitionLeave =
        window.screen.width > 480
          ? { gridTemplateColumns: '100vw 0vw' }
          : { gridTemplateRows: '100vh 0vh' }

      const transitionEnter =
        window.screen.width > 480
          ? { gridTemplateColumns: '33vw 77vw' }
          : { gridTemplateRows: '4fr 6fr' }

      return new Promise((resolve) => {
        gsap.fromTo(page, transitionEnter, {
          ...transitionLeave,
          duration: 1,
          delay: 0.5,
          clearProps: 'all',
          onComplete() {
            page.removeAttribute('style')
            resolve(true)
          },
        })

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

  @media #{$screen-xs} {
    overflow-y: auto;
    grid-template-columns: 100vw;
    grid-template-rows: 4fr 6fr;
    grid-template-areas:
      'head'
      'body';
  }

  &.enter {
    grid-template-columns: 100vw 0vw;
    @media #{$screen-xs} {
      grid-template-rows: 100vh 0vh;
    }
  }

  &__head {
    grid-area: head;
    padding: 5rem;
    color: #ffffff;

    @media #{$screen-sm} {
      padding: 5rem 1rem;
    }

    @media #{$screen-xs} {
      padding: 2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
    }

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

    @media #{$screen-xs} {
      padding: 2rem;
      display: flex;
      align-items: center;
      flex-direction: column;
      margin-bottom: 1rem;
    }
  }
}
</style>
;
