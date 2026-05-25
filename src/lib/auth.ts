import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { pool } from '@/lib/neon'

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-change-in-production'
const JWT_EXPIRES_IN = '7d'

export interface TokenPayload {
  userId: string
}

export interface User {
  id: string
  username: string
  email: string
  role: string
  avatar_url: string | null
  coin_balance: number
}

export function createToken(userId: string): string {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN })
}

export function verifyToken(token: string): TokenPayload | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as TokenPayload
    return decoded
  } catch {
    return null
  }
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10)
}

export async function comparePassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash)
}

export async function getUserById(userId: string): Promise<User | null> {
  const result = await pool.query(
    'SELECT id, username, email, role, avatar_url, coin_balance FROM users WHERE id = $1',
    [userId]
  )
  return result.rows[0] || null
}

export async function getUserByEmail(email: string): Promise<(User & { password_hash: string }) | null> {
  const result = await pool.query(
    'SELECT id, username, email, role, avatar_url, coin_balance, password_hash FROM users WHERE email = $1',
    [email]
  )
  return result.rows[0] || null
}

export async function getUserByUsername(username: string): Promise<(User & { password_hash: string }) | null> {
  const result = await pool.query(
    'SELECT id, username, email, role, avatar_url, coin_balance, password_hash FROM users WHERE username = $1',
    [username]
  )
  return result.rows[0] || null
}

export async function createUser(username: string, email: string, passwordHash: string): Promise<User> {
  const result = await pool.query(
    `INSERT INTO users (username, email, password_hash, role, coin_balance)
     VALUES ($1, $2, $3, 'user', 0)
     RETURNING id, username, email, role, avatar_url, coin_balance`,
    [username, email, passwordHash]
  )
  return result.rows[0]
}

export function extractTokenFromHeader(authHeader: string | null): string | null {
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null
  }
  return authHeader.slice(7)
}
