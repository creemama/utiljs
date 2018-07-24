"use strict";

const { expect } = require("chai"),
  timers = require("..");

describe("Timers#setImmediate(callback[, ...args])", () => {
  it("should notify a callback", done => {
    timers.setImmediate(value => {
      try {
        expect(value).to.eql("foobar");
        done();
      } catch (error) {
        done(error);
      }
    }, "foobar");
  });
});

describe("Timers#setImmediatePromise([...args])", () => {
  it("should resolve a Promise", async function() {
    const value = await timers.setImmediatePromise("foobar");
    expect(value).to.eql("foobar");
  });
});

describe("Timers#setInterval(callback, delay[, ...args]) and Timers#clearInterval(timeout)", () => {
  it("should notify a callback several times and clear the timeout", done => {
    let numCalls = 0;
    const timeout = timers.setInterval(
      value => {
        if (++numCalls == 3) {
          timers.clearInterval(timeout);
          timers.setTimeout(() => {
            try {
              expect(numCalls).to.eql(3);
              done();
            } catch (error) {
              done(error);
            }
          }, 75);
        }
        try {
          expect(value).to.eql("foobar");
        } catch (error) {
          timers.clearInterval(timeout);
          done(error);
        }
      },
      25,
      "foobar"
    );
  });
});

describe("Timers#setTimeout(callback, delay[, ...args])", () => {
  it("should notify a callback", done => {
    timers.setTimeout(
      value => {
        try {
          expect(value).to.eql("foobar");
          done();
        } catch (error) {
          done(error);
        }
      },
      25,
      "foobar"
    );
  });
});

describe("Timers#setTimeoutPromise(delay[, ...args])", () => {
  it("should notify a callback", async function() {
    const value = await timers.setTimeoutPromise(25, "foobar");
    expect(value).to.eql("foobar");
  });
});

describe("Timers#clearImmediate(immediate)", () => {
  it("should clear an immediate", done => {
    let numCalls = 0;
    const immediate = timers.setImmediate(() => {
      ++numCalls;
      done(
        new Error(
          "We did not expect execution to notify the immediate callback."
        )
      );
    });
    require("fs").readFile(__filename, "utf8", string => {
      try {
        expect(numCalls).to.eql(0);
        if (numCalls == 0) done();
      } catch (e) {
        if (numCalls == 0)
          // We should never get here.
          // done should have already been called.
          done(e);
      }
    });
    timers.clearImmediate(immediate);
  });
});

describe("Timers#clearTimeout(timeout)", () => {
  it("should clear a timeout", done => {
    let numCalls = 0;
    timers.setTimeout(() => {
      try {
        expect(numCalls).to.eql(0);
        if (numCalls == 0) done();
      } catch (e) {
        if (numCalls == 0)
          // We should never get here.
          // done should have already been called.
          done(e);
      }
    }, 30);
    const timeout = timers.setTimeout(
      value => {
        ++numCalls;
        done(
          new Error(
            "We did not expect execution to notify the timeout callback."
          )
        );
      },
      10,
      "foobar"
    );
    timers.clearTimeout(timeout);
  });
});
