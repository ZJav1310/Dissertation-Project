import Project from "@/types/project.type";
import { defineStore } from "pinia";
import ApplicationService from "@/services/application.service";
import { useNotificationStore } from "./notification.module";
import { useUserStore } from "./auth.module";

export const useShotlistStore = defineStore({
  id: "shotlistStore",
  state: () => ({
    shortlist: [] as Project[],
    selectedlist: [] as Project[],
    submitted: false,
    loading: false,
    submission_date: undefined as Date | undefined,
    assigned_project: undefined as Project | undefined,
    n: useNotificationStore(),
    u: useUserStore(),
  }),
  persist: true,
  actions: {
    addProjectToShortlist(project: Project) {
      const n = useNotificationStore();
      if (
        !(
          this.shortlist.filter((p) => p.project_id === project.project_id)
            .length > 0
        )
      ) {
        this.shortlist.push(project);
        n.trigger({
          group: "global",
          type: "success",
          title: "Added to favorites",
        });
        console.log("Current shortlist after adding...", this.shortlist);
      } else {
        n.trigger({
          group: "global",
          type: "error",
          title: "Failed to add to favorites.",
        });
      }
    },
    removeProjectFromShortlist(project: Project) {
      const index = this.shortlist.findIndex(
        (p) => p.project_id === project.project_id
      );
      if (index !== -1) {
        this.shortlist.splice(index, 1);
        // alert("Project removed.");
        this.n.add({
          group: "global",
          type: "info",
          title: "Project removed from favorites.",
        });
        console.log("Current shortlist after delete...", this.shortlist);
      } else {
        // alert("Project isnt in shortlist.");
        this.n.trigger({
          group: "global",
          type: "error",
          title: "Project isnt in shortlist.",
        });
      }
    },
    isInShortlist(project: Project) {
      return (
        this.shortlist.filter((p) => p.project_id === project.project_id)
          .length > 0
      );
    },
    getCombinedList() {
      return this.shortlist.concat(this.selectedlist);
    },
    isInCombinedList(project: Project) {
      return (
        this.getCombinedList().filter(
          (p) => p.project_id === project.project_id
        ).length > 0
      );
    },
    async _validateSelectedList() {
      if (this.submitted) return;
      if (this.selectedlist.length === 0) return;

      for (let i = 0; i < this.selectedlist.length; i++) {
        const project = this.selectedlist[i];

        if (project.project_id === undefined) {
          this.rmSelectedList(i);
          continue;
        }

        const isFull = await ApplicationService.isFull(project.project_id);
        const isApplied = await ApplicationService.isApplied(
          project.project_id,
          this.u.getUserID
        );

        if (isFull || isApplied) {
          this.rmSelectedList(i);
          this.n.trigger({
            group: "global",
            type: "info",
            title: `${project.project_title} is full - removed from your shortlist.`,
          });
          continue;
        }
      }

      console.log("Selected after validation...", this.selectedlist);
    },
    rmSelectedList(index: number) {
      if (index !== -1) {
        this.selectedlist.splice(index, 1);
        this.n.add({
          group: "global",
          type: "info",
          title: "Project removed from selected.",
        });
        console.log("Current selected after delete...", this.selectedlist);
      } else {
        // alert("Project isnt in shortlist.");
        this.n.trigger({
          group: "global",
          type: "error",
          title: "Project isnt in selected.",
        });
      }
    },
    async checkoutSelectedList() {
      if (this.submitted) return;
      try {
        if (this.selectedlist.length === 0 || this.selectedlist.length !== 3) {
          throw new Error("You do not have 3 projects in your shortlist.");
        }

        this.loading = true;
        await this._validateSelectedList();

        if (this.selectedlist.length !== 3) {
          this.loading = false;
          throw new Error("You do not have 3 projects in your selected list.");
        }

        /**
         * TODO: Apply to all projects in shortlist
         */

        for (let i = 0; i < this.selectedlist.length; i++) {
          const project = this.selectedlist[i];
          await ApplicationService.apply({
            project_id: project.project_id!,
            user_id: this.u.getUserID,
            choice: i + 1,
          });

          if (i === this.selectedlist.length - 1) {
            this.submitted = true;
            this.submission_date = new Date();
            this.n.add({
              group: "global",
              type: "success",
              title: "Your application has been sent.",
            });
          }

          this.loading = false;
        }
      } catch (error) {
        console.error(error);
        this.n.trigger({
          group: "global",
          type: "error",
          title: "You do not have 3 projects in your selected list.",
        });
      }
    },
  },
});
