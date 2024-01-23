import ApplicationService from "@/services/application.service";
import UserService from "@/services/user.service";
import Project from "@/types/project.type";
import User from "@/types/user.type";
import { defineStore } from "pinia";
import router from "@/router";
import { useNotificationStore } from "./notification.module";
import { useShotlistStore } from "./shortlist.module";

export type RootState = {
  data: {
    user: User;
    shortlist: Project[];
    applied: Project[];
    projects_owned: Project[];
    isAuthorised: boolean;
  };
};

const placeholder = JSON.stringify({
  user_id: -1,
  user_email: "",
  user_name: "",
  user_level: 0,
  accessToken: "",
});

// JSON.parse(localStorage.getItem("userStore") || placeholder)

export const useUserStore = defineStore({
  id: "userStore",
  state: (): RootState => ({
    data: {
      user: JSON.parse(placeholder),
      shortlist: [],
      applied: [],
      projects_owned: [],
      isAuthorised: false,
    },
  }),
  persist: {
    storage: localStorage,
    paths: ["data"],
    beforeRestore: (ctx) => {
      console.log(`about to restore '${ctx.store.$id}'`);
    },
    afterRestore: (ctx) => {
      console.log(`just restored '${ctx.store.$id}'`);
    },
  },

  getters: {
    userProfile(state) {
      return state.data.user;
    },
    userShortlist(state) {
      return state.data.shortlist;
    },
    userApplied(state) {
      return state.data.applied;
    },
    getUserID(state) {
      return state.data.user.user_id;
    },
  },

  actions: {
    async login(user: { email: string; password: string }) {
      const result = await UserService.login(user);
      if (result.data != undefined && !Array.isArray(result.data)) {
        this.data.user = result.data;
        this.data.isAuthorised = result.data.accessToken !== "";
        router.push("/");
      } else {
        const n = useNotificationStore();
        n.trigger({
          group: "global",
          type: "error",
          title: result.message,
        });
        // alert(result.message);
        this.data.isAuthorised = false;
      }
    },

    async register(user: { email: string; password: string; name: string }) {
      const result = await UserService.register(user);
      // alert(result.message);
      const n = useNotificationStore();
      n.trigger({
        group: "global",
        type: result.status ? "success" : "error",
        title: result.message,
      });
    },

    logout() {
      const n = useNotificationStore();
      const s = useShotlistStore();
      s.$reset();
      n.$reset();
      this.$reset();
      localStorage.removeItem("userState");
      this.data.isAuthorised = false;
      alert("You have been logged out.");
    },
  },
});
