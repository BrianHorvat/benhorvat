<template>
	<div class="checkbox-field">
		<label :for="id">
			<input
				:id="id"
				type="checkbox"
				:name="name"
				:value="value"
				:required="required"
				:disabled="disabled"
				:checked="isChecked"
				@change="onChange"
			/>
			<div class="checkbox-box" :class="{ checked: isChecked }">
				<div v-if="isChecked" class="checkbox-check"></div>
			</div>
			<span class="checkbox-label">
				<slot></slot>
			</span>
		</label>
	</div>
</template>

<script>
export default {
	model: {
		prop: "model",
		event: "change"
	},

	props: {
		id: {
			type: String,
			default: function() {
				return "checkbox-" + this._uid;
			}
		},
		name: {
			type: String,
			default: null
		},
		value: {
			type: undefined,
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

		model: {
			type: undefined,
			default: false
		},

		true: {
			type: undefined,
			default: true
		},
		false: {
			type: undefined,
			default: false
		}
	},

	computed: {
		isChecked() {
			if (this.model instanceof Array) {
				return this.model.includes(this.value);
			}

			return this.modelValue === this.true;
		}
	},

	methods: {
		onChange(event) {
			if (this.model instanceof Array) {
				if (event.target.checked) {
					this.$emit("change", [...this.model, this.value]);
				} else {
					this.$emit(
						"change",
						this.model.filter(value => value !== this.value)
					);
				}
			} else {
				this.$emit(
					"change",
					event.target.checked ? this.true : this.false
				);
			}
		}
	}
};
</script>
