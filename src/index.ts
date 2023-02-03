import bcrypt from 'bcrypt';
import ms from 'ms';
import {
  SEPARATOR,
  base64UrlDecode,
  base64UrlEncode,
  isNumeric,
  splitToken,
  stringBuilder,
} from './utils';

export async function sign(
  id: string | number,
  secretKey: string | Buffer,
  expiresIn: string
) {
  try {
    if (secretKey.length < 32) {
      throw new Error('Secret key should be at least 32 characters long');
    }

    const expires = Date.now() + ms(expiresIn);

    const rawSignature = stringBuilder(
      base64UrlEncode(id),
      SEPARATOR,
      base64UrlEncode(expires),
      SEPARATOR,
      secretKey
    );

    const hash = await bcrypt.hash(rawSignature, 10);

    const token = stringBuilder(
      base64UrlEncode(id),
      SEPARATOR,
      base64UrlEncode(expires),
      SEPARATOR,
      base64UrlEncode(hash)
    );

    return token;
  } catch (err: unknown) {
    throw err as Error;
  }
}

export async function verify(token: string, secretKey: string | Buffer) {
  try {
    const [id, expires, signature] = splitToken(token);

    const idUtf8 = base64UrlDecode(id);

    const expiresUtf8 = base64UrlDecode(expires);

    if (!isNumeric(expiresUtf8)) {
      throw new Error('Token expires is not numeric');
    }

    const expireNumber = parseInt(expiresUtf8);

    if (Date.now() > expireNumber) {
      throw new Error('Token is expired');
    }

    const signatureUtf8 = base64UrlDecode(signature);

    const rawSignature = stringBuilder(
      base64UrlEncode(idUtf8),
      SEPARATOR,
      base64UrlEncode(expiresUtf8),
      SEPARATOR,
      secretKey
    );

    return await bcrypt.compare(rawSignature, signatureUtf8);
  } catch (err: unknown) {
    throw err as Error;
  }
}

export function getTokenId(token: string) {
  const [id, ,] = splitToken(token);

  return base64UrlDecode(id);
}

export function getTokenExpires(token: string) {
  const [, expires] = splitToken(token);

  const expireUtf8 = base64UrlDecode(expires);

  if (!isNumeric(expireUtf8)) {
    throw new Error('Token expires is not numeric');
  }

  return parseInt(expireUtf8);
}

export function isExpires(token: string) {
  const [, expires] = splitToken(token);

  const expiresUtf8 = base64UrlDecode(expires);

  if (!isNumeric(expiresUtf8)) {
    return true;
  }

  const expireNumber = parseInt(expiresUtf8);

  if (Date.now() < expireNumber) {
    return false;
  }

  return true;
}

export default {
  sign,
  verify,
  getTokenId,
  getTokenExpires,
  isExpires,
};
