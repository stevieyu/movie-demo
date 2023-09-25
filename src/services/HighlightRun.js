// import {H} from 'https://s.stevie.top/esm.sh/highlight.run@7.5.3?bundle';
import 'https://cdn.jsdelivr.net/npm/highlight.run@7.5.3/dist/index.umd.min.js'
const {H} = window

/*
https://app.highlight.io/14116/sessions
每月 500 次会话
每月 1,000 次错误
每月 1,000,000 条日志
无限 seats
 */
H.init('7e3vp5qg', {
  environment: 'production',
  version: 'commit:abcdefg12345',
  networkRecording: {
    enabled: true,
    recordHeadersAndBody: true,
    urlBlocklist: [
      // insert full or partial urls that you don't want to record here
      // Out of the box, Highlight will not record these URLs (they can be safely removed):
      // "https://www.googleapis.com/identitytoolkit",
      // "https://securetoken.googleapis.com",
      "https://s.stevie.top"
    ],
  },
});
