export const secretKey = 'DwIz2mksQpmV48C5z3zzwPaFD5gFXanYOZg2jf3wycc=';

export const incorrectSecretKey = 'AUNi8I639Sqq6+73PJEN1aVFgChzAJ';

export const tokenId = '260d21dc-73a4-4dee-ba9b-eebb67189f5f';

export const base64urlTokenId =
  'MjYwZDIxZGMtNzNhNC00ZGVlLWJhOWItZWViYjY3MTg5ZjVm';

export const tokenExpiresIn = 1675420075116;

export const base64urlTokenExpiresIn = 'MTY3NTQyMDA3NTExNg';

export const signatureToken =
  'JDJiJDEwJHBqVHQvNGxqYnJ6eU0ud1RTQ05nU2V0UkpMMGFxZTdHemY2M0U1d0xJZ0lpazVMYkhraGpL';

export const correctToken =
  base64urlTokenId + '.' + base64urlTokenExpiresIn + '.' + signatureToken;

export const incorrectTokenFormat =
  base64urlTokenId +
  '.' +
  base64urlTokenExpiresIn +
  '.incorrect.' +
  signatureToken;

export const incorrectTokenExpiresIn =
  base64urlTokenId + '.' + 'MTY3NTE0MjU2MzY3M2FiYw' + '.' + signatureToken;
