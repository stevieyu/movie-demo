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

const {videojs} = window

// https://videojs.com/guides/options/
const videoPlayerDefaultOptions = {
  autoplay: false,
  controls: true,
  playbackRates: [0.5, 1, 1.5, 2, 3, 4, 5],
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
  ].filter(i => Array.isArray(i.sources) && i.sources.filter(i => i.src).length));

  player.playlistUi({
    el: playlistEl.value
  });
})
onBeforeUnmount(() => {
  player && player.dispose()
})
</script>
<style>
.vjs-playlist-item {
  margin: 1.5em 1em;
  display: block;
}
.vjs-playlist-thumbnail{
  display: flex;
  justify-content: space-between;
}

.vjs-playlist-title-container {
  display: flex;
  justify-content: space-between;
  flex: auto;
}
.vjs-up-next-text{
  flex-grow: 1;
  opacity: 0;
}
.vjs-playlist-now-playing-text {
  display: none;
}

.vjs-selected {
  opacity: .8;
  display: inherit;
}
.vjs-up-next .vjs-up-next-text{
  opacity: 1;
}
.vjs-selected .vjs-playlist-now-playing-text {
  display: block;
}
.video-js .vjs-title-bar {
  background: rgba(0, 0, 0, 0.5);
  color: white;
  display: none;
  font-size: 2em;
  padding: .5em;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
}

.video-js.vjs-paused.vjs-has-started .vjs-title-bar,
.video-js.vjs-user-active.vjs-has-started .vjs-title-bar{
  display: block;
}
</style>
