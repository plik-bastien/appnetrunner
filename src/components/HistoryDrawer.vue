<script lang="ts" setup>
import { useGameStore } from '../stores/game'
const g = useGameStore()
</script>
<template>
  <aside class="fixed bottom-0 left-0 right-0 bg-black/40 backdrop-blur border-t border-white/10 p-3">
    <div class="flex items-center justify-between">
      <div class="text-sm opacity-80">Historique ({{ g.log.length }})</div>
      <button class="btn" @click="g.resetAll()">Réinitialiser</button>
    </div>
    <div class="mt-2 max-h-40 overflow-auto text-xs space-y-1">
      <div v-for="(l,i) in g.log.slice().reverse()" :key="i" class="opacity-80">
        {{ new Date(l.ts).toLocaleTimeString() }} — {{ l.side }} — {{ l.action }} {{ l.delta ?? '' }}
      </div>
    </div>
  </aside>
</template>
