<template>
  <v-progress-linear color="primary" indeterminate v-if="loading"/>
  <PlayerVideo :playlist="playUrl" v-if="playUrl.length"/>
</template>

<script setup>
import {computed, ref, watch} from 'vue'
import {useQuery} from '@vue/apollo-composable'
import PlayerVideo from './PlayerVideo.vue'
import gql from 'graphql-tag'
import {url} from "@/config/vod";

const props = defineProps({
  id: {
    type: String,
    required: true
  }
})

const {result, loading} = useQuery(gql`
query($ids: [String!], $url: URL!){
  movies(ids: $ids, _url: $url){
    id
    name
    remarks
    playFrom
    category{
      id
      name
    }
    sub
    status
    letter
    tag
    class
    pic
    actor
    director
    writer
    blurb
    tota
    timeAdd
    doubanId
    doubanScore
    content
    playUrl
    area
    lang
    year
    version
  }
}
`, {
  ids: [props.id],
  url
})


const video = computed(() => ({...(result.value?.movies[0] || {})}))

const playUrl = computed(() => (video.value?.playUrl?.match(/([^$#]+)\$(http[^$#]+m3u8)/g) || [])
  .map((i) => {
    let [name, src] = i.split('$')
    src = 'https://faas-sgp1-18bc02ac.doserverless.co/api/v1/web/fn-41e9df6e-4d4b-4032-8fb2-e91907859969/default/cors-php' + src.replace(/https?:\//, '');
    return {
      name,
      sources: [{
        src,
        type: 'application/x-mpegURL'
      }],
    }
  })
)

</script>
