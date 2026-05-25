import { NextRequest, NextResponse } from 'next/server'
import { pool } from '@/lib/neon'

export async function PATCH(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    const action = searchParams.get('action')

    if (!id || !action) {
      return NextResponse.json({ error: '缺少参数' }, { status: 400 })
    }

    let statusUpdate: string | null = null
    if (action === 'approve') statusUpdate = 'approved'
    else if (action === 'reject') statusUpdate = 'rejected'

    if (statusUpdate) {
      await pool.query(
        'UPDATE resources SET status = $1, updated_at = NOW() WHERE id = $2',
        [statusUpdate, id]
      )
      return NextResponse.json({ success: true })
    }

    return NextResponse.json({ error: '无效操作' }, { status: 400 })
  } catch (error) {
    console.error('Error updating resource:', error)
    return NextResponse.json({ error: '操作失败' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: '缺少参数' }, { status: 400 })
    }

    // Delete pan_links first
    await pool.query('DELETE FROM pan_links WHERE resource_id = $1', [id])
    // Then delete resource
    await pool.query('DELETE FROM resources WHERE id = $1', [id])

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting resource:', error)
    return NextResponse.json({ error: '删除失败' }, { status: 500 })
  }
}