<template>
  <div v-if="item !== undefined">
    <v-chip rounded size="small">{{
      MetaHelper.spacesRemaining(item) === 0
        ? "Full"
        : `Remaining spaces: ${MetaHelper.spacesRemaining(item)}`
    }}</v-chip>
    <v-chip
      v-if="item.application_deadline"
      rounded
      size="small"
      color="grey"
      variant="text"
      >Deadline:
      {{
        new Date(item.application_deadline).toLocaleDateString("en-GB", {
          day: "numeric",
          month: "short",
          year: "numeric",
          hour: "numeric",
          minute: "numeric",
        })
      }}</v-chip
    >
  </div>
</template>

<script lang="ts">
import { useUserStore } from "@/store/auth.module";
import Project from "@/types/project.type";
import MetaHelper from "@/utils/project.meta.helper";
import { PropType, defineComponent } from "vue";

export default defineComponent({
  setup() {
    const { data } = useUserStore();
    // console.log("HELLO DARKNESS MY OLD FRIEND");
    return { data, MetaHelper };
  },
  computed: {},
  data() {
    return {
      chips: {},
    };
  },
  props: {
    item: Object as PropType<Project>,
  },
});
</script>

<style lang="sass" scoped>
.v-list-item.on-hover.v-theme--dark
  background: rgb(var(--v-theme-primary), .7) !important,
  border-radius: 20px,
  >.v-list-item__text
    color: #000,
</style>
