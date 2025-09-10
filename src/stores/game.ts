import { defineStore } from 'pinia'

export type Side = 'runner' | 'corp'
interface Damage { neuro:number }
interface RunnerState { agendaPoints:number; credits:number; clicks:number; tags:number; mu:number; relais:number; damage:Damage }
interface CorpState { agendaPoints:number; credits:number; clicks:number; badPub:number }

export interface GameState { runner: RunnerState; corp: CorpState }

const defaultState: GameState = {
  runner: { agendaPoints:0, credits:5, clicks:4, tags:0, mu:4, relais:0, damage:{neuro:0} },
  corp: { agendaPoints:0, credits:5, clicks:3, badPub:0 },
}

const LS_KEY = 'nr-companion-state-v3'
function loadState(): GameState {
  try { const raw = localStorage.getItem(LS_KEY); if(!raw) return structuredClone(defaultState); const p = JSON.parse(raw); if(!p.runner||!p.corp) throw 0; return p } catch { return structuredClone(defaultState) }
}
function saveState(s:GameState){ try{ localStorage.setItem(LS_KEY, JSON.stringify(s)) }catch{} }

export const useGameStore = defineStore('game', {
  state: ():GameState => loadState(),
  getters: { runnerHandMax: (s)=> Math.max(0, 5 - s.runner.damage.neuro) },
  actions: {
    inc(side:Side,key:any,delta:number){ /* @ts-ignore */ this[side][key] = Math.max(0, this[side][key]+delta); saveState(this.$state as GameState) },
    incDamage(type:keyof Damage,delta:number){ this.runner.damage[type]=Math.max(0,this.runner.damage[type]+delta); saveState(this.$state as GameState) },
    reset(){ this.$state = structuredClone(defaultState); saveState(this.$state as GameState) }
  }
})
