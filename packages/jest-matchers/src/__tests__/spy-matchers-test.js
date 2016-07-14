/**
 * Copyright (c) 2014-present, Facebook, Inc. All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @emails oncall+jsinfra
 */

'use strict';

const jestExpect = require('../').expect;
const {stringify} = require('jest-matcher-utils');

describe('.toHaveBeenCalled()', () => {
  it('does not accept arguments', () => {
    const foo = {
      setBar: jest.fn(),
    };

    expect(() => jestExpect(foo.setBar).toHaveBeenCalled(5))
      .toThrowError(/toHaveBeenCalled matcher does not accept any arguments/);
  });

  it('verifies that actual is a Spy', () => {
    const foo = {
      setBar: jest.fn(),
    };

    expect(() => jestExpect(foo.setBar).toHaveBeenCalled())
      .toThrowError(/toHaveBeenCalled matcher can only execute on a Spy function/);
  });

  it('pass if function called', () => {
    const foo = {
      setBar: jest.fn(),
    };
    spyOn(foo, 'setBar');
    foo.setBar(123);
    jestExpect(foo.setBar).toHaveBeenCalled();
    expect(() => jestExpect(foo.setBar).not.toHaveBeenCalled())
      .toThrowError(/expected a spy to not be called, but it was called 1 times/);
  });

  it(`fails if function hasn't called`, () => {
    const foo = {
      setBar: jest.fn(),
    };
    spyOn(foo, 'setBar');
    jestExpect(foo.setBar).not.toHaveBeenCalled();
    expect(() => jestExpect(foo.setBar).toHaveBeenCalled())
      .toThrowError(/expected a spy to be called but it wasn't/);
  });
});

describe('.toHaveBeenCalledTimes()', () => {
  it('verifies that actual is a Spy', () => {
    const foo = {
      setBar: jest.fn(),
    };

    expect(() => jestExpect(foo.setBar).toHaveBeenCalledTimes(2))
      .toThrowError(/toHaveBeenCalledTimes matcher can only execute on a Spy function/);
  });

  it('pass if function called equal to expected times', () => {
    const foo = {
      setBar: jest.fn(),
    };
    spyOn(foo, 'setBar');
    foo.setBar(123);
    foo.setBar(123);
    jestExpect(foo.setBar).toHaveBeenCalledTimes(2);
    expect(() => jestExpect(foo.setBar).not.toHaveBeenCalledTimes(2))
      .toThrowError(/expected a spy to not be called 2 times, but it was called 2 times/);
  });

  it('fails if function called more than expected times', () => {
    const foo = {
      setBar: jest.fn(),
    };
    spyOn(foo, 'setBar');
    foo.setBar(123);
    foo.setBar(123);
    foo.setBar(123);
    jestExpect(foo.setBar).not.toHaveBeenCalledTimes(2);
    expect(() => jestExpect(foo.setBar).toHaveBeenCalledTimes(2))
      .toThrowError(/expected a spy to be called 2 times, but it was called 3 times/);
  });

  it('fails if function called less than expected times', () => {
    const foo = {
      setBar: jest.fn(),
    };
    spyOn(foo, 'setBar');
    foo.setBar(123);
    jestExpect(foo.setBar).not.toHaveBeenCalledTimes(2);
    expect(() => jestExpect(foo.setBar).toHaveBeenCalledTimes(2))
      .toThrowError(/expected a spy to be called 2 times, but it was called 1 times/);
  });
});
