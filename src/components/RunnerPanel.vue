<script lang="ts" setup>
import CounterCard from './CounterCard.vue'
import CounterClicks from './CounterClicks.vue'
import { useGameStore } from '../stores/game'
const g = useGameStore()
</script>

<template>
  <div class="space-y-4">
    <CounterCard label="Points de projet" :value="g.runner.agendaPoints" accent="runner"
                 :onInc="() => g.inc('runner','agendaPoints',1)" :onDec="() => g.inc('runner','agendaPoints',-1)"/>
    <CounterCard label="Crédits" :value="g.runner.credits" accent="runner"
                 :onInc="() => g.inc('runner','credits',1)" :onDec="() => g.inc('runner','credits',-1)"/>
    <CounterClicks side="runner" :clicks="g.runner.clicks" />
    <CounterCard label="Tags" :value="g.runner.tags" accent="runner"
                 :onInc="() => g.inc('runner','tags',1)" :onDec="() => g.inc('runner','tags',-1)"/>
    <CounterCard label="Virus" :value="g.runner.virus" accent="runner"
                 :onInc="() => g.inc('runner','virus',1)" :onDec="() => g.inc('runner','virus',-1)"/>
    <div class="grid grid-cols-3 gap-3">
      <CounterCard label="Hémo" :value="g.runner.damage.hemo" accent="runner"
                   :onInc="() => g.incDamage('hemo',1)" :onDec="() => g.incDamage('hemo',-1)"/>
      <CounterCard label="Réseau" :value="g.runner.damage.reseau" accent="runner"
                   :onInc="() => g.incDamage('reseau',1)" :onDec="() => g.incDamage('reseau',-1)"/>
      <CounterCard label="Neuro" :value="g.runner.damage.neuro" accent="runner" :subtitle="`Main max ${g.runnerHandMax}`"
                   :onInc="() => g.incDamage('neuro',1)" :onDec="() => g.incDamage('neuro',-1)"/>
    </div>
  </div>
</template>
