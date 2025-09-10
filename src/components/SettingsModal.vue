<script lang="ts" setup>
import { useGameStore } from '../stores/game'
import Icon from './Icon.vue'
const props = defineProps<{ open: boolean }>() 
const emit = defineEmits<{ (e:'close'): void }>() 
const g = useGameStore()
function resetAll(){ g.reset(); emit('close') }
</script>
<template>
  <div v-if="open" class="fixed inset-0 z-50 flex items-center justify-center">
    <div class="cp-modal-backdrop" @click="emit('close')" aria-label="Fermer"></div>
    <div class="cp-modal relative mx-4 w-full max-w-md">
      <header class="mb-3 flex items-center justify-between">
        <h3 class="cp-title">Paramètres</h3>
        <button class="cp-panel px-3 py-1" @click="emit('close')" aria-label="Fermer">
          <Icon name="close" :size="18" />
        </button>
      </header>
      <div class="space-y-3">
        <button class="cp-panel p-3 w-full flex items-center justify-center gap-2" @click="resetAll" aria-label="Réinitialiser">
          <Icon name="reset" :size="20" /><span class="sr-only">Réinitialiser</span>
        </button>
      </div>
    </div>
  </div>
</template>
