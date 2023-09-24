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
  <v-alert v-if="error" closable :text="error" type="error" variant="tonal"/>
</template>
<script setup>
import {reactive, ref, watch} from 'vue'
import {useRouter} from 'vue-router'
import { useQuery } from '@vue/apollo-composable'
import gql from 'graphql-tag'

const $router = useRouter()

const variables = reactive({
  pg: 1
})
const { result, loading, error } = useQuery(gql`
query($pg: Int!){
  movies(pg: $pg){
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
`, variables)

const movies = ref([])
watch(result, () => {
  movies.value.push(...(result.value?.movies || []))
  // console.log('watchEffect: ', movies.value)
}, {
  immediate: true,
})

const loadMore = (_pg = null) => {
  variables.pg = _pg ?? variables.pg+1;
}
</script>
