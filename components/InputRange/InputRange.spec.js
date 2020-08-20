import { createLocalVue, shallowMount } from '@vue/test-utils'
import InputRange from './InputRange.vue'

describe('InputRange component', () => {
  const localVue = createLocalVue()
  let wrapper

  beforeAll(() => {
    Object.defineProperties(window.HTMLElement.prototype, {
      offsetWidth: {
        get() {
          return parseFloat(window.getComputedStyle(this).width) || 0
        },
      },
    })
  })

  beforeEach(() => {
    wrapper = shallowMount(InputRange, {
      localVue,
      propsData: {
        value: 1000,
        limit: 10000,
        step: 5,
      },
    })
  })

  it('should mount component with its current value on display ', () => {
    expect(wrapper.html()).toMatch(/1000/)
  })

  it('should have range with width proportional to its value/limit', () => {
    expect(wrapper.vm.slider).toBe(10)
  })

  it('should show an input when user click on value', async () => {
    wrapper.find('span').trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.find('input[type="number"]').exists()).toBe(true)
  })

  it('should format value as currency when related prop is true', async () => {
    wrapper.setProps({
      currency: true,
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.find('.range__valor').text()).toMatch(/R\$.+1.000,00/)
  })

  it('should display label when its prop has a value', async () => {
    wrapper.setProps({
      label: 'Label',
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.find('label').text()).toBe('Label')
  })

  it('should change value when dragging range', async () => {
    const event = { x: 20 }
    const spy = jest.fn()
    wrapper.vm.$emit = spy

    wrapper.find('.range').element.style.width = '100px'
    wrapper.find('.range__slider__grabber').trigger('drag', event)
    await wrapper.vm.$nextTick()
    expect(spy.mock.calls[0][1]).toBe(2005)
  })
})
