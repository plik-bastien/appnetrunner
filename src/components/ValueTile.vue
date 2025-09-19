<script setup lang="ts">
const props = withDefaults(defineProps<{ label?: string; value: number; active?: boolean }>(), {
  label: '',
  active: false
})
</script>

<template>
  <div class="cp-panel p-2 cursor-pointer" :class="{ 'tile-pressed': active }">
    <div class="flex items-center justify-between">
      <span class="cp-title">
        <slot name="label">{{ props.label }}</slot>
      </span>
      <span class="text-xl font-mono">{{ value }}</span>
    </div>
    <div class="separator mt-1"></div>
  </div>
</template>
