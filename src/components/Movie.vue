<template>
<Player :playlist="video.playUrl" v-if="video.playUrl"/>
</template>

<script setup>
import {ref, watch, computed} from 'vue'
import {useRouter} from 'vue-router'
import { useQuery } from '@vue/apollo-composable'
import Player from './Player.vue'
import gql from 'graphql-tag'

const props = defineProps({
    id: {
        type: String,
        required: true
    }
})

const $router = useRouter()


const { result, loading } = useQuery(gql`
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
`, () => ({
    ids: [props.id]
}))

const video = computed(() => {
    const video = {...(result.value?.movies[0] || {})}
    if(video && video.playUrl) {
        video.playUrl = video.playUrl.split('#').map(i => {
          i = i.split('$')
          return {
            name: i[0],
            sources: [{
                src: i[1],
                type: 'application/x-mpegURL'
            }],
          }
        })
    }
    return video
})

// watch(() => {console.log(result.value?.videos);})
// setInterval(() => loadMore(), 5000)

</script>