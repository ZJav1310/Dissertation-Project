<template>
  <v-row align="center" justify="center">
    <v-col>
      <v-text-field
        :loading="loading"
        variant="solo"
        label="Search projects..."
        density="comfortable"
        append-inner-icon="mdi-magnify"
        single-line
        hide-details
        :searchBar="searchBar"
        @input="$emit('update:searchBar', $event.target.value)"
      ></v-text-field>
    </v-col>
    <v-col cols="auto">
      <div>
        <v-btn
          variant="text"
          prepend-icon="mdi-filter"
          @click="$emit('filterClick')"
          >Filter</v-btn
        >
      </div>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data: () => ({
    custom: false,
  }),
  props: {
    title: String,
    showAdd: Boolean,
    format: String,
    searchBar: String,
  },
  emits: ["toggle-insert", "request-format", "update:searchBar", "filterClick"],
};
</script>
