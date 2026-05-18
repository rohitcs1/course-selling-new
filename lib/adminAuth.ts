import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { NextRequest } from 'next/server'

const ADMIN_JWT_SECRET = process.env.ADMIN_JWT_SECRET || 'change-me'

export function signAdminToken(payload: object) {
  return jwt.sign(payload, ADMIN_JWT_SECRET, { expiresIn: '8h' })
}

export function verifyAdminToken(token?: string) {
  if (!token) return null
  try {
    const data = jwt.verify(token, ADMIN_JWT_SECRET)
    return data
  } catch (err) {
    return null
  }
}

export function hashPassword(password: string) {
  return bcrypt.hashSync(password, 10)
}

export function verifyPassword(password: string, hash: string) {
  return bcrypt.compareSync(password, hash)
}

export function getBearerToken(req: NextRequest) {
  const auth = req.headers.get('authorization') || ''
  const parts = auth.split(' ')
  if (parts[0] !== 'Bearer') return null
  return parts[1]
}
