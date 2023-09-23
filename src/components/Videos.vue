<template>
    <v-virtual-scroll
    style="max-height: 100%;"
    :items="result?.videos"
    >
    <template v-slot:default="{ item }">
        <v-card :title="item.name" :subtitle="item.remarks" :text="item.playFrom" class="ma-4" v-ripple>
            <v-card-actions class="justify-space-between">
                <v-btn>{{item.category.name}}</v-btn><v-btn>播放</v-btn>
            </v-card-actions>
        </v-card>
    </template>
    </v-virtual-scroll>
</template>
<script setup>
import {ref} from 'vue'
import { useQuery } from '@vue/apollo-composable'
import gql from 'graphql-tag'

const { result } = useQuery(gql`
{
  videos{
    id
    name
    remarks
    playFrom
    category{
      id
      name
    }
  }
}
`)
</script>