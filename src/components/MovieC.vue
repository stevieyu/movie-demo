<template>
  <v-progress-linear color="primary" indeterminate v-if="fetching" />
  <v-alert v-if="error" closable :text="error.message" type="error" variant="tonal" />
  <PlayerVideo :playlist="playUrl" v-if="playUrl.length" />
</template>

<script setup>
import { computed, watch } from "vue";
import { gql, useQuery } from "@urql/vue";
import PlayerVideo from "./PlayerVideoJs.vue";
import { url } from "@/config/vod";

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
});

const { data, fetching, error } = useQuery({
  query: gql`
query($ids: [String!], $url: URL){
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
}`,
  variables: {
    ids: [props.id],
    url,
  },
});

const video = computed(() => {
  const { movies = [] } = data.value || {};
  return movies[0];
});

watch(
  video,
  (val) => {
    val && val.name && (document.title = val.name);
  },
  { immediate: true },
);

const playUrl = computed(() =>
  (video.value?.playUrl?.match(/([^$#]+)\$(http[^$#]+m3u8)/g) || [])
    .map((i) => i.split("$"))
    .reduce((unique, item) => {
      if (!unique.some((i) => i[1] === item[1])) {
        unique.push(item);
      }
      return unique;
    }, [])
    .map(([name, src]) => {
      // src = 'https://faas-sgp1-18bc02ac.doserverless.co/api/v1/web/fn-41e9df6e-4d4b-4032-8fb2-e91907859969/default/cors-php' + src.replace(/https?:\//, '');
      // src = 'https://closely-dynamic-quetzal.edgecompute.app/hono.dgjx.workers.dev' + src.replace(/https?:\//, '');
      return {
        name,
        sources: [
          {
            src,
            type: "application/x-mpegURL",
          },
        ],
      };
    }),
);
</script>
