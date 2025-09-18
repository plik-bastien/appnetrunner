<script lang="ts" setup>
import {ref,computed} from 'vue'
import {useGameStore} from '../stores/game'
import ValueTile from './ValueTile.vue'
import ValueModal from './ValueModal.vue'
import ClickTrack from './ClickTrack.vue'

const props = defineProps<{side:'runner'|'corp'}>()
const g = useGameStore()
type Key = 'agendaPoints'|'credits'|'badPub'|'tags'|'mu'|'neuro'|'relais'
const openKey = ref<Key|null>(null)
const title = computed(()=>{
  switch(openKey.value){
    case 'agendaPoints': return 'PTS PROJET'
    case 'credits': return 'CRÉDITS'
    case 'badPub': return 'MAUVAISE PRESSE'
    case 'tags': return 'TAGS'
    case 'mu': return 'MEM (MU)'
    case 'neuro': return 'DÉGÂTS NEURO'
    case 'relais': return 'RELAIS'
    default: return ''
  }
})
const currentValue = computed(()=>{
  const s = props.side==='runner'?g.runner:g.corp
  switch(openKey.value){
    case 'agendaPoints': return s.agendaPoints
    case 'credits': return s.credits
    case 'badPub': return g.corp.badPub
    case 'tags': return g.runner.tags
    case 'mu': return g.runner.mu
    case 'neuro': return g.runner.damage.neuro
    case 'relais': return g.runner.relais
    default: return 0
  }
})
function inc(delta:number){
  const side=props.side
  switch(openKey.value){
    case 'agendaPoints': g.inc(side,'agendaPoints',delta); break
    case 'credits': g.inc(side,'credits',delta); break
    case 'badPub': g.inc('corp','badPub',delta); break
    case 'tags': g.inc('runner','tags',delta); break
    case 'mu': g.inc('runner','mu',delta); break
    case 'neuro': g.incDamage('neuro',delta); break
    case 'relais': g.inc('runner','relais',delta); break
  }
}
</script>
<template>
  <div class="board cp-grid">
    <header class="mb-2 flex items-center justify-between">
      <span class="cp-title">{{ props.side==='corp' ? 'Corporation' : 'Runner' }}</span>
    </header>

    <div class="grid grid-cols-2 gap-2">
      <div @click="openKey='agendaPoints'">
        <ValueTile label="PTS PROJET" :value="(props.side==='runner'?g.runner:g.corp).agendaPoints" :active="openKey==='agendaPoints'"/>
      </div>
      <div @click="openKey='credits'">
        <ValueTile label="CRÉDITS" :value="(props.side==='runner'?g.runner:g.corp).credits" :active="openKey==='credits'"/>
      </div>

      <template v-if="props.side==='corp'">
        <div @click="openKey='badPub'">
          <ValueTile label="MAUVAISE PRESSE" :value="g.corp.badPub" :active="openKey==='badPub'"/>
        </div>
      </template>

      <template v-else>
        <div @click="openKey='tags'"><ValueTile label="TAGS" :value="g.runner.tags" :active="openKey==='tags'"/></div>
        <div @click="openKey='mu'"><ValueTile label="MEM (MU)" :value="g.runner.mu" :active="openKey==='mu'"/></div>
        <div @click="openKey='neuro'"><ValueTile :label="`DÉGÂTS NEURO (main max ${g.runnerHandMax})`" :value="g.runner.damage.neuro" :active="openKey==='neuro'"/></div>
        <div @click="openKey='relais'"><ValueTile label="RELAIS" :value="g.runner.relais" :active="openKey==='relais'"/></div>
      </template>
    </div>

    <div class="mt-2">
      <ClickTrack :value="(props.side==='runner'?g.runner:g.corp).clicks"
                  :max="props.side==='runner'?4:3"
                  @update="v => (props.side==='runner'?g.runner:g.corp).clicks = v" />
    </div>

    <ValueModal :open="openKey!==null" :title="title" :value="currentValue" @close="openKey=null" @inc="inc"/>
  </div>
</template>
