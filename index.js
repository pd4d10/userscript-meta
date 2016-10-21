'use strict'

function isUndefined(val) {
  return typeof val === 'undefined'
}

function isObject(val) {
  return typeof val === 'object' && val !== null
}

// Parse metadata to an object
function parse(meta) {
  if (typeof meta !== 'string') {
    throw new Error('`Parse`\'s first argument should be a string')
  }

  return meta.split(/[\r\n]/)
    .filter(function (line) { // remove blank line
      return /\S+/.test(line) &&
        line.indexOf('==UserScript==') === -1 &&
        line.indexOf('==/UserScript==') === -1
    })
    .reduce(function (obj, line) {
      var arr = line.trim().replace(/^\/\//, '').trim().split(/\s+/)
      var key = arr[0].slice(1)
      var value = arr.slice(1).join(' ')

      if (isUndefined(obj[key])) {
        obj[key] = value
      } else if (Array.isArray(obj[key])) {
        obj[key].push(value)
      } else {
        obj[key] = [obj[key], value]
      }

      return obj
    }, {})
}

function getLine(key, value) {
  // For field which has multiple values, like `match`
  if (Array.isArray(value)) {
    return value.map(function (value) {
      return getLine(key, value)
    }).join('')
  }

  return '// @' + key + ' ' + value + '\n'
}

// Stringify metadata from an object
function stringify(obj) {
  if (!isObject(obj)) {
    throw new Error('`Stringify`\'s first argument should be an object')
  }

  var meta = Object.keys(obj)
    .map(function (key) {
      return getLine(key, obj[key])
    }).join('')

  return '// ==UserScript==\n' + meta + '// ==/UserScript==\n'
}

exports.parse = parse
exports.stringify = stringify
