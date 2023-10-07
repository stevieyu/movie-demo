<script setup>
import { gql, useQuery } from '@urql/vue';
import {watch} from "vue";
const {data} = useQuery({
  query: gql`
query($url: URL!){
  proxy( url: $url)
}
`
  ,
  variables: {
    url: 'https://httpbun.com/get'
  }
})
watch(data, (val) => {
  console.log(val)
})
</script>

<template>
<pre>{{data.proxy}}</pre>
</template>

<style scoped>

</style>
