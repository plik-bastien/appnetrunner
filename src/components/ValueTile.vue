<script lang="ts" setup>
const props = withDefaults(defineProps<{label:string,value:number, active?: boolean}>(), { active: false })
</script>
<template>
  <div class="cp-panel p-2 cursor-pointer transition will-change-transform"
       :class="{'tile-pressed': active}" role="button">
    <div class="flex items-center justify-between">
      <span class="cp-title">{{ label }}</span>
      <span class="text-xl font-mono">{{ value }}</span>
    </div>
    <div class="separator mt-1"></div>
  </div>
</template>
