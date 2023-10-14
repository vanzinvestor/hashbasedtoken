# hashbasedtoken

Hash-Based Token, typically looks like the following.

```text
uuuuu.vvvvv.xxxxx
```

- `uuuuu` is `id` (base64url)
- `vvvvv` is `expires` (base64url)
- `xxxxx` is `signature` (base64url)

A token based on an ID, such as a UUID Hash-Based Token (hashbasedtoken), has a length of 126 characters, whereas a JSON Web Token (jsonwebtoken) has a length of 187 characters.

## Install

```bash
npm install hashbasedtoken
```

## Quick Start

Get up and running with a single import.

### Sign

```ts
import hbt from 'hashbasedtoken';

const token = await hbt.sign('token_id', 'super_secret_key', {
   algorithm: 'HS256'
   expiresIn: '5m',
});
```

options:

- algorithm (default: HS256)

> Eg: `"HS256"`, `"HS384"`, `"HS512"`, `"RS256"`, `"RS384"`,`"RS512"`, `"PS256"`, `"PS384"`, `"PS512"`, `"ES256"`, `"ES384"`, `"ES512"`. A hash algorithm, otherwise algorithm is used by default (`"HS256"` is equal to `"HMAC using SHA-256 hash algorithm"`).

- expiresIn (default: 120)

> Eg: `60`, `"2s"`, `"5m"`, `"10h"`, `"2 days"`, `"7d"`. A numeric value is interpreted as a seconds count. If you use a string be sure you provide the time units (days, hours, etc), otherwise milliseconds unit is used by default (`"120"` is equal to `"120ms"`).

### Verify

```ts
try {
  const isValid = await hbt.verify(token, 'super_secret_key');
  console.log(isValid);
} catch (err: any) {
  console.log(err);
}
```

### Get token id

```ts
const tokenId = hbt.getTokenId(token);
```

### Get token expires (Unix Timestamp in milliseconds)

```ts
const expires = hbt.getTokenExpires(token);
```

### Check token expires (not verify)

```ts
const isExpire = hbt.isExpires(token);
```

### Remark

However, it's essential to strike a balance between token length and security. While short tokens have their advantages, they should still provide a sufficient level of security for the specific application. Token security also depends on other factors, such as token complexity, encryption, and proper implementation.
