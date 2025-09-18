<script lang="ts" setup>
import { onMounted, ref } from 'vue'

const props = withDefaults(defineProps<{
  logoSrc?: string
  minDurationMs?: number
  showScanlines?: boolean
  oncePerSession?: boolean
}>(), {
  logoSrc: '/logo/netrunnerlogo.png',
  minDurationMs: 1100,
  showScanlines: true,
  oncePerSession: false
})

const visible = ref(true)
function hide() {
  setTimeout(() => { visible.value = false }, 280)
  if (props.oncePerSession) sessionStorage.setItem('splashSeen', '1')
}
function skip() { hide() }
onMounted(() => {
  if (props.oncePerSession && sessionStorage.getItem('splashSeen')==='1') { visible.value = false; return }
  setTimeout(() => hide(), props.minDurationMs)
})
</script>

<template>
  <transition name="splash-fade">
    <div v-if="visible"
         class="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-[#05090d]">
      <div class="absolute inset-0 pointer-events-none"
           style="background: radial-gradient(60% 50% at 50% 50%, rgba(0,229,255,0.08), transparent 60%),
                          radial-gradient(50% 40% at 50% 80%, rgba(255,45,45,0.08), transparent 60%);"></div>
      <div v-if="showScanlines" class="absolute inset-0 pointer-events-none splash-scanlines"></div>
      <div class="relative cp-panel p-6 sm:p-8 text-center w-[78%] max-w-[520px]">
        <div class="flex items-center justify-center">
          <img :src="logoSrc" alt="Android Netrunner" class="w-[240px] sm:w-[300px] opacity-95 select-none" draggable="false" />
        </div>
        <div class="mt-4 text-[11px] tracking-[0.24em] uppercase text-slate-300/80">initialisation du runner</div>
        <div class="mt-2 h-1 overflow-hidden rounded bg-white/10">
          <div class="h-full w-0 splash-bar"></div>
        </div>
        <button class="mt-4 cp-panel px-3 py-1 text-[11px] uppercase tracking-widest"
                @click="skip">passer</button>
      </div>
    </div>
  </transition>
</template>

<style scoped>
.splash-scanlines {
  background-image:
    linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0,229,255,0.06), rgba(252,238,9,0.06), rgba(0,229,255,0.06));
  background-size: 100% 3px, 100% 100%;
  mix-blend-mode: overlay;
  animation: scan 6s linear infinite;
}
@keyframes scan {
  0% { background-position: 0 0, 0 0; }
  100% { background-position: 0 100%, 0 0; }
}
.splash-bar {
  background: linear-gradient(90deg, rgba(252,238,9,0.95), rgba(0,229,255,0.95));
  animation: load 1.1s ease forwards;
}
@keyframes load {
  from { width: 0%; }
  to   { width: 100%; }
}
</style>
