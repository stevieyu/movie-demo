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
const items = ref([
'1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30'
])
</script>