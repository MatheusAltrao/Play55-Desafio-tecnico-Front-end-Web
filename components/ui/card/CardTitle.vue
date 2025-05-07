<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'
import { defineProps } from 'vue'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <h3 data-slot="card-title" :class="cn('leading-none font-semibold', props.class)">
    <slot />
  </h3>
</template>
