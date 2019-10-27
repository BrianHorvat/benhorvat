<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="width"
    :height="height"
    :aria-labelledby="iconName"
    role="presentation"
    viewBox="0 0 24 24"
  >
    <title :id="iconName" lang="en">{{ iconName }}</title>
    <!-- <g :fill="iconColor"> -->
    <slot></slot>
    <!-- </g> -->
  </svg>
</template>

<script>
export default {
  props: {
    iconName: {
      type: String,
      default: "box"
    },
    width: {
      type: [Number, String],
      default: 24
    },
    height: {
      type: [Number, String],
      default: 24
    },
    iconColor: {
      type: String,
      default: "currentColor"
    }
  }
};
</script>
