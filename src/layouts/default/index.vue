<template>
  <v-app class="h-screen" theme="dark">
    <default-bar />

    <default-view style="max-height: 100%;"/>
  </v-app>
</template>

<script setup>
  import DefaultBar from './AppBar.vue'
  import DefaultView from './View.vue'
</script>
