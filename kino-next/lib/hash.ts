import argon2 from 'argon2'

/**
 * Hash a plain password using Argon2.
 * Example: `const hashed = await hashPassword('mypassword')`
 */
export function hashPassword(password: string) {
  return argon2.hash(password)
}

/**
 * Verify a plain password against a stored hash.
 * Returns `true` if the password matches, otherwise `false`.
 */
export async function verifyPassword(hash: string, plain: string) {
  try {
    return await argon2.verify(hash, plain)
  } catch {
    return false
  }
}
