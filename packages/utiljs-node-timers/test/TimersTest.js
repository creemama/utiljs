"use strict";

const { assert, expect } = require("chai");
const timers = require("..");

describe("Timers#setImmediate(callback[, ...args])", () => {
  it("should notify a callback", (done) => {
    timers.setImmediate((value) => {
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
  it("should resolve a Promise", async function () {
    const value = await timers.setImmediatePromise("foobar");
    expect(value).to.eql("foobar");
  });
});

describe("Timers#setInterval(callback, delay[, ...args]) and Timers#clearInterval(timeout)", () => {
  it("should notify a callback several times and clear the timeout", (done) => {
    let numCalls = 0;
    const timeout = timers.setInterval(
      (value) => {
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
  it("should notify a callback", (done) => {
    timers.setTimeout(
      (value) => {
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
  it("should notify a callback", async function () {
    const value = await timers.setTimeoutPromise(25, "foobar");
    expect(value).to.eql("foobar");
  });
});

describe("Timers#clearImmediate(immediate)", () => {
  it("should clear an immediate", (done) => {
    let numCalls = 0;
    const immediate = timers.setImmediate(() => {
      ++numCalls;
      done(
        new Error(
          "We did not expect execution to notify the immediate callback."
        )
      );
    });
    require("fs").readFile(__filename, "utf8", (string) => {
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
  it("should clear a timeout", (done) => {
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
      (value) => {
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

describe("Timers#schedule", () => {
  it("should schedule a job at a certain time", function (done) {
    this.timeout(5000);
    timers.schedule(new Date(Date.now() + 1000), done).start();
  });
  it("should schedule a regularly recurring job", function (done) {
    this.timeout(5000);
    let count = 0;
    timers
      .schedule("* * * * * *", function () {
        count++;
        if (count > 3) {
          this.stop();
          done();
        }
      })
      .start();
  });
});

describe("Times#throttle(func, limit)", () => {
  async function testThrottle(limitInSeconds, n) {
    const internalPromises = [];
    const expectedInternalResults = [];

    function func(number) {
      if (number <= n) {
        for (let i = 1; i <= n - number; i++) {
          const derivedNum = number * 10 + i;
          internalPromises.push(throttledFunction(derivedNum));
          expectedInternalResults.push("result " + derivedNum);
        }
      }
      if (number == 2) throw new Error("error " + 2);
      return "result " + number;
    }

    const throttledFunction = timers.throttle(func, limitInSeconds);

    const initialPromises = [];
    const expectedResult = [];
    let errorPromise;
    for (let i = 1; i <= n; i++) {
      if (i != 2) {
        initialPromises.push(throttledFunction(i));
        expectedResult.push("result " + i);
      } else {
        errorPromise = throttledFunction(i);
      }
    }

    let errorPassed = false;
    try {
      await errorPromise;
      errorPassed = true;
    } catch (e) {
      expect(e.message).to.eql("error 2");
    }
    if (errorPassed) assert.fail("We expected error 2.");

    const results = await Promise.all(initialPromises);
    expect(results).to.eql(expectedResult);

    const internalResults = await Promise.all(internalPromises);
    expect(internalResults).to.eql(expectedInternalResults);
  }

  it("should throttle a function", async function () {
    this.timeout(7000);
    await testThrottle(0, 10);
    await testThrottle(400, 4);
  });

  it("should correctly handle bad input", async function () {
    expect(() => timers.throttle(true, 5)).to.throw(TypeError);
    expect(() => timers.throttle(null, 5)).to.throw(TypeError);
    expect(() => timers.throttle(undefined, 5)).to.throw(TypeError);
    expect(() => timers.throttle(5, 5)).to.throw(TypeError);
    expect(() => timers.throttle("foo", 5)).to.throw(TypeError);
    expect(() => timers.throttle(Symbol("foo"), 5)).to.throw(TypeError);

    // The limitInMilliseconds is 1 in this case.
    expect(await timers.throttle(() => "foo", true)()).to.eql("foo");

    // The limitInMilliseconds is 0 in these cases.
    expect(await timers.throttle(() => "foo", null)()).to.eql("foo");
    expect(await timers.throttle(() => "foo")()).to.eql("foo");
    expect(await timers.throttle(() => "foo", "foo")()).to.eql("foo");

    expect(() => timers.throttle(() => "foo", Symbol("foo"))).to.throw(
      TypeError
    );
  });
});
