import axios from 'axios'

export const state = () => ({
  form: {
    name: '',
    monthPayment: 0,
    time: 0,
  },
  interest: 0.00517,
  total: 0,
})

export const mutations = {
  SET_FORM(state, form) {
    state.form = form
  },

  SET_TOTAL(state, total) {
    state.total = total
  },

  SET_INTEREST(state, interest) {
    state.interest = interest
  },
}

export const actions = {
  async getTotal({ commit, state }) {
    const {
      form: { monthPayment, time },
      interest,
    } = state

    const { data: total } = await axios({
      method: 'POST',
      url: 'http://api.mathjs.org/v4/',
      data: {
        expr: `${monthPayment} * (((1 + ${interest}) ^ ${time} - 1) / ${interest}`,
      },
    })

    commit('SET_TOTAL', total.result)
  },
}
