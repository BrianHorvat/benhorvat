<template>
	<div class="radio-field">
		<label :for="id">
			<input
				:id="id"
				type="radio"
				:name="name"
				:value="value"
				:required="required"
				:disabled="disabled"
				:checked="checked"
				@change="onChange"
			/>
			<div class="radio-dot" :class="{ checked }">
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
		prop: "state",
		event: "change"
	},

	props: {
		id: {
			type: String,
			default: function() {
				return "radio-" + this._uid;
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
		state: {
			type: undefined,
			default: null
		}
	},

	computed: {
		checked() {
			return this.state === this.value;
		},
		dotClass() {
			return [
				"radio-dot",
				{
					checked: this.checked
				}
			];
		}
	},

	methods: {
		onChange() {
			this.$emit("change", this.value);
		}
	}
};
</script>
