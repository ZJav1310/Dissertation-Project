<template>
  <v-list lines="one">
    <v-list-item
      v-for="item in notifications"
      :key="item.title"
      :title="item.title"
      subtitle="..."
    ></v-list-item>
  </v-list>
</template>

<script lang="ts">
import { useNotificationStore } from "@/store/notification.module";
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    const { notifications } = useNotificationStore();

    return { notifications };
  },
  data: () => ({}),
  computed: {},
  methods: {},
});
</script>
