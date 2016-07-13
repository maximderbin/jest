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

import type {MatchersObject} from '../types';
import {ensureNoExpected} from './utils';

const matchers: MatchersObject = {
  toHaveBeenCalled(actual, expected) {
    ensureNoExpected(expected);
    ensureSpy(actual);

    if (isNot ^ !actual.calls.count()) {
      const message = isNot ?
        `expected a spy to not be called, but it was called ${actual.calls.count()} times` :
        `expected a spy to be called but it wasn't`;
      throw new Error(message);
    }
  },
};

const ensureSpy = (spy) => {
  if (!spy || !spy.thisIsASpy) {
    throw new Error('This matcher can only execute on a Spy function');
  }
};
