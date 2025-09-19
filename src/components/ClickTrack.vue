<script lang="ts" setup>
const props = withDefaults(
  defineProps<{ value: number; max: number }>(),
  { value: 0, max: 4 }
)
const emit = defineEmits<{ (e: 'update', v: number): void }>()

function onPick(idx: number) {
  // Toggle contigu :
  // - Si idx > value : monte à idx (allume 1..idx)
  // - Si idx === value : baisse à idx-1 (éteint juste le plus haut)
  // - Si idx < value : réduit à idx (garde 1..idx)
  if (idx > props.value) emit('update', idx)
  else if (idx === props.value) emit('update', Math.max(0, idx - 1))
  else emit('update', idx)

  // Haptique léger si dispo
  try { (navigator as any)?.vibrate?.(10) } catch {}
}

// Accessibilité clavier (Entrée / Espace)
function onKey(e: KeyboardEvent, idx: number) {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault()
    onPick(idx)
  }
}
</script>

<template>
  <div class="cp-panel px-2 py-2">
    <div class="flex items-center justify-between gap-3 w-full">
      <!-- LABEL EXTERNE (texte ou icône) -->
      <span class="cp-title shrink-0">
        <slot name="label">CLICS</slot>
      </span>

      <!-- BOUTONS DE CLICS -->
      <div class="flex items-center gap-3 shrink-0" role="group" aria-label="Sélecteur de clics">
        <button
          v-for="i in max"
          :key="i"
          type="button"
          class="h-12 w-12 sm:h-14 sm:w-14 rounded cp-panel relative overflow-hidden transition focus:outline-none focus:ring-2 focus:ring-cpAccent/60"
          :class="{'ring-1 ring-cpAccent/40': value===i}"
          :aria-pressed="value >= i"
          :aria-label="`Définir ${i} clic${i>1?'s':''}`"
          @click="onPick(i)"
          @keydown="onKey($event, i)"
        >
          <div
            class="absolute inset-0"
            :style="{ opacity: value >= i ? 1 : 0.18 }"
            :class="['bg-gradient-to-b', 'from-cpAccent/50', 'to-cpAccent/20']"
          ></div>
          <div class="relative text-xs font-mono opacity-70 select-none">{{ i }}</div>
        </button>
      </div>
    </div>
  </div>
</template>
