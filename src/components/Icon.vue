<script lang="ts" setup>
const props = withDefaults(defineProps<{ name: string, size?: number }>(), { size: 22 })
</script>
<template>
  <svg :width="size" :height="size" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
    <template v-if="name==='gear'"><path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9"/></template>
    <template v-else-if="name==='close'"><path d="M18 6L6 18M6 6l12 12"/></template>
    <template v-else-if="name==='plus'"><path d="M12 5v14M5 12h14"/></template>
    <template v-else-if="name==='minus'"><path d="M5 12h14"/></template>
    <template v-else-if="name==='reset'"><path d="M3 12a9 9 0 1 0 3-6.7"/><path d="M3 3v6h6"/></template>
    <template v-else-if="name==='agenda'"><path d="M4 6h16M4 12h16M4 18h10"/></template>
    <template v-else-if="name==='credits'"><circle cx="12" cy="12" r="9"/><path d="M8 12h8M10 8h4M10 16h4"/></template>
    <template v-else-if="name==='clicks'"><path d="M12 3v18M3 12h18"/></template>
    <template v-else-if="name==='tags'"><path d="M10 3l9 9-7 7-9-9V3z"/><circle cx="8" cy="8" r="2"/></template>
    <template v-else-if="name==='badpub'"><path d="M3 4h18v5H3z"/><path d="M6 9v7a4 4 0 0 0 4 4h4a4 4 0 0 0 4-4V9"/></template>
    <template v-else-if="name==='neuro'"><circle cx="12" cy="12" r="6"/><circle cx="9" cy="10" r="1.5"/><circle cx="15" cy="12" r="1.5"/><circle cx="11" cy="15" r="1.5"/></template>
    <template v-else-if="name==='mu'"><rect x="3" y="6" width="18" height="12" rx="2"/><path d="M7 10h2v4H7zM11 10h2v4h-2zM15 10h2v4h-2z"/></template>
    <template v-else><circle cx="12" cy="12" r="10"/></template>
  </svg>
</template>
