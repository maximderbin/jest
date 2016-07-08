/**
 * Copyright (c) 2014, Facebook, Inc. All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @flow
 */

'use strict';

import type {MatchersObject, ExpectationResult} from '../types';

const diff = require('jest-diff');
const stringify = require('./utils').stringify;

const matchers: MatchersObject = {
  toBe(actual: any, expected: number): ExpectationResult {
    const pass = actual === expected;

    if (pass) {
      return {
        pass,
        message() {
          return `expected '${stringify(actual)}' to not equal (using '!==')` +
            ` '${stringify(expected)}'`;
        },
      };
    } else {
      return {
        pass,
        message() {
          let diffString = '\n\n';
          diffString += diff(expected, actual);
          return `expected '${stringify(actual)}' to equal (using '===')` +
          ` '${stringify(expected)}'${diffString}`;
        },
      };
    }
  },

  toBeTruthy(actual: any, expected: void) {
    ensureNoExpected(expected, 'toBeTruthy');
    const pass = !!actual;
    const message = pass
      ? () => `expected '${stringify(actual)}' not to be truthy`
      : () => `expected '${stringify(actual)}' to be truthy`;

    return {message, pass};
  },

  toBeFalsy(actual: any, expected: void) {
    ensureNoExpected(expected, 'toBeFalsy');
    const pass = !actual;
    const message = pass
      ? () => `expected '${stringify(actual)}' not to be falsy`
      : () => `expected '${stringify(actual)}' to be falsy`;

    return {message, pass};
  },

  toBeNull(actual: any, expected: void) {
    ensureNoExpected(expected);
    const pass = actual === null;
    const message = pass
      ? () => `expected '${stringify(actual)}' not to be null`
      : () => `expected '${stringify(actual)}' to be null`;

    return {message, pass};
  },

  toBeDefined(actual: any, expected: void) {
    ensureNoExpected(expected);
    const pass = actual !== void 0;
    const message = pass
      ? () => `expected '${stringify(actual)}' not to be defined`
      : () => `expected '${stringify(actual)}' to be defined`;

    return {message, pass};
  },

  toBeUndefined(actual: any, expected: void) {
    ensureNoExpected(expected);
    const pass = actual === void 0;
    const message = pass
      ? () => `expected '${stringify(actual)}' not to be undefined`
      : () => `expected '${stringify(actual)}' to be undefined`;

    return {message, pass};
  },
};

function ensureNoExpected(expected, matcherName) {
  matcherName || (matcherName = 'This');
  if (typeof expected !== 'undefined') {
    throw new Error(`${matcherName} matcher does not accept any arguments`);
  }
}

module.exports = matchers;
