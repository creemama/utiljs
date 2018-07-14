"use strict";

class Arrays {
  contains(array, object) {
    return array.indexOf(object) > -1;
  }

  from() {
    return Array.from(...arguments);
  }

  isArray() {
    return Array.isArray(...arguments);
  }

  of() {
    return Array.of(...arguments);
  }

  shallowCopy(array) {
    return array.slice(0);
  }

  shuffle(array) {
    return knuthshuffle().knuthShuffle(this.shallowCopy(array));
  }
}

module.exports = Arrays;

const dependencies = {};

function knuthshuffle() {
  return (
    dependencies["knuth-shuffle"] ||
    (dependencies["knuth-shuffle"] = require("knuth-shuffle"))
  );
}
