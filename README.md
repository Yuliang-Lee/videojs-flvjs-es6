# videojs-flvjs-es6

Refactor [videojs-flvjs](https://github.com/mister-ben/videojs-flvjs) for compatitable with ES6 module.

## Installation

```sh
npm install --save video.js flv.js videojs-flvjs-es6
```

## Usage

You need to include [video.js](https://github.com/videojs/video.js) first.

`videojs-flvjs-es6` internally depends on `flvjs`, so there is no need to explicitly introduce flvjs.

```html
<video id="#video-js-node"></video>
```

```js
import videojs from 'video.js'
import 'videojs-flvjs-es6'

videojs('video-js-node', {
  flvjs: {
    mediaDataSource: {
      isLive: true,
      cors: false,
      withCredentials: false,
    },
  },
  controls: 'control',
  preload: 'auto',
  height: '505',
})
```

## Thanks to

[videojs]: http://videojs.com/
[videojs-flvjs]: https://github.com/mister-ben/videojs-flvjs

## License

Apache-2.0. Copyright (c) xlaoyu
