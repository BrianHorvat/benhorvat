<template>
  <div class="radio-field">
    <label :for="id">
      <input
        type="radio"
        :id="id"
        :name="name"
        :value="value"
        :class="className"
        :required="required"
        :disabled="disabled"
        :checked="checked"
        @change="onChange"
      >
      <div :class="dotClass">
        <div v-if="checked" class="radio-dot-checked"></div>
      </div>
      <span class="radio-label">
        <slot></slot>
      </span>
    </label>
  </div>
</template>

<script>
export default {
  model: {
    prop: 'state',
    event: 'change'
  },

  props: {
    id: {
      type: String,
      default: function () {
        return 'radio-id-' + this._uid;
      }
    },
    name: {
      type: String,
      default: null
    },
    value: {
      default: null
    },
    className: {
      type: String,
      default: null
    },
    required: {
      type: Boolean,
      default: null
    },
    disabled: {
      type: Boolean,
      default: null
    },
    state: {}
  },

  computed: {
    checked() {
      return this.state === this.value
    },
    dotClass() {
      return [
        'radio-dot',
        {
          checked: this.checked
        }
      ]
    }
  },

  methods: {
    onChange() {
      this.$emit('change', this.value)
    }
  }
}
</script>