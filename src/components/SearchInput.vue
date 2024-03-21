<template>
  <v-expansion-panels variant="popout" class="mt-1 max-h-full" v-model="vepValue">
    <v-expansion-panel title="搜索" value="search" class="max-h-full flex flex-column">
      <v-expansion-panel-text class="overflow-auto max-h-full">
        <v-form validate-on="submit lazy" @submit.prevent="submit">
          <v-text-field v-model="form.wd" clearable label="关键词"/>
          <v-chip-group filter v-model="form.c" column>
            <template v-for="i in categories.filter(i=>!+i.pid)" :key="i.id">
              <v-chip :value="i.id" size="small">
                {{ i.name }}
              </v-chip>
              <v-chip :value="ii.id" size="small" v-for="ii in categories.filter(iii=>iii.pid === i.id)" :data-id="ii.id"
                      :key="ii.id">
                {{ ii.name }}
              </v-chip>
              <v-divider></v-divider>
            </template>
          </v-chip-group>
          <div class="flex justify-space-between sticky bottom-0 left-0 w-full">
            <v-btn color="blue-darken-1" variant="text" @click="vepValue=[]">
              关闭
            </v-btn>
            <v-btn color="blue-darken-1" variant="text" @click="submit">
              提交
            </v-btn>
          </div>
        </v-form>
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
</template>
<script setup>
import {computed, reactive, ref} from "vue";
import {gql, useQuery} from '@urql/vue';
import {url} from "@/config/vod";

const emit = defineEmits(['submit'])
const vepValue = ref([])
const form = reactive({
  wd: '',
  c: '',
  ...Object.fromEntries((new URLSearchParams(location.search)))
})

const submit = () => {
  emit('submit', form)
  vepValue.value = []
}

const {data} = useQuery({
  query: gql`
    query($url: URL){
      categories(_url: $url){
        id
        name
        pid
      }
    }`,
  variables: {url}
})

const categories = computed(() =>
  (data.value?.categories || []).map(i => ({
    ...i,
    id: i.id + '',
    pid: i.pid + ''
  }))
)
</script>

