<template>
  <nord-header>
    <h1 class="n-typescale-l">Nordhealth</h1>
  </nord-header>
  <main class="n-reset n-stack-horizontal">
    <nord-stack class="stack">
      <RouterView />
    </nord-stack>
  </main>
</template>

<style>
@import "./assets/base.css";

.stack {
  inline-size: 90%;
  max-inline-size: 340px;
  margin: var(--n-space-xl) auto;
}
</style>
