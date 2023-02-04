# hashbasedtoken

Hash-Based Token, typically looks like the following.

```text
uuuuu.vvvvv.xxxxx
```

- `uuuuu` is `id` (base64url)
- `vvvvv` is `expires` (base64url)
- `xxxxx` is `signature` (base64url)

## Install

```bash
npm install hashbasedtoken
```

## Use

```ts
import hbt from 'hashbasedtoken';

// create token
const token = await hbt.sign('token_id', 'super_secret_key', {
  expiresIn: '5m',
  algorithm: 'HS256',
});
// default expiresIn: 120 (milliseconds), default algorithm:'HS256'

// get token id (return string or number token id)
const tokenId = hbt.getTokenId(token);

// get expires time (return number Unix Timestamp in milliseconds)
const expires = hbt.getTokenExpires(token);

// check expires only (return true or false)
const isExpire = hbt.isExpires(token);

// verify and check expires
try {
  const isValid = await hbt.verify(token, 'super_secret_key');
  console.log(isValid);
} catch (err: any) {
  console.log(err);
}
```
