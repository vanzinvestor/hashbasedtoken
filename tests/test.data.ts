export const secretKey = 'DwIz2mksQpmV48C5z3zzwPaFD5gFXanYOZg2jf3wycc=';

export const incorrectSecretKey = 'AUNi8I639Sqq6+73PJEN1aVFgChzAJ';

export const tokenId = '260d21dc-73a4-4dee-ba9b-eebb67189f5f';

export const base64urlTokenId =
  'MjYwZDIxZGMtNzNhNC00ZGVlLWJhOWItZWViYjY3MTg5ZjVm';

export const tokenExpiresIn = 1675482240019;

export const base64urlTokenExpiresIn = 'MTY3NTQ4MjI0MDAxOQ';

export const signatureToken =
  'dXV0OUM1R2pueWRoQm9Vd1MxM3VXRVQwb1c5LUU1eEJGR1RRc25qRF81Yw';

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
