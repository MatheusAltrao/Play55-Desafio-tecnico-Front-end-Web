<script setup lang="ts">
import { SelectValue, type SelectValueProps } from 'reka-ui'
import { defineProps } from 'vue'

const props = defineProps<SelectValueProps>()
</script>

<template>
  <SelectValue data-slot="select-value" v-bind="props">
    <slot />
  </SelectValue>
</template>
