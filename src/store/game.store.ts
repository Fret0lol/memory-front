import { defineStore } from "pinia";

export const useGameStore = defineStore('game', {
  state: () => ({
    level: 6
  }),
  actions: {
    setLevel(level: number) {
      this.level = level;
    }
  }
})