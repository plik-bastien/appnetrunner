<script lang="ts" setup>
import { ref, computed } from 'vue'
import { useGameStore } from '../stores/game'
import ValueTile from './ValueTile.vue'
import ValueModal from './ValueModal.vue'
import ClickTrack from './ClickTrack.vue'

const props = defineProps<{ showIcons: boolean; side: 'runner' | 'corp' }>()
const g = useGameStore()

type Key = 'agendaPoints' | 'credits' | 'badPub' | 'tags' | 'mu' | 'neuro' | 'relais'
const openKey = ref<Key | null>(null)

const title = computed(() => {
  switch (openKey.value) {
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

const currentValue = computed(() => {
  const s = props.side === 'runner' ? g.runner : g.corp
  switch (openKey.value) {
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

function inc(delta: number) {
  const side = props.side
  switch (openKey.value) {
    case 'agendaPoints':
      g.incAgenda(side, delta)              // ✅ négatif autorisé
      break
    case 'credits': g.inc(side, 'credits', delta); break
    case 'badPub': g.inc('corp', 'badPub', delta); break
    case 'tags': g.inc('runner', 'tags', delta); break
    case 'mu': g.inc('runner', 'mu', delta); break
    case 'neuro': g.incDamage('neuro', delta); break
    case 'relais': g.inc('runner', 'relais', delta); break
  }
}

function vibrate(ms = 10) { try { (navigator as any)?.vibrate?.(ms) } catch { } }
function bumpCredits(delta: number) {
  g.inc(props.side, 'credits', delta)
  vibrate()
}

</script>

<template>
  <div class="board cp-grid">
    <header class="mb-2 flex items-center justify-between">
      <span class="cp-title">{{ props.side === 'corp' ? 'Corporation' : 'Runner' }}</span>
    </header>

    <div class="grid grid-cols-2 gap-2">
      <!-- PTS PROJET -->
      <div @click="openKey = 'agendaPoints'">
        <ValueTile :value="(props.side === 'runner' ? g.runner : g.corp).agendaPoints"
          :active="openKey === 'agendaPoints'">
          <template #label>
            <span v-if="!showIcons">PTS PROJET</span>

            <svg v-else fill="currentColor" version="1.1" xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink" width="32" height="32" viewBox="0 0 32 32">
              <path
                d="M14.758 11.761l4.568-1.627v-7.447l-4.568 1.627v7.447zM6.123 20.147v-15.832l-2.816-1.564v18.398l2.816-1.001zM6.748 4.44h7.384v15.644h-7.384v-15.644zM14.383 3.814l4.506-1.627-2.566-1.502h-8.135l-4.443 1.627 2.753 1.502h7.885zM18.2 14.39h7.384v15.269h-7.384v-15.269zM19.639 10.635l-4.255 1.564h-0.25l2.816 1.564h7.885l4.568-1.627-2.566-1.502h-8.198zM26.21 14.327v15.206l4.631-1.627v-15.269l-4.631 1.69zM17.574 14.265l-2.816-1.502v7.447l2.816 1.627v-7.572zM14.445 12.2v0 0zM4.183 24.34l-2.816-1.564v6.821l2.816 1.564v-6.821zM4.808 24.465h7.384v6.884h-7.384v-6.884zM17.387 29.596v-6.884l-4.568 1.627v6.884l4.568-1.627zM4.558 23.839h7.885l4.506-1.627-2.503-1.502h-8.198l-4.443 1.627 2.753 1.502z" />
            </svg>

          </template>
        </ValueTile>
      </div>

      <!-- CRÉDITS -->
      <div>
        <!-- Mode icônes : inline controls -->
        <template v-if="showIcons">
          <div class="cp-panel p-2 relative overflow-hidden flex items-center justify-between gap-2"
            :class="props.side === 'corp' ? 'bg-corp-strong' : 'bg-runner-strong'">

            <!-- Label icône -->
            <span class="cp-title flex items-center gap-1 shrink-0 text-sm sm:text-base">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 17 32" fill="currentColor"
                aria-hidden="true">
                <path
                  d="M8.393 1.878l8.116 7.311v13.599l-8.116 7.311-8.116-7.311v-13.599l8.116-7.311zM14.608 21.911v-11.844l-6.215-5.557-5.995 5.484 5.995 5.703v6.215l-6.215-5.922v5.922l6.215 5.483 6.215-5.483z" />
              </svg>
            </span>

            <!-- Contrôles inline -->
            <div class="flex items-center gap-2 shrink-0">
              <button type="button" class="btn-incdec" @click.stop="bumpCredits(-1)">−</button>

              <span class="text-2xl sm:text-3xl font-mono w-12 text-center truncate">
                {{ (props.side === 'runner' ? g.runner : g.corp).credits }}
              </span>

              <button type="button" class="btn-incdec" @click.stop="bumpCredits(+1)">+</button>
            </div>
          </div>
        </template>

        <!-- Mode texte : ouverture popin -->
        <template v-else>
          <div @click="openKey = 'credits'">
            <ValueTile :value="(props.side === 'runner' ? g.runner : g.corp).credits" :active="openKey === 'credits'">
              <template #label>
                CRÉDITS
              </template>
            </ValueTile>
          </div>
        </template>
      </div>



      <!-- CORPORATION ONLY -->
      <template v-if="props.side === 'corp'">
        <!-- MAUVAISE PRESSE -->
        <div @click="openKey = 'badPub'">
          <ValueTile :value="g.corp.badPub" :active="openKey === 'badPub'">
            <template #label>
              <span v-if="!showIcons">MAUVAISE PRESSE</span>

              <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 101.6 86.6" fill="currentColor">
                <!-- Papiers / cadres (traits uniquement) -->
                <path d="M5.1,13.4l79.6-8.4c2.2-0.2,4.2,1.4,4.4,3.6l6.7,63.6c0.2,2.2-1.4,4.2-3.6,4.4l-79.6,8.4
           c-2.2,0.2-4.2-1.4-4.4-3.6L1.5,17.8C1.3,15.6,2.9,13.7,5.1,13.4z" fill="none" stroke="currentColor"
                  stroke-width="2" />
                <path d="M17,1.5l79.6,8.4c2.2,0.2,3.8,2.2,3.6,4.4l-6.7,63.6c-0.2,2.2-2.2,3.8-4.4,3.6L9.5,73.1
           c-2.2-0.2-3.8-2.2-3.6-4.4l6.7-63.6C12.8,2.9,14.8,1.3,17,1.5z" fill="none" stroke="currentColor"
                  stroke-width="2" />
                <path
                  d="M6.6,3.1h80c2.2,0,4,1.8,4,4v64c0,2.2-1.8,4-4,4h-80c-2.2,0-4-1.8-4-4v-64C2.6,4.9,4.4,3.1,6.6,3.1z"
                  fill="none" stroke="currentColor" stroke-width="2" />

                <!-- Point d’exclamation (rempli avec currentColor) -->
                <path d="M45.2,19.5h6.9c0.6,0,1.2,0.5,1.2,1.2v28.9c0,0.6-0.5,1.2-1.2,1.2h-6.9c-0.6,0-1.2-0.5-1.2-1.2V20.7
           C44,20,44.5,19.5,45.2,19.5z" />
                <path d="M45.2,54.2h6.9c0.6,0,1.2,0.5,1.2,1.2v6.9c0,0.6-0.5,1.2-1.2,1.2h-6.9c-0.6,0-1.2-0.5-1.2-1.2v-6.9
           C44,54.8,44.5,54.2,45.2,54.2z" />
              </svg>


            </template>
          </ValueTile>
        </div>
      </template>

      <!-- RUNNER ONLY -->
      <template v-else>
        <!-- TAGS -->
        <div @click="openKey = 'tags'">
          <ValueTile :value="g.runner.tags" :active="openKey === 'tags'">
            <template #label>
              <span v-if="!showIcons">TAGS</span>

              <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 56" fill="none">
                <!-- Cadre extérieur -->
                <path d="M10,2h60c4.4,0,8,3.6,8,8v36c0,4.4-3.6,8-8,8H10c-4.4,0-8-3.6-8-8V10C2,5.6,5.6,2,10,2z"
                  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                <!-- Biseau intérieur -->
                <path d="M12,6h56c3.3,0,6,2.7,6,6v32c0,3.3-2.7,6-6,6H12c-3.3,0-6-2.7-6-6V12C6,8.7,8.7,6,12,6z"
                  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />

                <!-- Grille (lignes fines) -->
                <g opacity=".25" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                  fill="none">
                  <path d="M12 6v44M24 6v44M36 6v44M48 6v44M60 6v44M72 6v44M6 12h68M6 24h68M6 36h68M6 48h68" />
                </g>

                <!-- Arcs radar -->
                <path d="M18,40c0-9.9,8.1-18,18-18s18,8.1,18,18" stroke="currentColor" stroke-width="2"
                  stroke-linecap="round" stroke-linejoin="round" fill="none" />
                <path d="M24,40c0-6.6,5.4-12,12-12s12,5.4,12,12" stroke="currentColor" stroke-width="2"
                  stroke-linecap="round" stroke-linejoin="round" fill="none" />
                <path d="M30,40c0-3.3,2.7-6,6-6s6,2.7,6,6" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                  stroke-linejoin="round" fill="none" />

                <!-- Viseur -->
                <path d="M36,37l17-18" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                  stroke-linejoin="round" fill="none" />
                <circle cx="54" cy="18" r="4" stroke="currentColor" stroke-width="2" fill="none" />
                <path d="M54,11.1v4M54.1,21.5v4M46.1,18h4M55.9,18h4" stroke="currentColor" stroke-width="2"
                  stroke-linecap="round" stroke-linejoin="round" fill="none" />
              </svg>


            </template>
          </ValueTile>
        </div>

        <!-- MEM (MU) -->
        <div @click="openKey = 'mu'">
          <ValueTile :value="g.runner.mu" :active="openKey === 'mu'">
            <template #label>
              <span v-if="!showIcons">MEM (MU)</span>
              <svg v-else fill="currentColor" version="1.1" xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink" width="44" height="32" viewBox="0 0 44 32">
                <path
                  d="M40.485 3.241h2.308v25.918h-11.184v-0.71h-1.42v2.929h-22.811l-0.621-0.71-5.858-5.858v-24.143h29.291v3.284h1.42v-0.71l8.876 0zM40.485 9.188v-3.639h-6.568v0.71h-6.036v-3.195h-24.675v20.77l5.148 5.148h19.527v-2.84h6.036v0.71h6.568v-3.639h-6.568v0.71h-6.036v-3.639h6.036v0.71h6.568v-3.639h-6.568v0.71h-6.036v-3.639h6.036v0.621h6.568v-3.639h-6.568v0.799h-6.036v-3.639h6.036v0.621l6.568-0z" />
              </svg>

            </template>
          </ValueTile>
        </div>

        <!-- DÉGÂTS NEURO -->
        <div @click="openKey = 'neuro'">
          <ValueTile :value="g.runner.damage.neuro" :active="openKey === 'neuro'">
            <template #label>
              <span v-if="!showIcons">DÉGÂTS NEURO (main max {{ g.runnerHandMax }})</span>

              <svg v-else fill="currentColor" xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 24.8 21.9">
                <path d="M0,11.1c0,0.3,0.1,0.5,0.2,0.7c0.1,0.1,0.2,0.2,0.3,0.3c0.1,0,0.1,0.1,0.2,0.2c0.6,0.6,1.5,1.1,2.1,1.1c0,0,0,0,0,0l0,0
	c0.1,0,0.2,0,0.3,0c0.5,0,1.1,0,1.4,0.1c0,0,0,0,0,0c0.1,0,0.1,0.1,0.2,0.2c0,0,0,0.1,0.1,0.1c0.1,0.2,0.1,0.3,0.2,0.4
	c0,0,0,0.1,0,0.1c0.1,0.1,0.2,0.3,0.4,0.4c0,0,0,0,0,0c0.3,0.2,0.6,0.4,0.9,0.5c0.2,0.1,0.7,0.3,1.3,0.5c0.1,0,0.1,0.1,0.2,0.1
	c0.1,0,0.2,0.1,0.4,0.1C8.3,16,8.6,16,8.8,16.1c0,0,0,0,0,0c0,0,0,0,0,0c0.2,0,0.3,0,0.4,0c0.2,0,0.4,0,0.6-0.1
	c0.3-0.1,0.6-0.6,0.9-0.5c0.3,0.1,0.3,0.6,0.4,0.8l0.7,1c0,0.1,0.1,0.3,0.2,0.4c0.7,0.8,1.6,1.5,2.4,2.2c0.2,0.2,0.4,0.4,0.6,0.7
	c0,0,0.4,0.5,0.7,0.7c0,0,0,0,0,0c0,0,0,0,0,0c0,0,0,0,0,0c0,0,0,0,0,0c0.1,0.1,0.1,0.3,0.3,0.4c0,0,0,0,0,0
	c0.1,0.1,0.2,0.2,0.4,0.3c0.1,0.1,0.2,0.1,0.3,0.1c0.1,0,0.1,0,0.2-0.1c0,0,0,0,0.1,0c0.1-0.2,0.1-0.3,0-0.5
	c-0.2-0.4-0.5-0.7-0.7-1.1c-0.2-0.3-0.2-0.6-0.2-0.8c0.1-0.2,0.3-0.4,0.7-0.4c0,0,0,0,0,0c0.1,0,0.2,0,0.4,0c0.3,0.1,1,0.1,1.2,0.1
	c0,0,0,0,0,0c1.5,0.4,2.8,0,3.9-1.1c0.2-0.2,0.3-0.3,0.4-0.5c0.3-0.4,0.6-0.9,1-1.4c0.5-0.7,1-1.5,1.1-2.4c0,0,0,0,0,0
	c0-0.1,0-0.4,0-1.1c0,0,0,0,0,0c0,0,0,0,0,0c0-0.5-0.3-2.1-0.5-2.7c0-0.2-0.1-0.7-0.3-1.7c0-0.2-0.1-0.5-0.2-0.7
	c-0.2-0.5-0.9-1.5-1.3-2c0,0,0,0,0-0.1c0,0,0,0,0,0c0,0,0,0,0,0c0,0-0.1-0.1-0.1-0.1c-0.4-0.4-2-2.2-2-2.2c-0.3-0.2-0.7-0.5-1-0.7
	C19.2,2.2,19,2.1,18.9,2c-1.7-0.9-3.3-1.5-4.5-1.8C14,0.1,13.5,0,13,0c0,0,0,0,0,0c-1.7-0.1-3.4,0.1-5.1,0.2c-0.2,0-0.4,0-0.6,0.1
	C7.1,0.3,7,0.4,6.8,0.4c-0.1,0-0.2,0.1-0.3,0.2C5.8,1,4,2.1,3.2,2.6l0,0C3.1,2.6,3.1,2.6,3,2.7C2.9,2.8,2.7,2.9,2.5,3.1
	c-0.7,0.5-1.4,1.1-2,1.8c0,0,0,0,0,0l0,0c0,0,0,0,0,0C0.2,5.2,0,5.6,0,6.1C0,7.8,0,9.5,0,11.1z" />
              </svg>
            </template>
          </ValueTile>
        </div>

        <!-- RELAIS -->
        <div @click="openKey = 'relais'">
          <ValueTile :value="g.runner.relais" :active="openKey === 'relais'">
            <template #label>
              <span v-if="!showIcons">RELAIS</span>

              <svg v-else fill="currentColor" xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink" width="27" height="32" viewBox="0 0 27 32">
                <path
                  d="M17.736 23.394h-5.397v-1.846h3.551v-13.634h-13.634v13.634h4.9v1.846h-6.746v-17.327h17.327zM26.258 31.134h-17.327v-17.327h5.326v1.775h-3.48v13.705h13.634v-13.705h-4.9v-1.775h6.746z" />
              </svg>
            </template>
          </ValueTile>
        </div>
      </template>
    </div>

    <div class="mt-2">
      <ClickTrack :value="(props.side === 'runner' ? g.runner : g.corp).clicks" :max="props.side === 'runner' ? 4 : 3"
        @update="v => (props.side === 'runner' ? g.runner : g.corp).clicks = v">
        <template #label>
          <span v-if="!showIcons">CLICS</span>

          <svg v-else fill="currentColor" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
            width="33" height="32" viewBox="0 0 33 32">
            <path
              d="M20.348 1.796c8.079 0.076 12.957 6.661 10.747 14.759-2.21 8.099-10.671 14.759-18.826 14.759-2.668 0-4.954-0.681-6.784-1.892l-1.143 1.211 0.991-1.362c-3.735-2.498-5.412-7.266-3.963-12.716 2.21-8.099 10.594-14.684 18.674-14.759l0.457-1.135-0.152 1.135zM19.433 6.943l-0.991 5.904c1.448 0.53 2.21 1.968 1.753 3.709-0.61 2.119-2.82 3.936-5.030 3.936-0.305 0-0.686-0.076-0.991-0.151-0.076-0.076-0.152-0.076-0.229-0.076l-4.497 4.844c1.143 0.681 2.591 1.060 4.192 1.060 5.335 0 10.823-4.314 12.271-9.612 1.372-5.071-1.448-9.31-6.479-9.613l-0 0zM16.003 12.847l2.134-5.904c-5.107 0.303-10.213 4.541-11.585 9.613-0.915 3.406 0 6.358 2.287 8.099l3.887-5.298-0.152-0.303c-0.381-0.681-0.534-1.514-0.305-2.498 0.457-1.741 1.982-3.179 3.735-3.709l-0 0zM16.994 13.604c-1.601 0-3.277 1.287-3.735 2.952-0.457 1.589 0.534 2.952 2.134 2.952 1.677 0 3.354-1.362 3.811-2.952 0.457-1.665-0.534-2.952-2.21-2.952v0zM3.199 16.556c-1.296 4.693 0.152 8.78 3.354 11.051l1.448-1.817c-2.591-1.968-3.735-5.374-2.668-9.234 1.524-5.828 7.47-10.596 13.262-10.899l0.838-2.044c-7.088 0.151-14.329 5.904-16.235 12.943v-0zM12.726 29.498c7.165 0 14.558-5.828 16.54-12.943 1.829-7.039-2.287-12.791-9.223-12.943l-0.381 2.044c5.716 0.303 9.070 5.071 7.47 10.899-1.601 5.979-7.851 10.823-13.796 10.823-1.905 0-3.506-0.454-4.802-1.287l-1.601 1.741c1.601 1.060 3.582 1.665 5.793 1.665l-0 0zM15.775 18.297c-0.991 0-1.524-0.833-1.296-1.741 0.229-0.984 1.22-1.741 2.21-1.741 0.991 0 1.524 0.757 1.296 1.741-0.305 0.908-1.296 1.741-2.21 1.741v0z" />
          </svg>

        </template>
      </ClickTrack>
    </div>

    <ValueModal :open="openKey !== null" :title="title" :value="currentValue" @close="openKey = null" @inc="inc" />
  </div>
</template>
