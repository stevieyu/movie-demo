<template>
  <v-app class="h-screen" theme="dark">
<!--    <default-bar />-->

    <v-main style="max-height: 100%;" class="d-flex flex-column">
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup>
  // import DefaultBar from './AppBar.vue'
</script>
