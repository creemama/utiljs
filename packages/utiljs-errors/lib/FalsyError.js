"use strict";

module.exports = class FalsyError extends TypeError {
  static check(argumentValue, argumentName, functionName) {
    if (argumentValue) return;
    throw new FalsyError(argumentValue, argumentName, functionName);
  }

  constructor(argumentValue, argumentName, functionName) {
    super(
      argumentValue
        ? "Why are you creating a FalsyError with a truthy `argumentValue`: '" +
            argumentValue +
            "'?"
        : (functionName || "We") +
            " expected " +
            (argumentName ? "`" + argumentName + "`" : "an argument") +
            " to be truthy. " +
            (argumentName ? "`" + argumentName + "`" : "It") +
            " is the falsy value " +
            (argumentValue === "" ? "''" : argumentValue) +
            "."
    );
    this.name = this.constructor.name;
    this.argumentName = argumentName;
  }
};
