<template>
  <v-dialog
    v-model="dialog.show"
    persistent
    width="80%"
  >
    <v-form validate-on="submit lazy" @submit.prevent="submit">
      <v-card>
        <template v-slot:text>
        <v-text-field v-model="form.wd" clearable label="关键词" />
        <v-chip-group filter v-model="form.c">
          <v-chip :value="i.id" v-for="i in categories" :key="i.id">{{i.name}}</v-chip>
        </v-chip-group>
        </template>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue-darken-1"
            variant="text"
            @click="dialog.show = false"
          >
            关闭
          </v-btn>
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
  </v-dialog>
</template>
<script setup>
import {computed, reactive} from "vue";
import {useQuery} from "@vue/apollo-composable";
import gql from "graphql-tag";
import {url} from "@/config/vod";

const emit = defineEmits(['submit'])

const dialog = reactive({
  show: true
})
const form = reactive({
  wd: '',
  c: '',
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
const categories = computed(() => result.value?.categories || [])
</script>

