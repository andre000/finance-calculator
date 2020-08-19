<template>
  <form class="form" @submit.prevent="handleSubmit">
    <div class="form__field">
      <label>
        Nome
        <input v-model="form.name" type="text" class="input" />
      </label>
    </div>
    <div class="form__field">
      <input-range
        v-model.number="form.monthPayment"
        label="Mensalidade"
        currency
        :limit="1000"
        :step="50"
      ></input-range>
    </div>
    <div class="form__field">
      <input-range
        v-model.number="form.time"
        label="Tempo (Mês)"
        stop-at-limit
        :limit="36"
        :step="1"
      ></input-range>
    </div>

    <button type="submit" class="form__submit button">
      Calcular
    </button>
  </form>
</template>

<script>
export default {
  data: () => ({
    form: {
      name: '',
      monthPayment: 200,
      time: 6,
    },
  }),

  mounted() {
    this.resetForm()
  },

  methods: {
    resetForm() {
      this.form = {
        name: '',
        monthPayment: 200,
        time: 6,
      }
    },

    handleSubmit() {
      this.$emit('submit', { ...this.form })
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/variables.scss';

.form {
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  gap: 1rem;

  &__submit {
    background: $primary-color;
  }
}
</style>
