<template>
  <v-bottom-sheet
    v-if="dialog.show"
    style="position: sticky;bottom: 0;left: 0;"
  >
    <v-form validate-on="submit lazy" @submit.prevent="submit">
      <v-card>
        <template v-slot:text>
        <v-text-field v-model="form.wd" clearable label="关键词" />
        <v-chip-group filter v-model="form.c">
          <template v-for="i in categories.filter(i=>!+i.pid)" :key="i.id">
            <v-chip :value="i.id" size="x-small">{{i.name}}</v-chip>
            <v-chip :value="ii.id" size="x-small" v-for="ii in categories.filter(ii=>ii.pid === i.id)" :data-id="ii.id" :key="ii.id">{{ii.name}}</v-chip>
            <v-divider></v-divider>
          </template>
        </v-chip-group>
        </template>
        <v-card-actions>
          <v-spacer>
            <v-btn
              color="blue-darken-1"
              variant="text"
              @click="dialog.show = false"
            >
              关闭
            </v-btn>
          </v-spacer>
          <v-btn
            color="blue-darken-1"
            variant="text"
            @click="submit"
          >
            提交
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-bottom-sheet>
</template>
<script setup>
import {computed, reactive} from "vue";
import {useQuery} from "@vue/apollo-composable";
import gql from "graphql-tag";
import {url} from "@/config/vod";
import {dialog} from "./SearchInput";

const emit = defineEmits(['submit'])

const form = reactive({
  wd: '',
  c: '',
  ...Object.fromEntries((new URLSearchParams(location.search)))
})

const submit = () => {
  dialog.show = false
  emit('submit', form)
}

const { result } = useQuery(gql`
    query($url: URL!){
      categories(_url: $url){
        id
        name
        pid
      }
    }
    `, {url})
const categories = computed(() =>
  (result.value?.categories || []).map(i => ({
    ...i,
    id: i.id + '',
    pid: i.pid + ''
  }))
)
</script>

