<template>
  <!-- <HelloWorld /> -->
  <Movie v-if="$route.params.id" :id="$route.params.id"/>
  <Movies v-else/>
</template>

<script setup>
// import HelloWorld from '@/components/HelloWorld.vue'
import Movies from '@/components/Movies.vue'
import Movie from '@/components/Movie.vue';
import {useRoute} from 'vue-router'

const $route = useRoute()

</script>
