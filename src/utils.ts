export const SEPARATOR = '.';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function base64UrlEncode(s: any) {
  const buff = Buffer.from(s.toString(), 'utf-8');
  return buff.toString('base64url');
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function base64UrlDecode(s: any) {
  const buff = Buffer.from(s.toString(), 'base64url');
  return buff.toString('utf-8');
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isNumeric(value: any) {
  return /^\d+$/.test(value);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function stringBuilder(...args: any[]) {
  return args.join('');
}

export function splitToken(
  token: string
): [id: string, expires: string, signature: string] {
  const arr = token.split(SEPARATOR);

  if (arr.length !== 3) {
    throw new Error('Invalid hash-based token format');
  }

  const id = arr[0];

  const expires = arr[1];

  const signature = arr[2];

  return [id, expires, signature];
}
