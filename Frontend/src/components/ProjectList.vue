<template>
  <v-card class="mx-auto pa-2 mt-5" width="100%">
    <v-list v-if="items !== undefined" lines="two" density="comfortable">
      <v-list-subheader inset>Projects</v-list-subheader>
      <div v-if="items.length === 0">
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>No projects found</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </div>
      <div v-for="item in items" :key="item.project_id">
        <ProjectListItem :item="item" />
      </div>
    </v-list>
  </v-card>
</template>

<script lang="ts">
import Project from "@/types/project.type";
import { PropType, defineComponent } from "vue";
import { useUserStore } from "@/store/auth.module";
import MetaHelper from "@/utils/project.meta.helper";
import ProjectListItem from "./ProjectListItem.vue";

export default defineComponent({
  setup() {
    const { data } = useUserStore();
    // console.log("HELLO DARKNESS MY OLD FRIEND");
    return { data, MetaHelper };
  },
  // Array as PropType<Array<Project>>
  // Object as PropType<ProjectMeta>
  props: {
    items: Array as PropType<Array<Project>>,
  },
  components: { ProjectListItem },
});
</script>
