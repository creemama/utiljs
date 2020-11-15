"use strict";

module.exports = {
  dependencies: {
    cron: () => require("cron"),
  },
  function: wrap,
  name: "schedule",
};

function wrap(thiz) {
  return function schedule(
    cronTime,
    onTick,
    onComplete,
    start,
    timezone,
    context,
    runOnInit,
    unrefTimeout
  ) {
    return new thiz["cron"].CronJob(
      cronTime,
      onTick,
      onComplete,
      start,
      timezone,
      context,
      runOnInit,
      unrefTimeout
    );
  };
}
