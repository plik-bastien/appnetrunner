<script lang="ts" setup>
import { ref, onMounted } from 'vue'

import SideBoard from './components/SideBoard.vue'
import ConfirmModal from './components/ConfirmModal.vue'
import SplashScreen from './components/SplashScreen.vue'
import { useGameStore } from './stores/game'
const g = useGameStore()
const askReset = ref(false)
function doReset(){ g.reset(); askReset.value = false }

const menuOpen = ref(false)
const confirmReset = ref(false)
const isSwapped = ref(false)
onMounted(()=>{ isSwapped.value = localStorage.getItem('nr-swap')==='1' })
function toggleSwap(){ isSwapped.value = !isSwapped.value; localStorage.setItem('nr-swap', isSwapped.value?'1':'0'); menuOpen.value=false }
function openReset(){ menuOpen.value=false; confirmReset.value=true }

</script>

<template>
  <SplashScreen :once-per-session="false" />
  <main class="main-screen relative" :class="{ 'is-swapped': isSwapped }">

    <template v-if="!isSwapped">
      <!-- Runner first (left in landscape) -->
      <section class="half-runner bg-runner-skin theme-runner">
        <div class="section-inner">
          <div class="rotor-wrap">
            <div class="rotor rotor--runner">
              <div class="side-wrap">
                <SideBoard side="runner"/>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div class="mid-banner">
        <div class="mid-banner__gear">
          <button class="mid-banner__btn" @click="menuOpen = true" aria-label="Menu">☰</button>
        </div>
        <div class="mid-banner__title">Android Netrunner</div>
      </div>

      <section class="half-corp bg-corp-skin theme-corp border-t border-white/10">
        <div class="section-inner">
          <div class="rotor-wrap">
            <div class="rotor rotor--corp">
              <div class="side-wrap">
                <SideBoard side="corp"/>
              </div>
            </div>
          </div>
        </div>
      </section>
    </template>
    <template v-else>
      <!-- Corpo first (left in landscape) -->
      <section class="half-corp bg-corp-skin theme-corp border-t border-white/10">
        <div class="section-inner">
          <div class="rotor-wrap">
            <div class="rotor rotor--corp">
              <div class="side-wrap">
                <SideBoard side="corp"/>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div class="mid-banner">
        <div class="mid-banner__gear">
          <button class="mid-banner__btn" @click="menuOpen = true" aria-label="Menu">☰</button>
        </div>
        <div class="mid-banner__title">Android Netrunner</div>
      </div>

      <section class="half-runner bg-runner-skin theme-runner">
        <div class="section-inner">
          <div class="rotor-wrap">
            <div class="rotor rotor--runner">
              <div class="side-wrap">
                <SideBoard side="runner"/>
              </div>
            </div>
          </div>
        </div>
      </section>
    </template>

<ConfirmModal
      :open="askReset"
      title="Réinitialiser la partie"
      message="Ceci remettra tous les compteurs à zéro pour les deux camps."
      @confirm="doReset"
      @cancel="askReset=false"
    />
  
    <div v-if="menuOpen" class="fixed inset-0 z-50 flex items-center justify-center">
      <div class="fixed inset-0 bg-black/70" @click="menuOpen=false"></div>
      <div class="cp-panel relative mx-4 w-full max-w-sm p-4 z-10">
        <header class="mb-3 flex items-center justify-between">
          <h3 class="cp-title">Menu</h3>
          <button class="cp-panel px-2 py-1" @click="menuOpen=false">Fermer</button>
        </header>
        <div class="space-y-2">
          <button class="cp-panel w-full px-3 py-3" @click="toggleSwap()">Inverser Runner / Corporation</button>
          <button class="cp-panel w-full px-3 py-3" @click="openReset()">Réinitialiser la partie…</button>
        </div>
      </div>
    </div>

    <ConfirmModal
      :open="askReset || confirmReset"
      title="Réinitialiser la partie"
      message="Ceci remettra tous les compteurs à zéro pour les deux camps."
      @confirm="doReset(); confirmReset=false"
      @cancel="askReset=false; confirmReset=false"
    />
  </main>
</template>
