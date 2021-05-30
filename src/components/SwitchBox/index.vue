<template>
  <div class="switch_box">
    <label class="text-lg font-semibold text-gray-700 dark:text-brand-secondary">
      {{ state.check ? props.checked.label : props.unchecked.label }}
    </label>
    <input
      id="phone-model"
      v-model="state.check"
      type="checkbox"
      name="phone-model"
    >
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, watch } from 'vue'

type Props = {
  checked: {
    value: string;
    label: string;
  };
  unchecked: {
    value: string;
    label: string;
  };
  value: string;
}

type State = {
  check: boolean;
}

export default defineComponent({
  props: {
    checked: {
      type: Object as () => Props['checked'],
      default: null,
      required: true
    },
    unchecked: {
      type: Object as () => Props['unchecked'],
      default: null,
      required: true
    },
    value: {
      type: String as () => Props['value'],
      default: ''
    }
  },
  emits: ['change'],
  setup (props: Props, { emit }) {
    const state = reactive<State>({
      check: props.value === props.checked.value
    })

    watch(() => state.check, () => {
      emit('change', state.check ? props.checked.value : props.unchecked.value)
    })

    return {
      state,
      props
    }
  }
})
</script>

<style>
.switch_box input[type='checkbox'] {
  font-size: 30px;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  width: 35px;
  height: 15px;
  background: #ddd;
  border-radius: 3em;
  position: relative;
  cursor: pointer;
  outline: none;
  -webkit-transition: all 0.2s ease-in-out;
  transition: all 0.2s ease-in-out;
  margin-left: 5px;
  top: 2px;
}

.switch_box input[type='checkbox']:checked {
  background: #27A1F9;
}

.switch_box input[type='checkbox']:after {
  position: absolute;
  content: '';
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background: #fff;
  -webkit-box-shadow: 0 0 0.25em rgba(0, 0, 0, 0.3);
  box-shadow: 0 0 0.25em rgba(0, 0, 0, 0.3);
  -webkit-transform: scale(0.7);
  transform: scale(0.7);
  left: 0;
  -webkit-transition: all 0.2s ease-in-out;
  transition: all 0.2s ease-in-out;
}

.switch_box input[type='checkbox']:checked:after {
  left: calc(100% - 15px);
}
</style>
