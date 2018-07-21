"use strict";

if (process.argv.length < 3) {
  for (let i = 0; i < 10; i++) runExample(i);
} else {
  runExample(parseInt(process.argv[2]));
}

function runExample(i) {
  switch (i) {
    case 0:
      runExample0();
      break;
    case 1:
      runExample1();
      break;
    case 2:
      runExample2();
      break;
    case 3:
      runExample3();
      break;
    case 4:
      runExample4();
      break;
    case 5:
      runExample5();
      break;
    case 6:
      runExample6();
      break;
    case 7:
      runExample7();
      break;
    case 8:
      runExample8();
      break;
    case 9:
      runExample9();
      break;
  }
}

function runExample0() {
  const promises = require("..");
  const promise1 = Promise.resolve(3);
  const promise2 = 42;
  const promise3 = new Promise((resolve, reject) => {
    setTimeout(resolve, 100, "foo");
  });
  promises.all(promise1, promise2, promise3).then(values => {
    console.log(values);
  });
  // expected output: Array [3, 42, "foo"]
}

function runExample1() {
  // Wrap a function that only accepts a callback.
  const promises = require("..");
  const stream = require("stream");
  const streams = require("../../utiljs-streams");
  // stream#finished only takes a callback.
  // Wrap stream#finished so that it handles both callbacks and Promises.
  function finished() {
    return promises.applyCallback(stream, stream.finished, arguments);
  }
  const readableToCallback = streams.fromString("Call back, Hypnotoad!");
  finished(readableToCallback, () => console.log("Finished with a callback"));
  const readableToPromise = streams.fromString("Promise me, Hypnotoad!");
  finished(readableToPromise).then(() => console.log("Finished as promised"));
}

function runExample2() {
  // Write a function that supports both callbacks and Promises.
  const promises = require("..");
  function notify(message, who, callback) {
    if (!callback) return promises.applyCallback(null, notify, arguments);
    callback(null, `${message}, ${who}!`);
  }
  notify("Call back", "Hypnotoad", (error, message) => console.log(message));
  notify("Promise me", "Hypnotoad").then(console.log);
}

function runExample3() {
  // Wrap a function that only returns a Promise.
  const promises = require("..");
  function notifyPromise(message, who) {
    return promises.resolve(`${message}, ${who}!`);
  }
  // #notifyPromise only returns a Promise.
  // Wrap #notifyPromise so that it handles both callbacks and Promises.
  function notify(message, who, callback) {
    return promises.applyPromise(null, notifyPromise, arguments);
  }
  notify("Call back", "Hypnotoad", (error, message) => console.log(message));
  notify("Promise me", "Hypnotoad").then(console.log);
}

function runExample4() {
  // Write a function that supports both callbacks and Promises.
  const promises = require("..");
  function notify(message, who, callback) {
    if (callback) return promises.applyPromise(null, notify, arguments);
    return promises.resolve(`${message}, ${who}!`);
  }
  notify("Call back", "Hypnotoad", (error, message) => console.log(message));
  notify("Promise me", "Hypnotoad").then(console.log);
}

function runExample5() {
  const promises = require("..");
  function notifyPromise(message, who) {
    return promises.resolve(`${message}, ${who}!`);
  }
  // #notifyPromise only returns a Promise.
  // Wrap #notifyPromise so that it accepts a callback.
  const notify = promises.callbackify(notifyPromise);
  notify("Call back", "Hypnotoad", (error, message) => console.log(message));
}

function runExample6() {
  const promises = require("..");
  function notifyCallback(message, who, callback) {
    callback(null, `${message}, ${who}!`);
  }
  // #notifyCallback only accpets a callback.
  // Force #notifyCallback to return a Promise.
  promises
    .callCallback(null, notifyCallback, "Promise me", "Hypnotoad")
    .then(console.log);
}

function runExample7() {
  const promises = require("..");
  function notifyPromise(message, who) {
    return promises.resolve(`${message}, ${who}!`);
  }
  // #notifyPromise only returns a Promise.
  // Force #notifyPromise to accept a callback.
  promises.callPromise(
    null,
    notifyPromise,
    "Call back",
    "Hypnotoad",
    (error, message) => console.log(message)
  );
}

function runExample8() {
  const promises = require("..");
  const stream = require("stream");
  const streams = require("../../utiljs-streams");
  // stream#finished only takes a callback.
  // Let us wrap stream#finished so that it returns a Promise.
  const readable = streams.fromString("Promise me, Hypnotoad!");
  const finished = promises.promisify(stream.finished);
  finished(readable).then(() => console.log("Finished as promised"));
}

function runExample9() {
  const promises = require("..");
  const promise1 = new Promise((resolve, reject) => {
    setTimeout(resolve, 500, "one");
  });
  const promise2 = new Promise((resolve, reject) => {
    setTimeout(resolve, 100, "two");
  });
  promises.race(promise1, promise2).then(value => {
    console.log(value);
    // Both resolve, but promise2 is faster
  });
  // expected output: "two"
}
