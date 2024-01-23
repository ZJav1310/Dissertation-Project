<template>
  My Notifications
  <NotificationList />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import NotificationList from "@/components/NotificationList.vue";

export default defineComponent({
  components: {
    NotificationList,
  },
});
</script>
