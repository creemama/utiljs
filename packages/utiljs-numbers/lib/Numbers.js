"use strict";

class Numbers {
  abs() {
    return Math.abs(...arguments);
  }

  acos() {
    return Math.acos(...arguments);
  }

  acosh() {
    return Math.acosh(...arguments);
  }

  asin() {
    return Math.asin(...arguments);
  }

  asinh() {
    return Math.asinh(...arguments);
  }

  atan() {
    return Math.atan(...arguments);
  }

  atan2() {
    return Math.atan2(...arguments);
  }

  atanh() {
    return Math.atanh(...arguments);
  }

  cbrt() {
    return Math.cbrt(...arguments);
  }

  ceil() {
    return Math.ceil(...arguments);
  }

  clz32() {
    return Math.clz32(...arguments);
  }

  cos() {
    return Math.cos(...arguments);
  }

  cosh() {
    return Math.cosh(...arguments);
  }

  exp() {
    return Math.exp(...arguments);
  }

  expm1() {
    return Math.expm1(...arguments);
  }

  floor() {
    return Math.floor(...arguments);
  }

  fround() {
    return Math.fround(...arguments);
  }

  hypot() {
    return Math.hypot(...arguments);
  }

  imul() {
    return Math.imul(...arguments);
  }

  isFinite() {
    return Number.isFinite(...arguments);
  }

  // http://stackoverflow.com/questions/14636536/how-to-check-if-a-variable-is-an-integer-in-javascript
  isInt(value) {
    return (
      !this.isNaN(value) &&
      this.parseInt(Number(value)) == value &&
      !this.isNaN(this.parseInt(value, 10))
    );
  }

  isInteger() {
    return Number.isInteger(...arguments);
  }

  isNaN() {
    return Number.isNaN(...arguments);
  }

  isSafeInteger() {
    return Number.isSafeInteger(...arguments);
  }

  log() {
    return Math.log(...arguments);
  }

  log10() {
    return Math.log10(...arguments);
  }

  log1p() {
    return Math.log1p(...arguments);
  }

  log2() {
    return Math.log2(...arguments);
  }

  max() {
    return Math.max(...arguments);
  }

  min() {
    return Math.min(...arguments);
  }

  parseFloat() {
    return Number.parseFloat(...arguments);
  }

  parseInt() {
    return Number.parseInt(...arguments);
  }

  pow() {
    return Math.pow(...arguments);
  }

  random() {
    return Math.random(...arguments);
  }

  round() {
    return Math.round(...arguments);
  }

  sign() {
    return Math.sign(...arguments);
  }

  sin() {
    return Math.sin(...arguments);
  }

  sinh() {
    return Math.sinh(...arguments);
  }

  sqrt() {
    return Math.sqrt(...arguments);
  }

  tan() {
    return Math.tan(...arguments);
  }

  tanh() {
    return Math.tanh(...arguments);
  }

  trunc() {
    return Math.trunc(...arguments);
  }

  get E() {
    return Math.E;
  }

  get EPSILON() {
    return Number.EPSILON;
  }

  get LN10() {
    return Math.LN10;
  }

  get LN2() {
    return Math.LN2;
  }

  get LOG10E() {
    return Math.LOG10E;
  }

  get LOG2E() {
    return Math.LOG2E;
  }

  get MAX_SAFE_INTEGER() {
    return Number.MAX_SAFE_INTEGER;
  }

  get MAX_VALUE() {
    return Number.MAX_VALUE;
  }

  get MIN_SAFE_INTEGER() {
    return Number.MIN_SAFE_INTEGER;
  }

  get MIN_VALUE() {
    return Number.MIN_VALUE;
  }

  get NEGATIVE_INFINITY() {
    return Number.NEGATIVE_INFINITY;
  }

  get NaN() {
    return Number.NaN;
  }

  get PI() {
    return Math.PI;
  }

  get POSITIVE_INFINITY() {
    return Number.POSITIVE_INFINITY;
  }

  get SQRT1_2() {
    return Math.SQRT1_2;
  }

  get SQRT2() {
    return Math.SQRT2;
  }
}

module.exports = Numbers;
