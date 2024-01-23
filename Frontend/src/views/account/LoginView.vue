<template>
  <form @submit.prevent="submit">
    <v-text-field
      :readonly="loading"
      v-model="email.value.value"
      :error-messages="password.errorMessage.value"
      label="Email"
    ></v-text-field>

    <v-text-field
      :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
      :type="show1 ? 'text' : 'password'"
      name="Password"
      :readonly="loading"
      v-model="password.value.value"
      :error-messages="password.errorMessage.value"
      label="Password"
      hint="At least 8 characters"
      counter
      @click:append="show1 = !show1"
    ></v-text-field>

    <v-btn class="me-4" type="submit" :loading="loading"> submit </v-btn>

    <v-btn @click="handleReset"> clear </v-btn>
  </form>
</template>

<script lang="ts">
import { useUserStore } from "@/store/auth.module";
import { useField, useForm } from "vee-validate";
import { ref } from "vue";

export default {
  data() {
    return {
      show1: false,
      // password: "Password",
    };
  },
  setup() {
    const userState = useUserStore();

    var loading = ref(false);

    const { handleSubmit, handleReset } = useForm({
      validationSchema: {
        email(value: string) {
          if (value?.length >= 2) return true;

          return "Name needs to be at least 2 characters.";
        },
        password(value: string) {
          if (value?.length >= 5) return true;

          return "Content needs to be at least 5 characters.";
        },
      },
    });

    const email = useField("email");
    const password = useField("password");

    const submit = handleSubmit((values) => {
      loading.value = true;
      userState
        .login({ email: values.email, password: values.password })
        .finally(() => (loading.value = false));
      // loading.value = true;
    });

    return {
      email,
      password,
      submit,
      handleReset,
      loading,
      userState,
    };
  },
};
</script>
