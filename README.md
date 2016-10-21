# userscript-meta

[![Build Status](https://travis-ci.org/pd4d10/userscript-meta.svg?branch=master)](https://travis-ci.org/pd4d10/userscript-meta)
[![codecov](https://codecov.io/gh/pd4d10/userscript-meta/branch/master/graph/badge.svg)](https://codecov.io/gh/pd4d10/userscript-meta)
[![npm](https://img.shields.io/npm/v/userscript-meta.svg)](https://www.npmjs.com/package/userscript-meta)
[![license](https://img.shields.io/npm/l/userscript-meta.svg)](https://www.npmjs.com/package/userscript-meta)

Parse and stringify Userscript metadata.

## Installation

```sh
npm install userscript-meta --save
```

## API

### parse(string)

parse userscript metadata to an object.

```js
const userscript = require('userscript-meta')

userscript.parse(`
  // ==UserScript==
  // @name Userscript name
  // @version 1.0
  // @match http://www.example.com/*
  // @match http://www.example.org/*
  // ==/UserScript==
`)
```

equals to

```js
{
  name: 'Userscript name',
  version: '1.0',
  // Field which has multiple value will parsed to an array
  match: [
    'http://www.exmaple.com/*',
    'http://www.exmaple.org/*',
  ]
}
```

### stringify(object)

```js
const userscript = require('userscript-meta')

userscript.stringify({
  name: 'Userscript name',
  version: '1.0',
  match: [
    'http://www.exmaple.com/*',
    'http://www.exmaple.org/*',
  ]
})
```

equals to

```js
// ==UserScript==
// @name Userscript name
// @version 1.0
// @match http://www.example.com/*
// @match http://www.example.org/*
// ==/UserScript==
```

## license

MIT
