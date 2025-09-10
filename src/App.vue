<script lang="ts" setup>
import { ref } from 'vue'
import SideBoard from './components/SideBoard.vue'
import ConfirmModal from './components/ConfirmModal.vue'
import { useGameStore } from './stores/game'
const g = useGameStore()
const askReset = ref(false)
function doReset(){ g.reset(); askReset.value = false }
</script>

<template>
  <main class="main-screen relative">
    <!-- Corpo en haut, inversée pour l'adversaire -->
    <section class="half-corp border-b border-white/10 rotate-180 bg-corp-skin theme-corp">
      <div class="section-inner">
        <div class="side-wrap">
          <SideBoard side="corp"/>
        </div>
      </div>
    </section>

    <!-- Bandeau central -->
    <div class="mid-banner">
      <div class="mid-banner__title">Android Netrunner</div>
      <div class="mid-banner__reset">
        <button class="mid-banner__btn" @click="askReset = true" aria-label="Réinitialiser la partie">↺</button>
      </div>
    </div>

    <!-- Runner en bas (rouge) -->
    <section class="half-runner bg-runner-skin theme-runner">
      <div class="section-inner">
        <div class="side-wrap">
          <SideBoard side="runner"/>
        </div>
      </div>
    </section>

    <ConfirmModal
      :open="askReset"
      title="Réinitialiser la partie"
      message="Ceci remettra tous les compteurs à zéro pour les deux camps."
      @confirm="doReset"
      @cancel="askReset=false"
    />
  </main>
</template>
