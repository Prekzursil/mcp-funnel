import { createHash, scryptSync } from 'crypto';
import type { TokenData } from '@mcp-funnel/core';

/**
 * Static, versioned salt: the filename derivation must be deterministic
 * across processes (same key -> same file), so the salt is a fixed domain
 * string rather than per-file randomness.
 */
const FILENAME_SALT_V1 = 'mcp-funnel-token-filename-v1';

/**
 * Generate secure filename from key using scrypt.
 *
 * The value is run through a real KDF (not a bare fast hash) so the derived
 * name leaks nothing invertible about the key even if the fallback directory
 * is listed (js/insufficient-password-hash).
 * @param key - The key to derive the filename for
 * @returns Derived filename
 * @internal
 */
export function getFilename(key: string): string {
  const derived = scryptSync(key, FILENAME_SALT_V1, 16).toString('hex');
  return `token-${derived}.json`;
}

/**
 * Legacy (pre-scrypt) filename for a key. Kept ONLY so existing stored
 * tokens remain readable/removable after the migration; new writes always
 * use {@link getFilename}.
 * @param key - The key to hash
 * @returns Legacy hashed filename
 * @internal
 */
export function getLegacyFilename(key: string): string {
  const hash = createHash('sha256').update(key).digest('hex');
  return `token-${hash.substring(0, 16)}.json`;
}

/**
 * Parse stored token JSON back to TokenData
 * @param jsonString - JSON string representation of token
 * @returns Parsed TokenData object
 * @throws \{SyntaxError\} When JSON parsing fails due to invalid format
 * @internal
 */
export function parseStoredToken(jsonString: string): TokenData {
  const parsed = JSON.parse(jsonString);

  return {
    accessToken: parsed.accessToken,
    expiresAt: new Date(parsed.expiresAt),
    tokenType: parsed.tokenType || 'Bearer',
    scope: parsed.scope,
  };
}

/**
 * Serialize token data to JSON string for storage
 * @param token - TokenData to serialize
 * @returns JSON string representation
 * @internal
 */
export function serializeToken(token: TokenData): string {
  return JSON.stringify({
    accessToken: token.accessToken,
    expiresAt: token.expiresAt.toISOString(),
    tokenType: token.tokenType,
    scope: token.scope,
  });
}
