<template>
  <notifications
    classes="my-notification"
    :max="3"
    group="global"
    position="top center"
    :speed="500"
    closeOnClick
    pauseOnHover
    reverse
    width="70%"
  />

  <v-card>
    <v-layout>
      <v-system-bar color="grey-darken-3"> </v-system-bar>
      <SideBar />
      <v-main style="background-color: #121212 !important">
        <v-container class="d-flex flex-column text-h5">
          <router-view />
        </v-container>
      </v-main>
    </v-layout>
  </v-card>
</template>

<script>
// @ is an alias to /src
import SideBar from "@/components/SideBar.vue";
import io from "socket.io-client";

export default {
  data() {
    return {
      socket: io("localhost:5000"),
    };
  },
  components: {
    SideBar,
  },
};
</script>

<style lang="scss">
.my-notification {
  margin: 0 5px 5px;
  padding: 10px;
  font-size: 12px;
  color: #ffffff;

  /* background-color: #4158D0; */
  background: linear-gradient(43deg, #4158d0 0%, #c850c0 46%, #ffcc70 100%);
  border: 2px solid #4158d0;
  border-radius: 10px;

  &.success {
    /*...*/
    background: linear-gradient(to top, #0ba360 0%, #3cba92 100%);
    border: 2px solid #0ba360;
    border-radius: 10px;
  }
  &.info {
    /*...*/
    background: linear-gradient(
      156.8deg,
      rgb(30, 144, 231) 27.1%,
      rgb(67, 101, 225) 77.8%
    );

    border: 2px solid rgb(30, 144, 231);
    border-radius: 10px;
  }
  &.error {
    /*...*/
    background: radial-gradient(
      circle at 81.9% 53.5%,
      rgb(173, 53, 53) 16.3%,
      rgb(240, 60, 60) 100.2%
    );
    border: 2px solid rgb(173, 53, 53);
    border-radius: 10px;
  }
  &.warn {
    /*...*/
    background: linear-gradient(62deg, #fbab7e 0%, #f7ce68 100%);
    border: 2px solid #fbab7e;
    border-radius: 10px;
  }
}
</style>
