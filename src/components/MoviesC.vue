<template>
  <v-progress-linear color="primary" indeterminate style="min-height: 4px;" v-if="fetching"/>
  <v-alert v-if="error" closable :text="error.message" type="error" variant="tonal"/>
  <search-input @submit="searchSubmit" />
  <v-virtual-scroll :items="movies" style="max-height: 100%;">
    <template v-slot:default="{ item, index }">
      <v-card class="ma-4" v-ripple @click="$router.push(`/videos/${item.id}`)">
        <v-img
          :src="item.pic"
          class="align-end"
          gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.9)"
          cover
        >
          <v-card-title>{{ item.name }}</v-card-title>
          <div class="d-flex justify-space-between">
              <v-card-subtitle class="d-flex flex-column justify-space-between">
                  <div>{{ item.sub }}</div>
                  <div>{{ item.category.name }}</div>
                  <div>{{ item.remarks }}</div>
                  <div>{{item.playFrom}}</div>
              </v-card-subtitle>
              <v-card-actions>
                  <v-btn
                          class="ms-2"
                          icon="mdi-play"
                          variant="text"
                  />
              </v-card-actions>
          </div>
          <v-card-text>{{ item.content }}</v-card-text>

        </v-img>
      </v-card>
      <div class="text-center py-2" v-intersect="loadMore()" v-if="index - 19 >= 0 && movies?.length <= (index + 1)">
        <v-btn @click="loadMore()" :loading="fetching">
          点击加载更多
        </v-btn>
      </div>
    </template>
  </v-virtual-scroll>
</template>
<script setup>
import {computed, reactive, ref, watch} from 'vue'
import {useDebounceFn} from '@vueuse/core'
import {useRouter} from 'vue-router'
import { gql, useQuery } from '@urql/vue';
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

const {fetching, data, error} = useQuery({
  query: gql`
query($pg: Int!, $c: Int, $wd: String, $url: URL!){
  movies(pg: $pg, _url: $url, c: $c, wd: $wd){
    id
    name
    sub
    remarks
    pic
    content
    playFrom
    category{
      id
      name
    }
  }
}
      `,
  variables: computed(() =>
    Object.fromEntries(
      Object.entries(variables).map(([k, v]) =>
        [k, 'pg,c'.includes(k) ? +v : v]
      )
    )
  )
})


const movies = ref([])
watch(data, () => {
  const _movies = (data.value?.movies || []).map((i) => {
    let {pic, content} = i
    if(content) content = content.replace(/<[^>]*>/g, '').replace(/&#(\d+);/g, (match, dec) => String.fromCharCode(dec))
    if(pic) pic = 'https://wsrv.nl/?url='+ pic.replace(/https?:\/\//, '')
    // if(pic) pic = 'https://cxqpwhsdja.cloudimg.io/'+ pic.replace(/https?:\/\//, ''); //25g
    // if(pic) pic = 'https://ik.imagekit.io/4e7delgqdnn/'+ pic; //20g
    // if(pic) pic = 'https://dg-jx.twic.pics/wsrv/'+ pic.replace(/https?:\/\//, ''); //3g
    return {...i, pic, content}
  })
  if(variables.pg === 1) {
    movies.value = _movies
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

const loadMore = useDebounceFn((_pg = null) => {
  if(fetching.value) return
  variables.pg = _pg ?? variables.pg+1;
}, 100)
</script>
