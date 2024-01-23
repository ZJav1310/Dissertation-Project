<template>
  <div>
    <v-card>
      <v-card-text class="text-h5" style="line-height: normal">
        {{ project?.project_title }}
      </v-card-text>
      <div class="ml-4">
        <v-chip
          class="ma-1"
          size="small"
          rounded
          v-for="(term, index) in project?.project_content.index_terms.split(
            ','
          )"
          :key="index"
          >{{ term }}</v-chip
        >
      </div>
      <v-card-text>{{ project?.project_content.description }}</v-card-text>
      <v-card-text
        >Requirements:
        {{ project?.project_content.student_requirements }}</v-card-text
      >
      <v-card-text v-if="project?.project_content.degree_courses"
        >Degree Course:
        {{ project?.project_content.degree_courses }}</v-card-text
      >
      <v-card-text v-if="project?.project_content.references"
        >References: {{ project?.project_content.references }}</v-card-text
      >
      <v-card-item></v-card-item>

      <v-divider class="mx-4 mb-1"></v-divider>

      <v-card-actions>
        <v-btn
          @click="
            () => {
              shortlist.isInShortlist(project) ? removeProject() : addProject();
            }
          "
          >{{
            shortlist.isInShortlist(project) ? "Remove from" : "Add to"
          }}
          Shortlist</v-btn
        >
        <v-btn
          :prepend-icon="show ? 'mdi-chevron-up' : 'mdi-chevron-down'"
          @click="show = !show"
          >Files</v-btn
        >
      </v-card-actions>
      <v-expand-transition>
        <div v-show="show">
          <v-divider></v-divider>
          <div v-for="(file, index) in files" :key="index">
            <div class="ma-5" v-if="file.project_id === project.project_id">
              <project-files :file="file"></project-files>
            </div>
          </div>
        </div>
      </v-expand-transition>
    </v-card>
  </div>
</template>

<script lang="ts">
import { PropType, defineComponent, ref } from "vue";
import { useProjectStore } from "@/store/projects.module";
import { useRoute } from "vue-router";
import { useShotlistStore } from "@/store/shortlist.module";
import ProjectFiles from "@/components/ProjectFiles.vue";

export default defineComponent({
  setup() {
    const route = useRoute();
    const projects = useProjectStore();
    const id = Array.isArray(route.params.id)
      ? route.params.id[0]
      : route.params.id;
    const project = projects.getProjectById(Number.parseInt(id));

    const shortlist = useShotlistStore();
    return { route, project, shortlist };
  },
  data: () => ({
    show: false,
    files: [
      {
        project_id: 1,
        file_id: 101,
        file_name: "study_report.pdf",
        file_format: "PDF",
        file_location: "https://example.com/files/project1/study_report.pdf",
        file_date_upload: "2023-07-31T09:00:00Z",
      },
      {
        project_id: 2,
        file_id: 102,
        file_name: "campus_app_prototype.png",
        file_format: "PNG",
        file_location:
          "https://example.com/files/project2/campus_app_prototype.png",
        file_date_upload: "2023-07-31T10:30:00Z",
      },
      {
        project_id: 3,
        file_id: 103,
        file_name: "course_management_app_design.pdf",
        file_format: "PDF",
        file_location:
          "https://example.com/files/project3/course_management_app_design.pdf",
        file_date_upload: "2023-07-31T12:15:00Z",
      },
      {
        project_id: 4,
        file_id: 104,
        file_name: "e-commerce_platform_demo.mp4",
        file_format: "MP4",
        file_location:
          "https://example.com/files/project4/e-commerce_platform_demo.mp4",
        file_date_upload: "2023-07-31T14:45:00Z",
      },
      {
        project_id: 5,
        file_id: 105,
        file_name: "new_study_report.pdf",
        file_format: "PDF",
        file_location:
          "https://example.com/files/project5/new_study_report.pdf",
        file_date_upload: "2023-07-31T16:30:00Z",
      },
      {
        project_id: 6,
        file_id: 106,
        file_name: "market_trends_analysis.xlsx",
        file_format: "XLSX",
        file_location:
          "https://example.com/files/project6/market_trends_analysis.xlsx",
        file_date_upload: "2023-07-31T18:00:00Z",
      },
      {
        project_id: 7,
        file_id: 107,
        file_name: "platformer_game_design.pdf",
        file_format: "PDF",
        file_location:
          "https://example.com/files/project7/platformer_game_design.pdf",
        file_date_upload: "2023-07-31T20:20:00Z",
      },
      {
        project_id: 8,
        file_id: 108,
        file_name: "real-time_chat_app_demo.mp4",
        file_format: "MP4",
        file_location:
          "https://example.com/files/project8/real-time_chat_app_demo.mp4",
        file_date_upload: "2023-07-31T22:10:00Z",
      },
      {
        project_id: 9,
        file_id: 109,
        file_name: "image_recognition_system_demo.png",
        file_format: "PNG",
        file_location:
          "https://example.com/files/project9/image_recognition_system_demo.png",
        file_date_upload: "2023-08-01T09:40:00Z",
      },
      {
        project_id: 10,
        file_id: 110,
        file_name: "fitness_app_prototype.png",
        file_format: "PNG",
        file_location:
          "https://example.com/files/project10/fitness_app_prototype.png",
        file_date_upload: "2023-08-01T11:20:00Z",
      },
      {
        project_id: 11,
        file_id: 111,
        file_name: "cms_app_design.pdf",
        file_format: "PDF",
        file_location: "https://example.com/files/project11/cms_app_design.pdf",
        file_date_upload: "2023-08-01T13:15:00Z",
      },
      {
        project_id: 12,
        file_id: 112,
        file_name: "chatbot_system_demo.mp4",
        file_format: "MP4",
        file_location:
          "https://example.com/files/project12/chatbot_system_demo.mp4",
        file_date_upload: "2023-08-01T15:30:00Z",
      },
      {
        project_id: 13,
        file_id: 113,
        file_name: "sales_forecasting_analysis.xlsx",
        file_format: "XLSX",
        file_location:
          "https://example.com/files/project13/sales_forecasting_analysis.xlsx",
        file_date_upload: "2023-08-01T17:45:00Z",
      },
    ],
  }),
  props: {},
  components: { ProjectFiles },
  methods: {
    addProject() {
      this.shortlist.addProjectToShortlist(this.project);
    },
    removeProject() {
      this.shortlist.removeProjectFromShortlist(this.project);
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
