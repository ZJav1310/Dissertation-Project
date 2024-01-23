<template>
  <v-container>
    <v-form style="max-width: 710px">
      <div class="pa-5">
        <v-row class="d-flex justify-center mb-1">
          <div class="text-h5">Filter Projects</div>
          <div></div>
        </v-row>
        <v-row class="mb-4">
          <v-col>
            <div class="text-h6">Sort By</div>
          </v-col>
          <v-col>
            <v-autocomplete
              label="Sort By"
              :items="['Recent', 'Deadline', 'Updated']"
              v-model="sort"
              variant="solo-filled"
              hide-details
              hide-no-data
              hide-selected
              single-line
            ></v-autocomplete>
          </v-col>
        </v-row>
        <v-row class="mb-5">
          <v-autocomplete
            v-model="selected"
            :items="categories"
            label="Categories"
            chips
            closable-chips
            multiple
            variant="solo-filled"
          ></v-autocomplete>
        </v-row>
        <v-row class="mt-7; mb-2">
          <v-switch
            v-model="optional"
            inset
            color="primary"
            label="Show Funded Only"
            value="Funded"
            hide-details
          ></v-switch>
          <v-switch
            v-model="optional"
            inset
            color="primary"
            label="Show Full Projects"
            value="FullProjects"
            hide-details
          ></v-switch>
          <v-switch
            v-model="optional"
            inset
            color="primary"
            label="Show 3rd Party Interest Only"
            value="ThirdPartyInterest"
            hide-details
          ></v-switch>
        </v-row>
      </div>
      <v-row justify="center" class="ma-3">
        <v-btn block @click="onFilterClick">Filter</v-btn>
      </v-row>
      <v-row justify="center" class="mt-6">
        <v-btn variant="text" @click="onClearClick">Clear</v-btn>
      </v-row>
    </v-form>
  </v-container>
</template>

<script>
export default {
  name: "FilterSheet",
  data: () => ({
    optional: [],
    categories: ["Software Engineering", "Computer Science", "Computing"],
    selected: [],
  }),
  methods: {
    onClearClick() {
      this.optional = [];
      this.selected = [];
      this.sort = [];
      // console.log("Clear clicked");
      this.$emit("filterOptions", "clear");
    },
    onFilterClick() {
      if (
        this.optional?.length === 0 &&
        this.selected?.length === 0 &&
        this.sort?.length === 0
      ) {
        console.log("No filters selected");
        return;
      }
      // const filters = [
      //   { optional: this.optional },
      //   { selected: this.selected },
      //   { sort: this.sort },
      // ];
      const filters = {
        optional: this.optional,
        selected: this.selected,
        sort: this.sort,
      };
      this.$emit("filterOptions", filters);
    },
  },
};
</script>
