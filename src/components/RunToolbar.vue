<script lang="ts" setup>
import { useGameStore } from '../stores/game'
const g = useGameStore()
</script>
<template>
  <div class="fixed bottom-20 left-0 right-0 max-w-md mx-auto px-4">
    <div class="card flex gap-2">
      <button class="btn-secondary flex-1" @click="g.log('corp','Lancer un run')">Lancer un run (MP active)</button>
      <button class="btn-primary" @click="g.inc('corp','advancement',1)">+1 Avancement</button>
    </div>
  </div>
</template>
