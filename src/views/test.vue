<script setup>
import { gql, useQuery } from "@urql/vue";
const { data } = useQuery({
	query: gql`
query($url: URL!){
  proxy( url: $url)
}
`,
	variables: {
		url: "https://httpbun.com/get",
	},
});
</script>

<template>
  <pre>{{data?.proxy}}</pre>
</template>

<style scoped>

</style>
