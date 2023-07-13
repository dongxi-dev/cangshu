import { defineStore } from "pinia";

export const useFileStore = defineStore("file", {
  state: () => ({
    page: null as any,
  }),
  actions: {
    async getPage() {},
  },
});
