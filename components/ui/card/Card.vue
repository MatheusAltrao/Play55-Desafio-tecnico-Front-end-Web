<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { cn } from "@/lib/utils";
import { defineProps } from 'vue'

const props = defineProps<{
  class?: HTMLAttributes["class"];
}>();
</script>

<template>
  <div data-slot="card"
    :class="cn('bg-card text-card-foreground flex flex-col gap-6 w-full max-w-[400px] rounded-xl border py-6 shadow-sm', props.class)">
    <slot />
  </div>
</template>
