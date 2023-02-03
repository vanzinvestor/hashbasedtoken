import {
  base64UrlEncode,
  base64UrlDecode,
  isNumeric,
  SEPARATOR,
  stringBuilder,
  splitToken,
} from '../src/utils';
import assert from 'assert';
import {
  base64urlTokenExpiresIn,
  base64urlTokenId,
  correctToken,
  incorrectTokenFormat,
  signatureToken,
  tokenExpiresIn,
  tokenId,
} from './test.data';

describe('Utils tests', function () {
  it('SEPARATOR should return .', function () {
    assert.equal(SEPARATOR, '.');
  });
  it('number encode should return base64url', function () {
    assert.equal(base64UrlEncode(tokenExpiresIn), base64urlTokenExpiresIn);
  });
  it('base64url decode should return utf-8', function () {
    assert.equal(base64UrlDecode(base64urlTokenExpiresIn), tokenExpiresIn);
  });
  it('string encode should return base64url', function () {
    assert.equal(base64UrlEncode(tokenId), base64urlTokenId);
  });
  it('base64url decode should return utf-8', function () {
    assert.equal(base64UrlDecode(base64urlTokenId), tokenId);
  });
  it('number in string should return true', function () {
    assert.equal(isNumeric(tokenExpiresIn), true);
  });
  it('string in string should return false', function () {
    assert.equal(isNumeric('abc4568910'), false);
  });
  it('stringBuilder should return token', function () {
    assert.equal(
      stringBuilder(
        base64urlTokenId,
        SEPARATOR,
        base64urlTokenExpiresIn,
        SEPARATOR,
        signatureToken
      ),
      correctToken
    );
  });
  it('split correct token should return array of token', function () {
    assert.equal(splitToken(correctToken).length, 3);
  });
  it('split incorrect token should throw Error', function () {
    assert.throws(
      () => splitToken(incorrectTokenFormat),
      /^Error: Invalid hash-based token format$/
    );
  });
  it('split correct token should return array index 0 of token', function () {
    assert.equal(splitToken(correctToken)[0], base64urlTokenId);
  });
  it('split correct token should return array index 1 of token', function () {
    assert.equal(splitToken(correctToken)[1], base64urlTokenExpiresIn);
  });
  it('split correct token should return array index 2 of token', function () {
    assert.equal(splitToken(correctToken)[2], signatureToken);
  });
});
