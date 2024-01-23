<template>
  <div v-if="file !== undefined">
    <v-card
      v-if="file.file_location !== undefined && file.file_location !== ''"
      variant="tonal"
      density="compact"
    >
      <div class="d-flex flex-no-wrap justify-space-between">
        <v-avatar class="ma-3" size="125" rounded="xl" color="blue">
          {{ file.file_format }}
        </v-avatar>
        <div>
          <v-card-item>
            <div class="text-subtitle-1">{{ file.file_name }}</div>
            <!-- <v-chip color="primary" size="small">
              <v-icon start icon="mdi-calendar"></v-icon>
              {{
                file.file_date_upload.toLocaleString("en-GB", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                  hour: "numeric",
                  minute: "2-digit",
                })
              }}
            </v-chip> -->
          </v-card-item>
          <v-card-actions>
            <v-btn size="small" :href="file.file_location">Download</v-btn>
          </v-card-actions>
        </div>
      </div>
    </v-card>
  </div>
</template>

<script lang="ts">
import ProjectFile from "@/types/project.file.type";
import { PropType, defineComponent } from "vue";

export default defineComponent({
  setup() {
    console.log("ProjectFiles");
  },
  computed: {},
  props: {
    file: Object as PropType<ProjectFile>,
  },
});
</script>
