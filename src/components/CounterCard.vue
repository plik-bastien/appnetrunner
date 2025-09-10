<script lang="ts" setup>
import { computed } from 'vue'
const props = defineProps<{
  label: string
  value: number
  onInc?: () => void
  onDec?: () => void
  accent?: 'corp'|'runner'|'neutral'
  subtitle?: string
}>()
const ring = computed(() => props.accent==='corp' ? 'ring-corp' : props.accent==='runner' ? 'ring-runner' : 'ring-slate-400')
</script>

<template>
  <div class="card flex items-center gap-4">
    <div class="flex-1">
      <div class="text-sm opacity-80">{{ label }}</div>
      <div class="text-3xl font-extrabold">{{ value }}</div>
      <div v-if="subtitle" class="text-xs opacity-70 mt-1">{{ subtitle }}</div>
    </div>
    <div class="flex items-center gap-2">
      <button class="btn" :class="ring" @click="onDec?.()">−</button>
      <button class="btn" :class="ring" @click="onInc?.()">＋</button>
    </div>
  </div>
</template>
