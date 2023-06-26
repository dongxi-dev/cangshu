import { defineStore } from "pinia";
import { getFilePage } from "~/services/file";

export const useFileStore = defineStore("file", {
  state: () => ({
    page: null as any,
  }),
  actions: {
    async getPage() {
      this.page = await getFilePage();
    },
  },
});
