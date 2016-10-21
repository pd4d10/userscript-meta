'use strict'

var assert = require('assert')
var hostsUtil = require('./')

var parse = hostsUtil.parse
var stringify = hostsUtil.stringify

var json = {
  name: 'test',
  version: '0.1',
}

var jsonMulti = {
  name: 'test',
  match: [
    'http://www.example.com/*',
    'http://www.example.org/*',
    'http://www.example.net/*'
  ],
}

var str = [
  '// ==UserScript==\n',
  '// @name test\n',
  '// @version 0.1\n',
  '// ==/UserScript==\n'
].join('')

var strMulti = [
  '// ==UserScript==\n',
  '// @name test\n',
  '// @match http://www.example.com/*\n',
  '// @match http://www.example.org/*\n',
  '// @match http://www.example.net/*\n',
  '// ==/UserScript==\n'
].join('')

describe('parse', function () {
  it('should throw error when first argument is not a string', function () {
    assert.throws(
      function () {
        parse([])
      },
      /`Parse`\'s first argument should be a string/
    )
  })

  it('should work correctly', function () {
    assert.deepEqual(parse(str), json)
  })

  it('should handle blank line', function () {
    assert.deepEqual(
      parse([
        '// ==UserScript==\n\n',
        '// @name test\n\n',
        '// @version 0.1\n\n',
        '// ==/UserScript==\n\n'
      ].join('')),
      json
    )
  })

  it('should handle multi space', function () {
    assert.deepEqual(
      parse([
        '  //  ==UserScript==  \n',
        '  //  @name     test  \n',
        '  //  @version  0.1  \n',
        '  //  ==/UserScript==  \n'
      ].join('')),
      json
    )
  })

  it('should handle space in field', function () {
    assert.deepEqual(
      parse([
        '// ==UserScript==\n',
        '// @name one two three\n',
        '// ==/UserScript==\n'
      ].join('')),
      {
        name: 'one two three'
      }
    )
  })

  it('should handle windows style line ending', function () {
    assert.deepEqual(
      parse([
        '// ==UserScript==\r\n',
        '// @name test\r\n',
        '// @version 0.1\r\n',
        '// ==/UserScript==\r\n'
      ].join('')),
      json
    )
  })

  it('should handle array', function () {
    assert.deepEqual(parse(strMulti), jsonMulti)
  })
})

describe('stringify', function () {
  it('should throw error when first argument is not an object', function () {
    assert.throws(
      function () {
        stringify('')
      },
      /`Stringify`\'s first argument should be an object/
    )
  })

  it('should work correctly', function () {
    assert.equal(stringify(json), str)
  })

  it('should handle array', function () {
    assert.equal(stringify(jsonMulti), strMulti)
  })
})
