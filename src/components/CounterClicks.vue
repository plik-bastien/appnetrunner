<script lang="ts" setup>
const props = defineProps<{ side:'runner'|'corp', clicks:number }>()
</script>
<template>
  <div class="card">
    <div class="flex items-center justify-between">
      <span class="text-sm opacity-80">Clics ({{ side==='corp'?3:4 }})</span>
      <div class="flex gap-2">
        <div v-for="i in (side==='corp'?3:4)" :key="i"
             class="w-8 h-8 rounded-full border border-white/20"
             :class="{'bg-white/20': i<=clicks}"/>
      </div>
    </div>
  </div>
</template>
