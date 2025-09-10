<script lang="ts" setup>
import { useGameStore } from '../stores/game'
const g = useGameStore()
</script>

<template>
  <div class="px-4 py-2 border-t border-b border-white/10 bg-black/20">
    <div class="flex items-center justify-between">
      <div>
        <div class="text-xs opacity-70">Tour {{ g.turn.turnNumber }}</div>
        <div class="text-lg">
          <span v-if="g.turn.active==='corp'" class="text-corp font-semibold">Corporation</span>
          <span v-else class="text-runner font-semibold">Runner</span>
          <span> à jouer</span>
        </div>
      </div>
      <button class="btn" @click="g.endTurn()">Fin du tour</button>
    </div>
  </div>
</template>
