import { NextResponse } from 'next/server'

export async function POST() {
  // Token is stored client-side, so we just return success
  // Client should remove token from localStorage
  return NextResponse.json({ success: true })
}
