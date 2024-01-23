<!-- <script setup>
import { ref } from "vue";
import draggable from "vuedraggable";
const selectedList = ref([
  "Hamburger",
  "Pizza",
  "Spaghetti",
  "Tacos",
  "Teriyaki Chicken",
]);

const favoriteList = ref([
  "Bat wing soup",
  "Spicy Octopus",
  "Anything from Taco Bell",
]);
</script>

<template>
  <h1>Favorite Foods</h1>
  <draggable v-model="selectedList" tag="ul" group="selectedList" :animation="300">
    <template #item="{ element: meal }">
      <li>{{ meal }}</li>
    </template>
  </draggable>

  <h1>Terrible Foods</h1>
  <draggable v-model="favoriteList" tag="ul" group="selectedList" :animation="300">
    <template #item="{ element: meal }">
      <li>{{ meal }}</li>
    </template>
  </draggable>
</template> -->

<!-- <script setup lang="ts">
import { useShotlistStore } from "@/store/shortlist.module";
import { ref } from "vue";
import draggable from "vuedraggable";

const shortlistStore = useShotlistStore();
const { shortlist } = useShotlistStore();

const selectedList = ref([]);
const favoriteList = ref(shortlist);
</script> -->

<script setup lang="ts">
import { useShotlistStore } from "@/store/shortlist.module";
import { defineComponent, ref } from "vue";
import draggable from "vuedraggable";
import MetaHelper from "@/utils/project.meta.helper";

const shortlistStore = useShotlistStore();
const { shortlist } = useShotlistStore();

const selectedList = ref([]);
const favoriteList = ref(shortlist);

function checkList() {
  console.log(selectedList.value);
}
</script>

<template>
  <v-card style="padding: 20px">
    <h1 style="margin-bottom: 10px">Selected</h1>
    <draggable
      v-model="selectedList"
      tag="ul"
      group="projectList"
      :animation="300"
      item-key="x"
    >
      <template #item="{ element: item }">
        <div>
          <!-- <li>{{ item.project_title }}</li> -->
          <v-hover v-slot:default="{ isHovering, props }" open-delay="200">
            <v-list-item
              :elevation="isHovering ? 16 : 0"
              :class="{ 'on-hover': isHovering }"
              v-bind="props"
              :key="item.project_id"
              :title="item.project_title"
              :subtitle="item.project_content"
              :disabled="MetaHelper.isFull(item)"
              active-color="primary"
              v-if="item !== undefined"
              :to="MetaHelper.projectUrl(item)"
            >
              <template v-slot:subtitle>
                <ProjectListChip :item="item" />
              </template>
              <template v-slot:prepend>
                <v-avatar :color="MetaHelper.getIcons(item).color">
                  <v-progress-circular
                    color="white"
                    :model-value="
                      MetaHelper.getPercentage(
                        MetaHelper.applicantCount(item),
                        item.max_capacity ?? 0
                      )
                    "
                  ></v-progress-circular>
                </v-avatar>
              </template>

              <template v-slot:append>
                <v-btn
                  color="grey-lighten-1"
                  icon="mdi-information"
                  variant="text"
                ></v-btn>
              </template>
            </v-list-item>
          </v-hover>
        </div>
      </template>
    </draggable>
  </v-card>
  <v-card style="padding: 20px; margin-top: 10px; margin-bottom: 10px">
    <h1 style="margin-bottom: 10px">Favorites</h1>
    <draggable
      v-model="favoriteList"
      tag="ul"
      group="projectList"
      :animation="300"
      item-key="y"
    >
      <template #item="{ element: item }">
        <div>
          <!-- <li>{{ item.project_title }}</li> -->
          <v-hover v-slot:default="{ isHovering, props }" open-delay="200">
            <v-list-item
              :elevation="isHovering ? 5 : 0"
              :class="{ 'on-hover': isHovering }"
              v-bind="props"
              :key="item.project_id"
              :title="item.project_title"
              :subtitle="item.project_content"
              :disabled="MetaHelper.isFull(item)"
              active-color="primary"
              v-if="item !== undefined"
              :to="MetaHelper.projectUrl(item)"
            >
              <template v-slot:subtitle>
                <ProjectListChip :item="item" />
              </template>
              <template v-slot:prepend>
                <v-avatar :color="MetaHelper.getIcons(item).color">
                  <v-progress-circular
                    color="white"
                    :model-value="
                      MetaHelper.getPercentage(
                        MetaHelper.applicantCount(item),
                        item.max_capacity ?? 0
                      )
                    "
                  ></v-progress-circular>
                </v-avatar>
              </template>

              <template v-slot:append>
                <v-btn
                  color="grey-lighten-1"
                  icon="mdi-information"
                  variant="text"
                ></v-btn>
              </template>
            </v-list-item>
          </v-hover>
        </div>
      </template>
    </draggable>
  </v-card>

  <v-btn @click="checkList()">CHECK</v-btn>
</template>

<style lang="sass" scoped>
.v-list-item.on-hover.v-theme--dark
  background: rgb(var(--v-theme-primary), .02) !important,
  border-radius: 20px,
  border: 2px solid  rgb(var(--v-theme-primary), .2),
  >.v-list-item__text
    color: #000,
</style>
