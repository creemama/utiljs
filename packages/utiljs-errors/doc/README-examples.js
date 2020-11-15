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
  const errors = require("..");
  function rejectAPromise() {
    return Promise.reject(new TypeError("Fail!"));
  }

  errors
    .catch(rejectAPromise())
    .catch((error) =>
      console.log("\n\nWith Caller Stack Trace\n" + error.stack)
    );
  // With Caller Stack Trace
  // AsyncError: Fail!
  //     at promise.catch.error (/root/utiljs/packages/utiljs-errors/lib/Errors.js:28:13)
  //     at process._tickCallback (internal/process/next_tick.js:68:7)
  //     at Function.Module.runMain (internal/modules/cjs/loader.js:746:11)
  //     at startup (internal/bootstrap/node.js:240:19)
  //     at bootstrapNodeJSCore (internal/bootstrap/node.js:564:3)
  //     at runExample0 (/root/utiljs/packages/utiljs-errors/doc/README-examples.js:23:11)
  //     at runExample (/root/utiljs/packages/utiljs-errors/doc/README-examples.js:12:7)
  //     at Object.<anonymous> (/root/utiljs/packages/utiljs-errors/doc/README-examples.js:4:31)
  //     at Module._compile (internal/modules/cjs/loader.js:702:30)
  //     at Object.Module._extensions..js (internal/modules/cjs/loader.js:713:10)
  //     at Module.load (internal/modules/cjs/loader.js:612:32)
  //     at tryModuleLoad (internal/modules/cjs/loader.js:551:12)
  //     at Function.Module._load (internal/modules/cjs/loader.js:543:3)
  //     at Function.Module.runMain (internal/modules/cjs/loader.js:744:10)
  // TypeError: Fail!
  //     at rejectAPromise (/root/utiljs/packages/utiljs-errors/doc/README-examples.js:20:27)
  //     at runExample0 (/root/utiljs/packages/utiljs-errors/doc/README-examples.js:23:12)
  //     at runExample (/root/utiljs/packages/utiljs-errors/doc/README-examples.js:12:7)
  //     at Object.<anonymous> (/root/utiljs/packages/utiljs-errors/doc/README-examples.js:4:31)
  //     at Module._compile (internal/modules/cjs/loader.js:702:30)
  //     at Object.Module._extensions..js (internal/modules/cjs/loader.js:713:10)
  //     at Module.load (internal/modules/cjs/loader.js:612:32)
  //     at tryModuleLoad (internal/modules/cjs/loader.js:551:12)
  //     at Function.Module._load (internal/modules/cjs/loader.js:543:3)
  //     at Function.Module.runMain (internal/modules/cjs/loader.js:744:10)

  rejectAPromise().catch((error) =>
    console.log("\n\nWithout Caller Stack Trace\n" + error.stack)
  );
  // Without Caller Stack Trace
  // TypeError: Fail!
  //     at rejectAPromise (/root/utiljs/packages/utiljs-errors/doc/README-examples.js:20:27)
  //     at runExample0 (/root/utiljs/packages/utiljs-errors/doc/README-examples.js:53:3)
  //     at runExample (/root/utiljs/packages/utiljs-errors/doc/README-examples.js:12:7)
  //     at Object.<anonymous> (/root/utiljs/packages/utiljs-errors/doc/README-examples.js:4:31)
  //     at Module._compile (internal/modules/cjs/loader.js:702:30)
  //     at Object.Module._extensions..js (internal/modules/cjs/loader.js:713:10)
  //     at Module.load (internal/modules/cjs/loader.js:612:32)
  //     at tryModuleLoad (internal/modules/cjs/loader.js:551:12)
  //     at Function.Module._load (internal/modules/cjs/loader.js:543:3)
  //     at Function.Module.runMain (internal/modules/cjs/loader.js:744:10)
}
