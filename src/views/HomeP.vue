<template>
  <!-- <HelloWorld /> -->
  <MovieC v-if="$route.params.id" :id="$route.params.id"/>
  <MoviesC v-else/>
</template>

<script setup>
// import HelloWorld from '@/components/HelloWorld.vue'
import MoviesC from '@/components/MoviesC.vue'
import MovieC from '@/components/MovieC.vue';
import {useRoute} from 'vue-router'

const $route = useRoute()

</script>
