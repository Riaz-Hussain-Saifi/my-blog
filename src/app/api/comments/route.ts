import { NextResponse } from 'next/server'

let comments: any = {}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const postId = searchParams.get('postId')
  
  if (!postId) {
    return NextResponse.json([])
  }
  
  return NextResponse.json(comments[postId] || [])
}

export async function POST(request: Request) {
  const body = await request.json()
  const { postId, comment } = body
  
  if (!comments[postId]) {
    comments[postId] = []
  }
  
  const now = new Date()
  
  const newComment = {
    id: Date.now().toString(),
    ...comment,
    date: now.toISOString(),
    time: now.toLocaleTimeString(), // Added time in local time format (HH:MM:SS)
    likes: 0,
    replies: []
  }
  
  comments[postId].unshift(newComment)
  
  return NextResponse.json(newComment)
}