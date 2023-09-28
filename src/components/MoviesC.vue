<template>
  <v-progress-linear color="primary" indeterminate v-if="loading"/>
<v-virtual-scroll
    max-height="100%"
    :items="movies"
>
    <template v-slot:default="{ item, index }">
        <v-card :title="item.name" :subtitle="item.remarks" :text="item.playFrom" class="ma-4" v-ripple @click="$router.push(`/videos/${item.id}`)">
            <v-card-actions class="justify-space-between">
                <v-btn>{{item.category.name}}</v-btn>
                <v-btn>播放</v-btn>
            </v-card-actions>
        </v-card>
        <div class="text-center py-2" v-if="index && movies?.length <= (index + 1)">
          <v-btn @click="loadMore()" :loading="loading">
          点击加载更多
        </v-btn>
        </div>
    </template>
</v-virtual-scroll>
  <v-alert v-if="error" closable :text="error.message" type="error" variant="tonal"/>
  <search-input @submit="searchSubmit" />
</template>
<script setup>
import {computed, reactive, ref, watch} from 'vue'
import {useRouter} from 'vue-router'
import { useQuery } from '@vue/apollo-composable'
import gql from 'graphql-tag'
import SearchInput from "@/components/SearchInput.vue";
import {url} from "@/config/vod";

const $router = useRouter()

const variables = reactive({
  pg: 1,
  url,
  c: '',
  wd: '',
  ...Object.fromEntries((new URLSearchParams(location.search)))
})
const { result, loading, error } = useQuery(gql`
query($pg: Int!, $c: Int, $wd: String, $url: URL!){
  movies(pg: $pg, _url: $url, c: $c, wd: $wd){
    id
    name
    remarks
    playFrom
    category{
      id
      name
    }
  }
}
`, computed(() =>
  Object.fromEntries(
    Object.entries(variables).map(([k, v]) =>
      [k, 'pg,c'.includes(k) ? +v : v]
    )
  )
))

const movies = ref([])
watch(result, () => {
  const _movies = result.value?.movies || []
  if(variables.pg === 1) {
    movies.value = [..._movies]
  }else{
    movies.value.push(..._movies)
  }

  // console.log('watchEffect: ', movies.value)
}, {
  immediate: true,
})

const searchSubmit = (from) => {
  from = Object.fromEntries(Object.entries(from).filter(([,v])=> v))
  Object.assign(variables, from, {pg: 1})
  $router.replace({
    query: from
  })
}

const loadMore = (_pg = null) => {
  variables.pg = _pg ?? variables.pg+1;
}
</script>
