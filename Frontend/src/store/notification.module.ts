import { notify } from "@kyvg/vue3-notification";
import { defineStore } from "pinia";

export type Notification = {
  text?: string;
  type?: string;
  group: string;
  title: string;
};

export const useNotificationStore = defineStore({
  id: "notificationStore",
  state: () => ({
    notifications: [] as Notification[],
  }),
  persist: true,
  actions: {
    add(n: Notification) {
      this.notifications.push(n);
      this.trigger(n);
    },
    trigger(n: Notification) {
      notify({ ...n });
    },
  },
});
