<template>
  <v-chip-group filter v-model="filter">
    <v-chip @click="currentActive = 0">All Projects</v-chip>
    <v-chip @click="currentActive = 1">Shortlisted</v-chip>
    <v-chip @click="currentActive = 2">Binned</v-chip>
  </v-chip-group>
</template>

<script>
export default {
  data() {
    return {
      filter: 0,
    };
  },
};
</script>
