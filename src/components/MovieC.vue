<template>
  <v-progress-linear color="primary" indeterminate v-if="loading || proxyLoading"/>
  <PlayerVideo :playlist="playUrl" v-if="playUrl.length"/>
</template>

<script setup>
import {computed, reactive, ref, watch} from 'vue'
import {useQuery} from '@vue/apollo-composable'
import PlayerVideo from './PlayerVideo.vue'
import gql from 'graphql-tag'

const props = defineProps({
  id: {
    type: String,
    required: true
  }
})


const {result, loading} = useQuery(gql`
query($ids: [String!]){
  movies(ids: $ids){
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
  ids: [props.id]
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

const proxyVariables = reactive({
  url: ''
})
const proxyEnabled = ref(false)
const {onResult, loading: proxyLoading} = useQuery(gql`
query($url: URL!){
  proxy(url: $url, type: base64)
}
  `, proxyVariables, {
  enabled: proxyEnabled
})

const fetchM3u8 = async (src) => {
  proxyVariables.url = src
  return new Promise(resolve => {
    onResult((rea) => {
      const proxy = rea?.data?.proxy
      proxy && resolve(proxy)
    })
    proxyEnabled.value = true
  })
}
const playUrl = ref([])
watch(video, async () => {
  const playlist = [];
  for (let {name, src} of video.value?.playUrl || []){
    src = await fetchM3u8(src)
    playlist.push({
      name,
      sources: [{
        src,
        type: 'application/x-mpegURL'
      }],
    })
  }
  playUrl.value = playlist;
  // console.log('playUrl', playUrl.value)
})

</script>