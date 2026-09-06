import { NextResponse } from 'next/server'
import { searchMovies } from '@/lib/tmdb'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('query') || ''
  const page = Number(searchParams.get('page')) || 1

  try {
    const data = await searchMovies(query, page)
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
