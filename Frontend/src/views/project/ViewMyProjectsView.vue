<template>
  <div v-if="assigned_status">
    <div>
      <v-card>
        <v-card-text class="text-h5" style="line-height: normal">
          {{ assigned_project?.project_title }}
        </v-card-text>
        <div class="ml-4">
          <v-chip
            class="ma-1"
            size="small"
            rounded
            v-for="(
              term, index
            ) in assigned_project?.project_content.index_terms.split(',')"
            :key="index"
            >{{ term }}</v-chip
          >
        </div>
        <v-card-text>{{
          assigned_project?.project_content.description
        }}</v-card-text>
        <v-card-text
          >Requirements:
          {{
            assigned_project?.project_content.student_requirements
          }}</v-card-text
        >
        <v-card-text v-if="assigned_project?.project_content.degree_courses"
          >Degree Course:
          {{ assigned_project?.project_content.degree_courses }}</v-card-text
        >
        <v-card-text v-if="assigned_project?.project_content.references"
          >References:
          {{ assigned_project?.project_content.references }}</v-card-text
        >
        <v-card-item></v-card-item>
      </v-card>
    </div>
  </div>

  <div v-else>
    <div class="row" v-if="!store.$state.submitted">
      <v-card class="mb-5">
        <div class="col-3 ma-2">
          <h3>Selected</h3>
          <div v-if="selectedList.length === 0">No Projects Selected.</div>
          <draggable
            class="list-group"
            :list="selectedList"
            group="people"
            @change="log"
            itemKey="name"
            disabled
          >
            <template #item="{ element }">
              <div class="list-group-item">
                <!-- {{ element.project_title }} -->
                <ProjectListItem :item="element" />
              </div>
            </template>
          </draggable>
        </div>

        <div class="col-3 ma-2">
          <h3>Shortlist</h3>
          <div v-if="shortList.length === 0">No Projects in Shortlist.</div>
          <draggable
            class="list-group"
            :list="shortList"
            group="people"
            @change="log"
            itemKey="name"
            disabled
          >
            <template #item="{ element }">
              <div class="list-group-item">
                <!-- {{ element.project_title }} -->
                <ProjectListItem :item="element" />
              </div>
            </template>
          </draggable>
        </div>
      </v-card>

      <v-btn :disabled="selectedList.length !== 3" @click="handleSubmit"
        >Submit</v-btn
      >
      <rawDisplayer class="col-3" :value="selectedList" title="List 1" />
      <rawDisplayer class="col-3" :value="shortList" title="List 2" />
    </div>
    <div v-else>
      <h1 class="text-h4">Thank you for your submission</h1>
      <p>When projects are assigned, you will see them in your dashboard.</p>
      <v-card>
        <v-card-item>
          <div v-for="(item, key) in store.$state.selectedlist" :key="key">
            <!-- <ProjectListItem :item="item" /> -->
            <v-list-item
              :key="item.project_id"
              :title="item.project_title"
              :subtitle="item.project_content"
              active-color="primary"
              v-if="item !== undefined"
            >
              <template v-slot:subtitle>
                <v-chip
                  v-if="item.application_deadline"
                  rounded
                  size="small"
                  color="grey"
                  variant="text"
                  >Deadline:
                  {{
                    new Date(item.application_deadline).toLocaleDateString(
                      "en-GB",
                      {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                        hour: "numeric",
                        minute: "numeric",
                      }
                    )
                  }}</v-chip
                >
                <v-chip rounded size="small" color="grey" variant="text"
                  >Choice: {{ key + 1 }}</v-chip
                >
              </template>

              <template v-slot:append>
                <v-btn
                  color="grey-lighten-1"
                  icon="mdi-information"
                  variant="text"
                ></v-btn>
              </template>
            </v-list-item>
          </div>
        </v-card-item>
      </v-card>
    </div>
  </div>
</template>

<script lang="ts">
import draggable from "vuedraggable";
import { ref } from "vue";
import { useShotlistStore } from "@/store/shortlist.module";
import ProjectListItem from "@/components/ProjectListItem.vue";
import { useUserStore } from "@/store/auth.module";
import UserService from "@/services/user.service";
import User from "@/types/user.type";
import ProjectApplication from "@/types/project.application.type";
import Project from "@/types/project.type";
import { useNotificationStore } from "@/store/notification.module";

export default {
  name: "Apply-Project",
  display: "Apply to projects",
  order: 1,
  setup() {
    const store = useShotlistStore();
    const { selectedlist, shortlist } = store;
    const user = useUserStore();
    const { data } = user;
    const selectedList = ref(selectedlist);
    const shortList = ref(shortlist);
    const n = useNotificationStore();

    return { selectedList, shortList, data, store, user, n };
  },
  components: {
    draggable,
    ProjectListItem,
  },
  data() {
    return {
      selected: [],
      assigned_status: false,
      pollInterval: undefined as number | undefined,
      assigned_project: null as Project | null,
    };
  },
  methods: {
    log: function (evt: any) {
      window.console.log(evt);
    },
    handleSubmit() {
      console.log("submit");
      this.store.checkoutSelectedList();
    },
    fetchUser() {
      console.log("fetching user");
      if (this.assigned_status) {
        return;
      }

      UserService.getUserById(this.user.getUserID).then((user) => {
        const u = user.data as User;
        const applied = u.applied;

        if (!applied) {
          return;
        }

        if (applied.length === 0) {
          return;
        }

        for (const a of applied) {
          if (a.assigned) {
            const result = this.selectedList.filter((p) => {
              if (p.project_id === a.project_id) {
                return p as Project;
              }
            });
            this.assigned_project = result[0];
            clearInterval(this.pollInterval);
            this.n.add({
              group: "global",
              type: "info",
              title: "You have been assigned to a project",
            });
            this.assigned_status = true;
            break;
          }
        }
      });

      return;
    },
  },
  computed: {
    // list() {
    //   const { shortlist } = useShotlistStore();
    //   console.log("shortlist", shortlist);
    //   return shortlist;
    // },
  },
  mounted() {
    console.log("mounted");
    this.fetchUser();
    if (!this.assigned_status) {
      this.pollInterval = setInterval(() => this.fetchUser(), 6000); //save reference to the interval
      setTimeout(() => {
        clearInterval(this.pollInterval);
      }, 36000000); //stop polling after an hour
    }
  },
};
</script>
