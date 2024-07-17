function generateRegexpFromStrings(array) {
    if(!array.length) {
      return null;
    }
    let baseString = array[0];

    for (const element of array) {
      for (let j = 0; j < baseString.length; j++) {
        if (baseString[j] !== '*' && baseString[j] !== element[j]) {
          baseString = baseString.substring(0, j) + '*' + baseString.substring(j+1);
        }
      }
    }

    return baseString.replace(/\*+/g, function (match) {
      const len = match.length;
      return '\\w' + (len > 1 ? '{' + len + '}' : '');
    });
  }
  function filterNoSortItemsToRegexp(content = '') {
    if (!content || typeof content !== 'string') {
      return null;
    }
    let prev = 0;
    let isSort = false
    const dirs_count = {};

    const ads = (content.match(/.*?\w+\.ts/g) || []).filter((i, idx) => {
      const current = +i.replace(/.*?(\d+)\.ts/, '$1');
      const isNotSort = (current - prev) != 1;

      const dir = i.replace(/(.*?)\w+\.ts/, '$1')
      if (dir) {
        dirs_count[dir] = (dirs_count[dir] || 0) + 1;
      }
     
      // console.log(isSort, current, prev, i);
    
      if(!idx || isNotSort){
        prev = current;
      }
      if(idx == 1 && isNotSort){
        isSort = false;
      }
      if (!isSort) {
        return false;
      }
      return idx > 0 && isNotSort;
    })
    // console.log(paths, list);
    if (ads.length > 0) {
      let regex = new RegExp('.*?\\s(' + ads.map(escapeRegExp).join('|') + ')\\s', 'g');
      content = content.replace(regex, '');
    } else if (Object.keys(dirs_count).length >= 2) {
      let sorted_dirs = Object.keys(dirs_count).sort((a, b) => dirs_count[a] - dirs_count[b]);
      let remove_dir = sorted_dirs[0];
      remove_dir = remove_dir.replace(/\//g, '\\/').replace(/\./g, '\\.');
      content = content.replace(new RegExp('#EXTINF.*?\\s' + remove_dir + '.*?\\s', 'g'), '');
    }
    content = content.replace(/(#EXT-X-DIS.*?\s){2,}/g, '$1');

    return content;
  }
  function process(playlist, url) {
    url = new URL(url)
    url.dir = url.pathname.replace(/[^/]+$/, '')
    if(playlist.includes('.ts')) {
      playlist = playlist
        .replace(eval(`/(\s)${url.dir.replace(/([./])/g, `\\$1`)}/g`), '$1') //统一内容路径, 绝对转相对
        .replace(/.*?\s\/.*?\s/g, '') //移除绝对路径
        .replace(/(#EXT-X-DIS.*?\s#EXT-X-KEY.*?\s){2,}/, '') //带key的无分片块
     

      // playlist = playlist.replaceAll(url.href.replace(/[^/]+$/, ''), '') // 带域名的相同地址
      //   .replaceAll(url.dir, '') //相同地址
      //   .replace(/.*?\s\/.*?\s/g, '') //绝对路径

      const regexp = filterNoSortItemsToRegexp(playlist)
    
      if(regexp) {
        playlist = playlist.replace(regexp, '')
      }
      playlist = playlist.replace(/#EXT-X-K.*?\s(.*\s)*?.*?Y\s/g, '') // 无内容标签
        .replace(/(#EXT-X-D.*?\s)+/g, '$1') // 连续

      // console.log('playlist', playlist, playlist.includes('394ee7b4c560604355'))
    }
    return playlist;
  }
  window.playlistAdFilter = process
  export default process