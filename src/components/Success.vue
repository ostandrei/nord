<script setup lang="ts">
import { useRouter } from "vue-router";
const router = useRouter();
</script>

<template>
  <nord-card padding="l" class="n-align-center">
    <h2 slot="header">Thank you!</h2>
    <nord-icon
      name="interface-checked-circle"
      size="xxl"
      color="green"
      class="n-margin-b-l"
    ></nord-icon>
    <div class="n-align-center">You have successfully signed up for product updates!</div>
    <nord-button slot="footer" variant="primary" @click="router.push({ name: 'signup' })">
      <nord-icon name="interface-home" slot="start"></nord-icon>
      Home
    </nord-button>
  </nord-card>
</template>

<style scoped></style>
