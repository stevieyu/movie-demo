import {H} from 'https://s.stevie.top/esm.sh/highlight.run@7.5.3?bundle';

// https://app.highlight.io/14116/sessions
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
