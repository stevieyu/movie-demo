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
    const paths = {};
    const list = (content.match(/.*?\w+\.ts/g) || []).filter((i, idx) => {
      const current = +i.replace(/.*?(\d+)\.ts/, '$1');
      const isSort = (current - prev) === 1;
      const pathname = i.replace(/(.*?)\w+\.ts/, '$1')
      if (pathname) {
        paths[pathname] = (paths[pathname] || 0) + 1;
      }
     
      // console.log(isSort, current, prev, i);
    
      if(!idx || isSort){
        prev = current;
      }else if(prev > 0){
        return true
      }
      return prev && !isSort && idx;
    })
    // console.log(paths, list);
    if (!Object.keys(paths).length && !list.length) {
      return null;
    }
    if (list.length) {
      return eval(`/.*\\s${generateRegexpFromStrings(list)}\\s/g`);
    }

    if(Object.keys(paths).length < 2) return null
    // 统计路径, 获取数量最少的路径
    const path = Object.keys(paths)
      .reduce((prev, current) => paths[prev] < paths[current] ? prev : current)
      .replace(/\//g, '\\/')

    return eval(`/.*\\s${path}\\w+\\.ts\\s/g`);
  }
  function process(playlist, url) {
    url = new URL(url)
    if(playlist.includes('.ts')) {
      playlist = playlist.replaceAll(url.href.replace(/[^/]+$/, ''), '') // 带域名的相同地址
        .replaceAll(url.pathname.replace(/[^/]+$/, ''), '') //相同地址
        .replace(/.*?\s\/.*?\s/g, '') //绝对路径

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