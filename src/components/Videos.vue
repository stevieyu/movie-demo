<template>
<v-virtual-scroll
    max-height="100%"
    :items="result?.videos"
>
    <template v-slot:default="{ item, index }">
        <v-card :title="item.name" :subtitle="item.remarks" :text="item.playFrom" class="ma-4" v-ripple @click="$router.push(`/videos/${item.id}`)">
            <v-card-actions class="justify-space-between">
                <v-btn>{{item.category.name}}</v-btn>
                <v-btn>播放</v-btn>
            </v-card-actions>
        </v-card>
        <div class="text-center py-2" v-if="index && result?.videos?.length <= (index + 1)">
          <v-btn @click="loadMore()" :loading="loading">
          点击加载更多
        </v-btn>
        </div>
    </template>
</v-virtual-scroll>
</template>
<script setup>
import {ref, watch} from 'vue'
import {useRouter} from 'vue-router'
import { useQuery } from '@vue/apollo-composable'
import gql from 'graphql-tag'

const $router = useRouter()

let pg = 1
const { result, fetchMore, loading } = useQuery(gql`
query($pg: Int!){
  videos(pg: $pg){
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
`, () => ({
    pg
}))

// watch(() => {console.log(result.value?.videos);})
// setInterval(() => loadMore(), 5000)

const loadMore = (_pg = null) => {
  pg = _pg ?? pg+1;
  fetchMore({
    variables: {
      pg,
    },
    updateQuery: (previousResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) return previousResult

        let ret = {};
        for(const k of Object.keys(fetchMoreResult)) {
          const v = fetchMoreResult[k]
          if(Array.isArray(previousResult[k]) && Array.isArray(v)){
            ret[k] = previousResult[k].concat(v)
            continue;
          }
          ret[k] = v
        }
        return ret
      },
  })
}
</script>