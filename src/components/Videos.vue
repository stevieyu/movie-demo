<template>
    <v-virtual-scroll
    style="max-height: 100%;"
    :items="items"
    >
    <template v-slot:default="{ item }">
        <v-card :title="`Card title ${item}`" subtitle="Subtitle" text="..." style="margin: 1em;">
            <v-card-actions>
                <v-btn>播放</v-btn>
            </v-card-actions>
        </v-card>
    </template>
    </v-virtual-scroll>
</template>
<script setup>
import {ref, onMounted} from 'vue'
const items = ref((new Array(9999)).fill(1).map((i, idx) => i + idx))
</script>