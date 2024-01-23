<template>
  <v-navigation-drawer
    v-model="drawer"
    :rail="rail"
    permanent
    @click="rail = false"
  >
    <v-list-item :title="data.user.user_name || 'Not Logged'">
      <template v-slot:append>
        <v-btn
          variant="text"
          icon="mdi-chevron-left"
          @click.stop="rail = !rail"
        ></v-btn>
      </template>
    </v-list-item>
    <v-divider></v-divider>

    <span v-if="!data.isAuthorised">
      <v-list
        density="comfortable"
        nav
        bg-color="indigo-darken-1"
        rounded
        variant="tonal"
      >
        <v-list-item
          prepend-icon="mdi-account-plus-outline"
          title="Register"
          value="register"
          to="/register"
          @click.stop="rail = true"
        ></v-list-item>
        <v-list-item
          prepend-icon="mdi-login-variant"
          title="Login"
          value="login"
          to="/login"
          @click.stop="rail = true"
        ></v-list-item>
      </v-list>
    </span>
    <span v-else>
      <v-list
        density="comfortable"
        nav
        bg-color="indigo-darken-1"
        rounded
        variant="tonal"
      >
        <v-list-item
          prepend-icon="mdi-logout-variant"
          title="Logout"
          value="logout"
          @click="logout"
        ></v-list-item>
      </v-list>

      <v-list density="compact" nav>
        <v-list-item
          prepend-icon="mdi-home-city"
          title="Home"
          value="home"
          to="/"
          @click.stop="rail = true"
        ></v-list-item>

        <v-divider></v-divider>

        <v-list-item
          v-if="data.user.user_level > 1"
          prepend-icon="mdi-plus-box"
          title="Add Project"
          value="newProject"
          to="/new-project"
          @click.stop="rail = true"
        ></v-list-item>
        <v-list-item
          v-if="data.user.user_level > 1"
          prepend-icon="mdi-plus-box"
          title="Add Project"
          value="newProject"
          to="/new-project-new"
          @click.stop="rail = true"
        ></v-list-item>
        <v-list-item
          prepend-icon="mdi-briefcase-eye"
          title="Your Projects"
          value="viewProjects"
          to="/view-projects"
          @click.stop="rail = true"
        ></v-list-item>

        <v-divider></v-divider>

        <v-list-item
          prepend-icon="mdi-square-rounded-badge"
          title="Notifications"
          value="notifications"
          to="/notifications"
          @click.stop="rail = true"
        ></v-list-item>
        <v-list-item
          prepend-icon="mdi:mdi-account"
          title="My Profile"
          value="account"
          to="/profile"
          @click.stop="rail = true"
        ></v-list-item>
      </v-list>
    </span>

    <!-- <div id="nav">
      <span v-if="data.isAuthorised">
        <router-link to="/">Home</router-link> |
        <a @click="logout">Logout</a>
      </span>
      <span v-else>
        <router-link to="/register">Register</router-link> |
        <router-link to="/login">Login</router-link>
      </span>
    </div> -->
  </v-navigation-drawer>
</template>

<script lang="ts">
import { useUserStore } from "@/store/auth.module";
import { storeToRefs } from "pinia";
import { defineComponent } from "vue";
import router from "@/router";

export default defineComponent({
  data() {
    return {
      drawer: true,
      rail: true,
    };
  },
  setup() {
    const { data } = useUserStore();
    const userStore = useUserStore();

    // const { data } = storeToRefs(userStore);

    return { data, userStore };
  },
  methods: {
    async logout() {
      this.userStore.logout();
      this.$router.push("/login");
      this.$router.go(0);
    },
  },
});
</script>

<style>
#nav {
  padding: 30px;
}
#nav a {
  font-weight: bold;
  color: #2c3e50;
}
a:hover {
  cursor: pointer;
}
#nav a.router-link-exact-active {
  color: #42b983;
}
.icon-flipped {
  transform: scaleX(-1);
  -moz-transform: scaleX(-1);
  -webkit-transform: scaleX(-1);
  -ms-transform: scaleX(-1);
}
</style>
