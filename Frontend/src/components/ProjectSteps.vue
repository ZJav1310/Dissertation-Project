<template>
  <v-card class="mx-auto" style="width: 100%">
    <v-card-title class="text-h6 font-weight-regular justify-space-between">
      <span>{{ currentTitle }}</span>
      <v-avatar color="primary" size="24" v-text="step"></v-avatar>
    </v-card-title>

    <v-window v-model="step">
      <v-window-item :value="1">
        <v-card-text>
          <v-text-field
            label="Title"
            v-model="project.project_title"
            placeholder="Amazing Project Title Here"
          ></v-text-field>
        </v-card-text>
      </v-window-item>

      <v-window-item :value="2">
        <v-card-text>
          <v-textarea
            auto-height
            v-model="project.project_content.description"
            label="Description"
          ></v-textarea>
          <v-text-field
            v-model="project.project_content.index_terms"
            label="Index Terms"
          ></v-text-field>
          <v-text-field
            v-model="project.project_content.categories"
            label="Categories"
          ></v-text-field>
          <v-text-field
            v-model="project.project_content.student_requirements"
            label="Student Requirement"
          ></v-text-field>
          <v-text-field
            v-model="project.project_content.degree_courses"
            label="Degree Courses"
          ></v-text-field>
          <v-text-field
            v-model="project.project_content.references"
            label="References"
          ></v-text-field>
        </v-card-text>
      </v-window-item>

      <v-window-item :value="3">
        <div class="pa-4 text-center">
          <v-text-field
            type="datetime-local"
            v-model="project.application_deadline"
            label="Set Deadline?"
          ></v-text-field>
          <v-text-field
            type="number"
            v-model="project.max_capacity"
            label="Max Applicants?"
          ></v-text-field>
        </div>
      </v-window-item>

      <v-window-item :value="4">
        <div class="pa-4 text-center">
          <v-file-input disabled label="File input"></v-file-input>
        </div>
      </v-window-item>

      <v-window-item :value="5">
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
                v-for="(
                  term, index
                ) in project?.project_content.index_terms.split(',')"
                :key="index"
                >{{ term }}</v-chip
              >
            </div>
            <v-card-text>{{
              project?.project_content.description
            }}</v-card-text>
            <v-card-text
              >Requirements:
              {{ project?.project_content.student_requirements }}</v-card-text
            >
            <v-card-text v-if="project?.project_content.degree_courses"
              >Degree Course:
              {{ project?.project_content.degree_courses }}</v-card-text
            >
            <v-card-text v-if="project?.project_content.references"
              >References:
              {{ project?.project_content.references }}</v-card-text
            >
            <v-card-item></v-card-item>

            <v-btn color="primary" block @click="handleSubmit">Submit</v-btn>
            <v-divider class="mx-4 mb-1"></v-divider>
          </v-card>
        </div>
      </v-window-item>
    </v-window>

    <v-divider></v-divider>

    <v-card-actions>
      <v-btn v-if="step > 1" variant="text" @click="step--"> Back </v-btn>
      <v-spacer></v-spacer>
      <v-btn v-if="step < 5" color="primary" variant="flat" @click="step++">
        Next
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import ProjectHandler from "@/handlers/project.handler";
import ProjectService from "@/services/project.service";
import { useUserStore } from "@/store/auth.module";
import Project from "@/types/project.type";

import { PropType } from "vue";

export default {
  data: () => ({
    step: 1,
  }),
  props: {
    p: {
      type: Object as PropType<Project>,
      default: () => ({}),
    },
  },
  methods: {
    logger() {
      console.log(this.project);
    },
    checkDateandSpace(values) {
      const newValues = values;

      if (values.max_capacity) {
        newValues.max_capacity = parseInt(values.max_capacity);
      }

      if (values.application_deadline) {
        newValues.application_deadline = new Date(values.application_deadline);
      }

      return newValues;
    },
    handleSubmit() {
      const id = useUserStore().$state.data.user.user_id;
      const phandler = new ProjectHandler(this.project);
      phandler.setUpdatedAt(new Date());
      phandler.setAuthorId(id);
      phandler.setId(-1);
      const pr = this.checkDateandSpace(phandler.forDatabase());
      console.log("PROJECT", pr);

      this._addProject(pr).then((p: any) => {
        console.log("Project", pr);
        console.log("PROJECT RESPONSE", p);
      });
    },
    async _addProject(values: any) {
      console.log("Adding project");
      const p = await ProjectService.addProject(values).catch((e: any) => {
        console.log(e);
      });

      return p;
    },
  },
  computed: {
    currentTitle() {
      switch (this.step) {
        case 1:
          return "What's the title? ";
        case 2:
          return "Describe your project ";
        case 3:
          return "Set a deadline ";
        case 4:
          return "Upload files ";
        case 5:
          return "Review ";
        default:
          return "Create from template? ";
      }
    },
    project() {
      const reset = {
        project_title: "",
        project_content: {
          description: "",
          references: "",
          index_terms: "",
          degree_course: "",
          student_requirements: "",
        },
        author_id: -1,
        max_capacity: 1,
        categories: [],
        optional: [],
      } as unknown as Project;

      if (this.p === null) return reset;
      return this.p;
    },
  },
};
</script>
