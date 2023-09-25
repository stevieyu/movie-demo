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


const video = computed(() => {
  const video = {...(result.value?.movies[0] || {})}
  if (video && video.playUrl) {
    video.playUrl = video.playUrl.split('#').map(i => {
      i = i.split('$')
      return {name: i[0], src: i[1]}
    })
  }
  return video
})


const playUrl = ref([])
watch(video, async () => {
  const playlist = [];
  for (let {name, src} of video.value?.playUrl || []){
    playlist.push({
      name,
      sources: [{
        src: src.replace(/:\//, '://hono.dgcf.link'),
        type: 'application/x-mpegURL'
      }],
    })
  }
  playUrl.value = playlist;
  // console.log('playUrl', playUrl.value)
}, {
  immediate: true,
})

</script>
