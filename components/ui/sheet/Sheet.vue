<script setup lang="ts">
import { DialogRoot, type DialogRootEmits, type DialogRootProps, useForwardPropsEmits } from 'reka-ui'
import { defineProps } from 'vue'
import { defineEmits } from "vue";

const props = defineProps<DialogRootProps>()
const emits = defineEmits<DialogRootEmits>()

const forwarded = useForwardPropsEmits(props, emits)
</script>

<template>
  <DialogRoot data-slot="sheet" v-bind="forwarded">
    <slot />
  </DialogRoot>
</template>
