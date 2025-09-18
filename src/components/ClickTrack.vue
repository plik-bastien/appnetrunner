<script lang="ts" setup>
const props = withDefaults(defineProps<{ value: number, max: number }>(), { value: 0, max: 4 })
const emit = defineEmits<{ (e:'update', v:number): void }>()

function onPick(idx:number){
  if (props.value === idx && idx === 1) emit('update', 0)
  else emit('update', idx)
}
</script>

<template>
  <div class="cp-panel px-2 py-2">
    <div class="flex items-center justify-between gap-3 w-full">
      <span class="cp-title shrink-0">CLICS</span>
      <div class="flex items-center gap-3 shrink-0">
        <button v-for="i in max" :key="i"
                class="h-12 w-12 sm:h-14 sm:w-14 rounded cp-panel relative overflow-hidden transition"
                :class="{'ring-1 ring-cpAccent/40': value===i}"
                @click="onPick(i)">
          <div class="absolute inset-0" :style="{opacity: value>=i ? 1 : 0.18}"
               :class="['bg-gradient-to-b', 'from-cpAccent/50', 'to-cpAccent/20']"></div>
          <div class="relative text-xs font-mono opacity-70">{{ i }}</div>
        </button>
      </div>
    </div>
  </div>
</template>
