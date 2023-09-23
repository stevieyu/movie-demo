<template>
<div style="display: flex;flex-direction: column;max-height: 100%;">
    <video ref="videoPlayerEl" class="video-js vjs-big-play-centered vjs-fluid"></video>
    <div class="vjs-playlist" ref="playlistEl" style="overflow: auto;flex: auto;"></div>
</div>
</template>
<script setup>
import {onMounted, onBeforeUnmount, ref} from 'vue'

const props = defineProps({
    playlist: {
        type: Array,
        required: true
    }
})

const videoPlayerEl = ref(null)
const playlistEl = ref(null)

const videoPlayerDefaultOptions = {
    autoplay: false,
    controls: true,
    language: 'zh-Hans',
    languages: {
        'zh-Hans': {
            "Now Playing": "正在播放",
            "Up Next": "播放下一个",
            "Untitled Video": "无标题视频"
        }
    }
}
let player;

onMounted(() => {
    player = videojs(
        videoPlayerEl.value, 
        {
            ...videoPlayerDefaultOptions
        }, 
        () => {
        //   player.log('onPlayerReady');
        }
    );
    player.playlist([
        // {
        //     name: '第一集',
        //     sources: [{
        //         src: 'https://s5.bfzycdn.com/video/lanman/第77集/index.m3u8',
        //         type: 'application/x-mpegURL'
        //     }],
        // }
        ...props.playlist
    ]);

    player.playlistUi({
        el: playlistEl.value
    });

})
onBeforeUnmount(() => {
    player && player.dispose()
})
</script>
<style>
    .vjs-playlist-item{
        padding: 1.5em 1em;
    }
    .vjs-playlist-title-container{
        display: flex;
        justify-content: space-between;
    }
    .vjs-up-next-text,.vjs-playlist-now-playing-text{
        display: none;
    }
    .vjs-selected{
        opacity: .8;
        display: initial;
    }
    .vjs-up-next .vjs-up-next-text, .vjs-selected .vjs-playlist-now-playing-text{
        display: initial;
    }
</style>