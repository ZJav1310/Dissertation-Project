<template>
  <div class="home">
    <v-navigation-drawer
      v-model="drawer"
      location="bottom"
      temporary
      rounded="t-xl"
      style="min-height: 600px"
    >
      <FilterSheet @filterOptions="handleFilter" />
    </v-navigation-drawer>
    <SearchBar v-model:search-bar="search" @filterClick="drawer = !drawer" />
    <ProjectList :items="filteredList" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useProjectStore } from "@/store/projects.module";
import ProjectList from "@/components/ProjectList.vue";
import SearchBar from "@/components/SearchBar.vue";
import Project from "@/types/project.type";
import FilterSheet from "@/components/FilterSheet.vue";

export default defineComponent({
  setup() {
    const { fetchProjects } = useProjectStore();
    const { data, loading } = useProjectStore();
    fetchProjects(); //FIXME: Load from cache first and then check for connection?
    return { data, loading };
  },
  name: "HomeView",
  components: {
    ProjectList,
    SearchBar,
    FilterSheet,
  },
  data() {
    return {
      search: "",
      filters: { optional: [], selected: [], sort: undefined } as {
        optional: string[];
        selected: string[];
        sort: string | undefined;
      },
      searchRequest: "title",
      drawer: false,
      group: null,
      items: [
        {
          title: "Foo",
          value: "foo",
        },
        {
          title: "Bar",
          value: "bar",
        },
        {
          title: "Fizz",
          value: "fizz",
        },
        {
          title: "Buzz",
          value: "buzz",
        },
      ],
    };
  },
  computed: {
    filteredList(): Project[] | undefined {
      var p_list = this.data.projects;
      // Check for category
      if (this.filters.sort) {
        p_list.sort((a, b) => {
          if (!a.application_deadline || !b.application_deadline) return -1;
          if (a.application_deadline > b.application_deadline) {
            return 1;
          } else if (a.application_deadline < b.application_deadline) {
            return -1;
          } else {
            return 0;
          }
        });
      }
      if (this.filters.selected.length > 0) {
        console.log("selected ====", this.filters.selected);
        const s_list = p_list.filter((project) => {
          return project.categories?.every((p) => {
            return this.filters.selected.includes(p);
          });
        });
        console.log("s_list ====", s_list);
        p_list = s_list;
      }

      if (this.filters.optional.length > 0) {
        const s_list = p_list.filter((project) => {
          return project.optional?.every((p) => {
            return this.filters.optional.includes(p);
          });
        });
        p_list = s_list;
      }

      if (this.searchRequest === "title") {
        const se_list = p_list.filter((project) => {
          return project.project_title
            .toLowerCase()
            .includes(this.search.toLowerCase());
        });
        p_list = se_list;
      }
      return p_list;
    },
  },
  methods: {
    handleFilter(filter: any) {
      if (filter === "clear") {
        this.filters = { optional: [], selected: [], sort: undefined };
        console.log("Clear clicked");
        return;
      }

      if (filter instanceof Object) {
        this.filters = JSON.parse(JSON.stringify(filter));
        console.log("Filter options", this.filters);
        return;
      }

      console.log("Filter clicked");
    },
    filterOptions() {
      let filteredProject = this.data.projects;
      return filteredProject;
    },
  },
  watch: {
    group() {
      this.drawer = false;
    },
  },
  mounted() {
    // console.log("Project in homeview..", this.data.projects);
  },
});
</script>
