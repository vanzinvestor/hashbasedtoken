import {
  getTokenExpires,
  getTokenId,
  isExpires,
  sign,
  verify,
} from '../src/index';
import assert from 'assert';
import {
  correctToken,
  incorrectSecretKey,
  incorrectTokenExpiresIn,
  incorrectTokenFormat,
  secretKey,
  tokenExpiresIn,
  tokenId,
} from './test.data';

async function assertThrowsAsync(
  fn: () => unknown,
  error: assert.AssertPredicate,
  message?: string | Error | undefined
) {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  let f = () => {};
  try {
    await fn();
  } catch (e) {
    f = () => {
      throw e;
    };
  } finally {
    assert.throws(f, error, message);
  }
}

describe('Index tests', function () {
  it('get correrct token id should return token id', function () {
    assert.equal(getTokenId(correctToken), tokenId);
  });
  it('get correrct token expiresIn should return time in miliseconds', function () {
    assert.equal(getTokenExpires(correctToken), tokenExpiresIn);
  });
  it('get incorrerct token expiresIn should throw Error', function () {
    assert.throws(
      () => getTokenExpires(incorrectTokenExpiresIn),
      /^Error: Token expires is not numeric$/
    );
  });
  it('sign token expiresIn 5m should token', async function () {
    const token = await sign(tokenId, secretKey, '5m');
    assert.equal(token, token);
  });
  it('sign token expiresIn 180 should token', async function () {
    const token = await sign(tokenId, secretKey, '180');
    assert.equal(token, token);
  });
  it('sign token sort secret key should throw Error', async function () {
    await assertThrowsAsync(
      async () => await sign(tokenId, incorrectSecretKey, '15m'),
      /^Error: Secret key should be at least 32 characters long$/
    );
  });
  it('verify token incorrect format should throw Error', async function () {
    await assertThrowsAsync(
      async () => await verify(incorrectTokenFormat, secretKey),
      /^Error: Invalid hash-based token format$/
    );
  });
  it('verify token expire incorrect format should throw Error', async function () {
    await assertThrowsAsync(
      async () => await verify(incorrectTokenExpiresIn, secretKey),
      /^Error: Token expires is not numeric$/
    );
  });
  it('verify token expire should throw Error', async function () {
    await assertThrowsAsync(
      async () => await verify(correctToken, secretKey),
      /^Error: Token is expired$/
    );
  });
  it('verify token valid should return valid', async function () {
    const token = await sign(tokenId, secretKey, '5m');
    const decoded = await verify(token, secretKey);
    assert.equal(decoded, decoded);
  });
  it('isExpire token incorrect format should throw Error', function () {
    assert.throws(
      () => isExpires(incorrectTokenFormat),
      /^Error: Invalid hash-based token format$/
    );
  });
  it('isExpire token incorrect expire format should return true', function () {
    assert.equal(isExpires(incorrectTokenExpiresIn), true);
  });
  it('isExpire token valid should return false', async function () {
    const token = await sign(tokenId, secretKey, '5m');
    assert.equal(isExpires(token), false);
  });
  it('isExpire token expire should return true', function () {
    assert.equal(isExpires(correctToken), true);
  });
});
