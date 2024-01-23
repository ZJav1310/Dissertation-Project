<template>
  <v-hover v-slot:default="{ isHovering, props }" open-delay="200">
    <v-list-item
      :elevation="isHovering ? 16 : 0"
      :class="{ 'on-hover': isHovering }"
      v-bind="props"
      :key="item.project_id"
      :title="item.project_title"
      :subtitle="item.project_content"
      :disabled="MetaHelper.isFull(item)"
      active-color="primary"
      v-if="item !== undefined"
      :to="MetaHelper.projectUrl(item)"
    >
      <template v-slot:subtitle>
        <ProjectListChip :item="item" />
      </template>
      <template v-slot:prepend>
        <v-avatar :color="MetaHelper.getIcons(item).color">
          <v-progress-circular
            color="white"
            :model-value="
              MetaHelper.getPercentage(
                MetaHelper.applicantCount(item),
                item.max_capacity ?? 0
              )
            "
          ></v-progress-circular>
        </v-avatar>
      </template>

      <template v-slot:append>
        <v-btn
          color="grey-lighten-1"
          icon="mdi-information"
          variant="text"
        ></v-btn>
      </template>
    </v-list-item>
  </v-hover>
</template>

<script lang="ts">
import { useUserStore } from "@/store/auth.module";
import Project from "@/types/project.type";
import MetaHelper from "@/utils/project.meta.helper";
import { PropType, defineComponent } from "vue";
import ProjectListChip from "@/components/ProjectListChips.vue";

export default defineComponent({
  setup() {
    const { data } = useUserStore();
    // console.log("HELLO DARKNESS MY OLD FRIEND");
    return { data, MetaHelper };
  },
  data() {
    return {
      //   IconHelper: MetaHelper.getIcons(this.item),
    };
  },
  props: {
    item: Object as PropType<Project>,
  },
  components: {
    ProjectListChip,
  },
  method: {
    clickHandler() {
      alert("Something");
    },
  },
});
</script>

<style lang="sass" scoped>
.v-list-item.on-hover.v-theme--dark
  background: rgb(var(--v-theme-primary), .02) !important,
  border-radius: 20px,
  border: 2px solid  rgb(var(--v-theme-primary), .2),
  >.v-list-item__text
    color: #000,
</style>
