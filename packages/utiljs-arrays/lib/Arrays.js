"use strict";

module.exports = function Arrays() {
  this.contains = contains;
  function contains(array, object) {
    return array.indexOf(object) > -1;
  }

  this.from = Array.from;

  this.isArray = Array.isArray;

  this.of = Array.of;

  this.shallowCopy = shallowCopy;
  function shallowCopy(array) {
    return array.slice(0);
  }

  this.shuffle = shuffle;
  function shuffle(array) {
    return knuthshuffle().knuthShuffle(shallowCopy(array));
  }

  const o = {};

  function knuthshuffle() {
    if (!o["knuth-shuffle"]) o["knuth-shuffle"] = require("knuth-shuffle");
    return o["knuth-shuffle"];
  }
};
