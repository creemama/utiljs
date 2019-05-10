"use strict";

module.exports = class MissingError extends TypeError {
  static check(argumentValue, argumentName, functionName) {
    if (argumentValue != null) return;
    throw new MissingError(argumentValue, argumentName, functionName);
  }

  constructor(argumentValue, argumentName, functionName) {
    super(
      argumentValue != null
        ? "Why are you creating a MissingError with a defined `argumentValue`: '" +
            argumentValue +
            "'?"
        : (functionName || "We") +
            " expected " +
            (argumentName ? "`" + argumentName + "`" : "an argument") +
            " to be defined. " +
            (argumentName ? "`" + argumentName + "`" : "It") +
            " is '" +
            argumentValue +
            "'."
    );
    this.name = this.constructor.name;
    this.argumentName = argumentName;
  }
};
