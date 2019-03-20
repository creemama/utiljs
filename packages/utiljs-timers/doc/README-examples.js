"use strict";

if (process.argv.length < 3) {
  for (let i = 0; i < 1; i++) runExample(i);
} else {
  runExample(parseInt(process.argv[2]));
}

function runExample(i) {
  switch (i) {
    case 0:
      runExample0();
      break;
  }
}

function runExample0() {
  const timers = require("..");
  let lastTime = Date.now();
  function call(str) {
    console.log(str + ": " + (Date.now() - lastTime));
    lastTime = Date.now();
  }
  const throttledCall = timers.throttle(call, 2000);
  throttledCall("a"); // should output "a: ~1".
  throttledCall("b"); // should output "b: ~2000".
  throttledCall("c"); // should output "c: ~2000".
}
