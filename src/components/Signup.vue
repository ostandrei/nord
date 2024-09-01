<script setup lang="ts">
import { computed, reactive, ref, watchEffect } from "vue";
import type { Input } from "@nordhealth/components";
import { useRouter } from "vue-router";
const router = useRouter();
type inputType = "text" | "email" | "password" | "tel" | "url" | "search" | "number" | "unit";

function useField(initialValue = "") {
  const inputRef = ref<Input>();
  const value = ref(initialValue);
  const error = ref<string>();
  const testEmail = (email: string) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
  const testPassword = (password: string) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);

  const rules: Partial<Record<inputType, Function>> = { email: testEmail, password: testPassword };

  const valid = computed((): boolean => !!value.value && validate(inputRef.value as Input));
  const validate = (value: Input) => {
    return rules[value.type]!(value.value);
  };

  watchEffect(() => {
    if (valid.value) {
      error.value = undefined;
    }
  });

  return reactive({
    value,
    error,
    valid,
    focus: () => inputRef.value?.focus(),
    setRef: (el: Input) => {
      inputRef.value = el;
    },
  });
}

const username = useField();
const password = useField();
const passwordFieldType = ref<inputType>("password");

const switchVisibility = () =>
  (passwordFieldType.value = passwordFieldType.value === "password" ? "text" : "password");

function handleSubmit() {
  if (username.valid && password.valid) {
    router.push({ name: "success" });
  }

  if (!password.valid) {
    password.error = "Please enter a valid password";
    password.focus();
  }

  if (!username.valid) {
    username.error = "Please enter a valid email address";
    username.focus();
  }
}
</script>

<template>
  <nord-card padding="l">
    <h2 slot="header">Sign up for updates from Nordhealth</h2>
    <form action="#" @submit.prevent="handleSubmit">
      <nord-stack>
        <nord-input
          label="Email"
          expand
          type="email"
          name="username"
          placeholder="user@example.com"
          :ref="username.setRef"
          :error="username.error as string"
          v-model="username.value"
        >
          <div slot="hint">Email address should be like user@example.com</div>
        </nord-input>

        <div class="password">
          <nord-input
            label="Password"
            expand
            :type="passwordFieldType"
            name="password"
            placeholder="••••••••"
            :ref="password.setRef"
            :error="password.error as string"
            v-model="password.value"
          >
            <nord-icon
              slot="end"
              size="m"
              name="interface-edit-on"
              @click="switchVisibility"
            ></nord-icon>
            <div slot="hint">
              Password should be minimum eight characters, at least one uppercase letter, one
              lowercase letter, one number and one special character
            </div>
          </nord-input>
        </div>

        <div class="signup">
          <nord-checkbox
            label="I agree to receive occasional product updates and announcements"
            value="Value"
          ></nord-checkbox>
        </div>

        <nord-button type="submit" expand variant="primary"> Sign in </nord-button>
      </nord-stack>
    </form>
  </nord-card>
</template>

<style scoped>
:deep(nord-icon) {
  pointer-events: all !important;
  cursor: pointer;
}
</style>
