<template>
  <div>
    <v-dialog v-model="dialog" activator="parent" width="auto">
      <v-card>
        <v-select
          v-model="selected"
          label="Select"
          :items="[1, 2, 3, 4]"
        ></v-select>
        <v-card-actions>
          <v-row>
            <v-btn
              color="primary"
              block
              @click="
                {
                  handleTemplateLoad(selected);
                  dialog = false;
                }
              "
              >Confirm</v-btn
            >
            <v-btn color="primary" block @click="dialog = false"
              >Close Dialog</v-btn
            >
          </v-row>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>

  <div v-if="!ready" class="ma-5">
    <div class="text-h6 mb-5">Start new project</div>
    <v-btn block class="mr-5" @click="handleNew">Yes</v-btn>
    <div>
      <v-btn variant="text" @click="dialog = true">from template</v-btn>
    </div>
  </div>
  <div v-if="ready">
    <ProjectSteps :p="project" />
  </div>
</template>

<script lang="ts">
import ProjectSteps from "@/components/ProjectSteps.vue";
import ProjectHandler from "@/handlers/project.handler";
import { useProjectStore } from "@/store/projects.module";

export default {
  data() {
    return {
      selected: 1,
      ready: false,
      phandler: new ProjectHandler(),
      project: {},
      dialog: false,
    };
  },
  methods: {
    handleTemplateLoad(id: number) {
      const template = useProjectStore().getProjectById(id);
      this.phandler.setTemplate(template);
      this.project = this.phandler.getProject();
      this.ready = true;
    },
    handleNew() {
      this.phandler.clear();
      this.project = this.phandler.getProject();
      this.ready = true;
    },
  },
  components: {
    ProjectSteps,
  },
  watch: {
    ready() {
      console.log("ready");
      console.log(this.project);
    },
  },
};
</script>
