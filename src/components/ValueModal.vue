
<script lang="ts" setup>
const props = defineProps<{open:boolean,title:string,value:number}>()
const emit = defineEmits<{(e:'close'):void,(e:'inc',delta:number):void}>()
</script>
<template>
  <div v-if="open" class="side-modal">
    <div class="side-modal-backdrop" @click="emit('close')"></div>
    <div class="cp-modal relative mx-4 w-full max-w-md z-10">
      <header class="mb-4 flex items-center justify-between">
        <h3 class="cp-title">{{ title }}</h3>
        <button class="cp-panel px-3 py-1" @click="emit('close')">Fermer</button>
      </header>
      <div class="flex items-center justify-between">
        <button class="cp-panel text-2xl px-4 py-2" @click="emit('inc',-1)">−</button>
        <div class="font-mono text-6xl">{{ value }}</div>
        <button class="cp-panel text-2xl px-4 py-2" @click="emit('inc',+1)">＋</button>
      </div>
    </div>
  </div>
</template>
