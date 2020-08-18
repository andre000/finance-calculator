<template>
  <div class="index">
    <div class="index__head">
      <h1 class="index__head__title">Simulador Financeiro</h1>
      <span class="index__head__description">
        Insira um valor mensal e o tempo de investimento
      </span>
    </div>
    <div class="index__body">
      <input-range></input-range>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/variables.scss';

.index {
  display: grid;
  grid-template-columns: 0.33fr 0.77fr;
  grid-template-rows: 1fr;
  gap: 1px 1px;
  grid-template-areas: 'head body';
  min-height: 100vh;

  &__head {
    grid-area: head;
    padding: 5rem;
    color: #ffffff;
    background: linear-gradient(245deg, #2e8ce4, #5ccef0, #5c8df0);
    background-size: 600% 600%;

    -webkit-animation: AnimatedBackground 30s ease infinite;
    -moz-animation: AnimatedBackground 30s ease infinite;
    animation: AnimatedBackground 30s ease infinite;

    &__title {
      margin: 0px 0px 1.5rem;
      font-size: 2.5rem;
      font-weight: 900;
    }

    &__description {
      color: #eeeeee;
      font-weight: 100;
    }
  }

  &__body {
    padding: 5rem;
    grid-area: body;
    display: flex;
    justify-content: flex-start;
  }
}

@-webkit-keyframes AnimatedBackground {
  0% {
    background-position: 0% 84%;
  }
  50% {
    background-position: 100% 17%;
  }
  100% {
    background-position: 0% 84%;
  }
}
@-moz-keyframes AnimatedBackground {
  0% {
    background-position: 0% 84%;
  }
  50% {
    background-position: 100% 17%;
  }
  100% {
    background-position: 0% 84%;
  }
}
@keyframes AnimatedBackground {
  0% {
    background-position: 0% 84%;
  }
  50% {
    background-position: 100% 17%;
  }
  100% {
    background-position: 0% 84%;
  }
}
</style>
