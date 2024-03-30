<template>
  <div class="flex flex-wrap max-h-full">
    <div class="sm:w-full md:w-auto flex-auto" ref="videoPlayerEl">
    </div>
    <div class="sm:w-full md:w-xs lg:w-md flex flex-column max-h-full">
      <div class="vjs-playlist overflow-auto flex-auto max-h-full" ref="playlistEl"></div>
      <pre>{{peer}}</pre>
    </div>
  </div>
</template>
<script setup>
import { onMounted, onBeforeUnmount, ref, reactive } from "vue";

const props = defineProps({
	playlist: {
		type: Array,
		required: true,
	},
});

const videoPlayerEl = ref(null);
const playlistEl = ref(null);

// https://videojs.com/guides/options/
const videoPlayerDefaultOptions = {
	debug: false,
	autoplay: false,
	controls: true,
	preload: "auto",
	playbackRates: [0.5, 1, 1.5, 2, 3, 4, 5],
	language: "zh-Hans",
	languages: {
		"zh-Hans": {
			"Now Playing": "正在播放",
			"Up Next": "播放下一个",
			"Untitled Video": "无标题视频",
		},
	},
	html5: {
		//https://github.com/videojs/http-streaming#list
		vhs: {
			overrideNative: true,
			cacheEncryptionKeys: true,
			useBandwidthFromLocalStorage: true,
		},
		nativeAudioTracks: false,
		nativeVideoTracks: false,
	},
};

const peer = reactive({});

const { videojs, P2PEngineHls } = window;

//https://swarmcloud.net/cn/views/hls-de/API.html#p2penginehls-api
const engine = new P2PEngineHls({
	// logLevel: true,
	live: false,
	// token: 'Ta-XNIdZg',
	// sharePlaylist: true,
	trackerZone: "hk",
	swFile: "/worker-swarmcloud.js",
	getStats(totalP2PDownloaded, totalP2PUploaded, totalHTTPDownloaded) {
		const total = totalHTTPDownloaded + totalP2PDownloaded;
		peer.stats = {
			download_ratio: Math.round((totalP2PDownloaded / total) * 100) + "%",
			downloaded: totalP2PDownloaded + "KB",
			uploaded: totalP2PUploaded + "KB",
		};
	},
	getPeerId(id) {
		peer.id = id;
	},
	getPeersInfo(info) {
		peer.info = info;
	},
});

let player;
onMounted(() => {
	videoPlayerEl.value.innerHTML = `<video-js class="video-js vjs-big-play-centered vjs-fluid" />`;

	// https://www.cdnbye.com/oms/#/user/liveDataGlobal
	player = videojs(
		videoPlayerEl.value.querySelector(`video-js`),
		{
			...videoPlayerDefaultOptions,
		},
		() => {
			//   player.log('onPlayerReady');
		},
	);

	const historyItem = (player, playlist) => {
		const idx = +(
			location.hash.replace("#", "") || localStorage.getItem(location.pathname)
		);
		if (idx) {
			player.playlist.currentItem(idx);
		}
		player.on("ended", () => {
			player.playlist.next();
		});
		const originTitle = document.title;
		player.on("loadedmetadata", () => {
			const idx = player.playlist.currentIndex();
			const item = playlist[idx];
			document.title = originTitle + " " + item.name;
			history.replaceState({}, "", `#${idx}`);
			// console.dir(player.playlist);
		});
		player.on("dispose", () => {
			document.title = originTitle;
		});
	};

	const playlist = [
		// {
		//     name: '第一集',
		//     sources: [{
		//         src: 'https://s5.bfzycdn.com/video/lanman/第77集/index.m3u8',
		//         type: 'application/x-mpegURL'
		//     }],
		// }
		...props.playlist,
	].filter(
		(i) => Array.isArray(i.sources) && i.sources.filter((i) => i.src).length,
	);

	engine
		.registerServiceWorker()
		.catch((e) => {
			console.log("P2PEngineHls error:", e);
		})
		.finally(() => {
			player.playlist(playlist);
			historyItem(player, playlist);
			player.playlistUi({
				el: playlistEl.value,
				playOnSelect: true,
			});
			// https://github.com/prateekrastogi/videojs-landscape-fullscreen
			// 在移动端根据视频比例选择全屏机制: https://blog.csdn.net/qq_43614372/article/details/129367231
			player.landscapeFullscreen({
				fullscreen: {
					enterOnRotate: true, // 横向旋转设备时进入全屏模式
					exitOnRotate: true, // 纵向旋转设备时退出全屏模式
					alwaysInLandscapeMode: true, // 始终以横向模式进入全屏模式，即使设备处于纵向模式
					iOS: true, //是否在iOS上使用假全屏（显示播放器控件而不是系统控件需要）
				},
			});
		});
});
onBeforeUnmount(() => {
	player && player.dispose();
});
</script>
<style>
.vjs-playlist-item-list{
  display: flex;
  flex-wrap: wrap;

  .vjs-playlist-item {
    margin: .4em;
    display: block;
    border: 1px solid #aaa;
    border-radius: .4em;
    padding: .4em .8em;

    .vjs-playlist-thumbnail{
      display: flex;
      justify-content: space-between;

      .vjs-playlist-now-playing-text {
        display: none;
      }

      .vjs-up-next-text{
        display: none;
      }

      .vjs-playlist-name{
        font-style: normal;
      }

    }

    &.vjs-selected {
      opacity: .4;
    }
    &.vjs-up-next{
      border-color: #999;
      opacity: .8;
    }

  }

  .vjs-playlist-ad-overlay{
    display: none;
  }
}

.video-js{
  .vjs-menu li.vjs-menu-item:focus{
    background-color: transparent !important;
  }
  *:focus-visible{
    outline: none;
  }
}
</style>
