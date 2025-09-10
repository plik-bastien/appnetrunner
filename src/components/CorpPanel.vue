<script lang="ts" setup>
import CounterCard from './CounterCard.vue'
import CounterClicks from './CounterClicks.vue'
import { useGameStore } from '../stores/game'
const g = useGameStore()
</script>

<template>
  <div class="space-y-4">
    <CounterCard label="Points de projet" :value="g.corp.agendaPoints" accent="corp"
                 :onInc="() => g.inc('corp','agendaPoints',1)" :onDec="() => g.inc('corp','agendaPoints',-1)"/>
    <CounterCard label="Crédits" :value="g.corp.credits" accent="corp"
                 :onInc="() => g.inc('corp','credits',1)" :onDec="() => g.inc('corp','credits',-1)"/>
    <CounterClicks side="corp" :clicks="g.corp.clicks" />
    <CounterCard label="Mauvaise Presse" :value="g.corp.badPub" accent="corp"
                 :onInc="() => g.inc('corp','badPub',1)" :onDec="() => g.inc('corp','badPub',-1)"/>
    <CounterCard label="Tags sur Runner" :value="g.runner.tags" accent="corp"
                 :onInc="() => g.inc('runner','tags',1)" :onDec="() => g.inc('runner','tags',-1)"/>
    <CounterCard label="Avancement" :value="g.corp.advancement" accent="corp"
                 :onInc="() => g.inc('corp','advancement',1)" :onDec="() => g.inc('corp','advancement',-1)"/>
  </div>
</template>
