<template>
  <v-app-bar flat density="compact">
    <v-app-bar-title @click="$router.push('/')">
      <v-icon icon="mdi-circle-slice-6" />
      XX影视
    </v-app-bar-title>
    <v-spacer></v-spacer>

    <v-btn icon @click="dialog.show = true">
      <v-icon>mdi-dots-vertical</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script setup>
import {dialog} from "@/components/SearchInput";
</script>
