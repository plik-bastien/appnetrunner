<script lang="ts" setup>
const props = defineProps<{ open: boolean, title?: string, message?: string }>()
const emit = defineEmits<{ (e:'confirm'): void, (e:'cancel'): void }>()

function onBg(){ emit('cancel') }
</script>

<template>
  <div v-if="open" class="fixed inset-0 z-50 flex items-center justify-center">
    <div class="cp-modal-backdrop" @click="onBg"></div>
    <div class="cp-modal relative mx-4 w-full max-w-md">
      <header class="mb-4 flex items-center justify-between">
        <h3 class="cp-title">{{ title || 'Confirmation' }}</h3>
        <button class="cp-panel px-3 py-1" @click="emit('cancel')">Fermer</button>
      </header>
      <p class="mb-5 text-sm opacity-90">{{ message || 'Êtes-vous sûr ?' }}</p>
      <div class="flex items-center justify-end gap-2">
        <button class="cp-panel px-3 py-2" @click="emit('cancel')">Annuler</button>
        <button class="cp-panel px-3 py-2" @click="emit('confirm')">Réinitialiser</button>
      </div>
    </div>
  </div>
</template>
