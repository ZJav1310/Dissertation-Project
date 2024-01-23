<!-- eslint-disable prettier/prettier -->
<template>
  <form @submit.prevent="submit">
    <v-container fluid>
      <v-text-field
        v-model="title.value.value"
        :counter="10"
        :error-messages="title.errorMessage.value"
        label="Title"
      ></v-text-field>

      <v-textarea
        v-model="content.value.value"
        :error-messages="content.errorMessage.value"
        label="Project Description"
        auto-grow
      ></v-textarea>

      <v-row>
        <v-col cols="12" md="8" sm="7">
          <v-text-field
            type="datetime-local"
            v-model="deadline.value.value"
            :error-messages="deadline.errorMessage.value"
            label="Deadline"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="4" sm="5">
          <v-text-field
            type="number"
            v-model="max_app.value.value"
            :error-messages="max_app.errorMessage.value"
            label="Max Applicants"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-file-input
        show-size
        multiple
        chips
        accept="application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint, text/plain, application/pdf, image/*"
        label="File input"
      ></v-file-input>
    </v-container>

    <v-btn class="me-4" type="submit"> submit </v-btn>

    <v-btn @click="handleReset"> clear </v-btn>
  </form>
</template>

<script>
// import { ref } from 'vue';
import ProjectService from "@/services/project.service";
import { useField, useForm } from "vee-validate";
import { useNotificationStore } from "@/store/notification.module";

export default {
  setup() {
    const { add, trigger } = useNotificationStore();
    const { handleSubmit, handleReset } = useForm({
      validationSchema: {
        title(value) {
          if (value?.length >= 2) return true;

          return "Name needs to be at least 2 characters.";
        },
        content(value) {
          if (value?.length >= 10) return true;

          return "Content needs to be at least 10 characters.";
        },
        deadline(value) {
          if (value == null) {
            return true;
          }
          if (value <= 0) {
            // var date = new Date(value).toISOString();
            //FIXME: Need to change this to something that isnt stupid
            return "Deadline must be greater than 0.";
          } else {
            return true;
          }
        },
        max_app(value) {
          if (parseInt(value) == null) {
            return true;
          }
          if (parseInt(value) <= 0) {
            return "Max applicants must be greater than 0.";
          } else {
            return true;
          }
        },
      },
    });

    const title = useField("title");
    const content = useField("content");
    const deadline = useField("deadline");
    const max_app = useField("max_app");

    const submit = handleSubmit((values) => {
      // alert(JSON.stringify(values, null, 2));
      trigger({
        group: "global",
        title: "Adding project...",
      });
      const newVal = checkValues(values);
      addProject(newVal);

      add({
        group: "global",
        title: "Added Project...",
        text: "📝📝📝📝",
        type: "success",
      });
    });

    const checkValues = (values) => {
      let newValues = {
        project_title: values.title,
        project_content: values.content,
      };

      if (values.max_app) {
        newValues.max_capacity = parseInt(values.max_app);
      }

      if (values.deadline) {
        newValues.application_deadline = new Date(
          values.deadline
        ).toISOString();
      }

      return newValues;
    };

    const addProject = async (values) => {
      console.log("Adding project");
      const p = await ProjectService.addProject(values).catch((e) =>
        add({
          group: "error",
          title: "Failed to add Project",
        })
      );
      return p;
    };

    function setNewFile(file) {
      console.log("setNewFile");
      const newFile = new File([file], file.name, {
        type: file.type,
      });

      return newFile;
    }

    function handleFileUpload() {
      console.log("handleFileUpload");
    }

    return {
      title,
      content,
      deadline,
      max_app,
      submit,
      handleReset,
      addProject,
      checkValues,
    };
  },
};
</script>
