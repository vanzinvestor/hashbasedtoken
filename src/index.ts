import jwa from 'jwa';
import ms from 'ms';
import {
  SEPARATOR,
  base64UrlDecode,
  base64UrlEncode,
  isNumeric,
  splitToken,
  stringBuilder,
} from './utils';

type Algorithm =
  | 'HS256'
  | 'HS384'
  | 'HS512'
  | 'RS256'
  | 'RS384'
  | 'RS512'
  | 'PS256'
  | 'PS384'
  | 'PS512'
  | 'ES256'
  | 'ES384'
  | 'ES512'
  | 'none';

export type HbtOptions = {
  algorithm?: Algorithm;
};

export type HbtSignOptions = HbtOptions & {
  expiresIn?: string | number;
};

export async function sign(
  id: string | number,
  secretOrPublicKey: string,
  options?: HbtSignOptions
) {
  try {
    if (secretOrPublicKey.length < 32) {
      throw new Error('Secret key should be at least 32 characters long');
    }

    const expiresIn = options?.expiresIn;

    let expires: number;

    if (expiresIn && typeof expiresIn === 'string') {
      expires = Date.now() + ms(expiresIn);
    } else if (expiresIn && typeof expiresIn === 'number') {
      expires = Date.now() + expiresIn;
    } else {
      expires = Date.now() + 120;
    }

    const input = stringBuilder(
      base64UrlEncode(id),
      SEPARATOR,
      base64UrlEncode(expires)
    );

    const inputAlgorithm = options?.algorithm;

    let algorithm: Algorithm;

    if (inputAlgorithm) {
      algorithm = inputAlgorithm;
    } else {
      algorithm = 'HS256';
    }

    const signature = jwa(algorithm).sign(input, secretOrPublicKey);

    const token = stringBuilder(
      base64UrlEncode(id),
      SEPARATOR,
      base64UrlEncode(expires),
      SEPARATOR,
      base64UrlEncode(signature)
    );

    return token;
  } catch (err: unknown) {
    throw err as Error;
  }
}

export async function verify(
  token: string,
  secretOrPublicKey: string,
  options?: HbtOptions
) {
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

    const input = stringBuilder(
      base64UrlEncode(idUtf8),
      SEPARATOR,
      base64UrlEncode(expiresUtf8)
    );

    const inputAlgorithm = options?.algorithm;

    let algorithm: Algorithm;

    if (inputAlgorithm) {
      algorithm = inputAlgorithm;
    } else {
      algorithm = 'HS256';
    }

    return await jwa(algorithm).verify(input, signatureUtf8, secretOrPublicKey);
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
