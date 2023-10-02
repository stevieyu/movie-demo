<template>
  <div style="display: flex;flex-direction: column;max-height: 100%;">
    <video ref="videoPlayerEl" class="video-js vjs-big-play-centered vjs-fluid" />
    <pre style="white-space: break-spaces;">{{peer}}</pre>
    <div class="vjs-playlist" ref="playlistEl" style="overflow: auto;flex: auto;"></div>
  </div>
</template>
<script setup>
import {onMounted, onBeforeUnmount, ref, reactive} from 'vue'

const props = defineProps({
  playlist: {
    type: Array,
    required: true
  }
})

const videoPlayerEl = ref(null)
const playlistEl = ref(null)

const {videojs, P2PEngineHls} = window

// https://videojs.com/guides/options/
const videoPlayerDefaultOptions = {
  autoplay: false,
  controls: true,
  preload: 'auto',
  playbackRates: [0.5, 1, 1.5, 2, 3, 4, 5],
  language: 'zh-Hans',
  languages: {
    'zh-Hans': {
      "Now Playing": "正在播放",
      "Up Next": "播放下一个",
      "Untitled Video": "无标题视频"
    }
  },
  html5: {
    //https://github.com/videojs/http-streaming#list
    vhs: {
      overrideNative: true,
      cacheEncryptionKeys: true,
      useBandwidthFromLocalStorage: true,
    },
    nativeAudioTracks: false,
    nativeVideoTracks: false
  }
}

// function dataUrlToObjectUrl(dataUrl) {
//   if(!/^data:/.test(dataUrl)) return dataUrl
//   const byteString = atob(dataUrl.replace(/^.*?,/, ''));
//   const uint8Array = (new Uint8Array(new ArrayBuffer(byteString.length)))
//     .map((i, idx) => byteString.charCodeAt(idx));
//
//   return URL.createObjectURL(
//     new Blob([uint8Array],
//       { type: dataUrl.replace(/^data:(.*?)[;,].*$/, '$1') })
//   );
// }

const peer = reactive({})

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

  const engine = new P2PEngineHls({
    // logLevel: true,
    live: false,
    // token: 'Ta-XNIdZg',
    // sharePlaylist: true,
    trackerZone: 'hk',
    swFile: '/worker-swarmcloud.js',
    getStats(totalP2PDownloaded, totalP2PUploaded, totalHTTPDownloaded) {
      const total = totalHTTPDownloaded + totalP2PDownloaded;
      peer.stats = `p2p ratio: ${Math.round(totalP2PDownloaded/total*100)}%, saved traffic: ${totalP2PDownloaded}KB, uploaded: ${totalP2PUploaded}KB`
    },
    getPeerId (id) {
      peer.id = id
    },
    getPeersInfo (info) {
      peer.info = info
    }
  })
  engine.registerServiceWorker().finally(() => {
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
    // https://github.com/prateekrastogi/videojs-landscape-fullscreen
    // 在移动端根据视频比例选择全屏机制: https://blog.csdn.net/qq_43614372/article/details/129367231
    player.landscapeFullscreen({
      fullscreen: {
        enterOnRotate: true, // 横向旋转设备时进入全屏模式
        exitOnRotate: true, // 纵向旋转设备时退出全屏模式
        alwaysInLandscapeMode: true, // 始终以横向模式进入全屏模式，即使设备处于纵向模式
        iOS: true //是否在iOS上使用假全屏（显示播放器控件而不是系统控件需要）
      }
    });
  })

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
.video-js *:focus-visible{
  outline: none;
}
.vjs-menu li.vjs-menu-item:focus{
  background-color: transparent !important;
}
</style>
