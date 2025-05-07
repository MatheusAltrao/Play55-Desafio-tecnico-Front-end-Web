<script setup lang="ts">
import { DialogClose, type DialogCloseProps } from 'reka-ui'
import { defineProps } from 'vue'

const props = defineProps<DialogCloseProps>()
</script>

<template>
  <DialogClose data-slot="dialog-close" v-bind="props">
    <slot />
  </DialogClose>
</template>
