// src/app/api/comments/route.ts
import { NextResponse } from 'next/server'

interface Author {
  name: string;
  avatar: string;
}

interface Comment {
  id: string;
  content: string;
  author: Author;
  date: string;
  time: string;
  likes: number;
  replies: Comment[];
  replyTo?: string;
}

const comments: Record<string, Comment[]> = {}

export async function GET(request: Request) {
  if (!request.url) return NextResponse.json([]);
  const { searchParams } = new URL(request.url);
  const postId = searchParams.get('postId')
  
  if (!postId) return NextResponse.json([])

  return NextResponse.json(comments[postId] || [])
}

export async function POST(request: Request) {
  const body = await request.json()
  const { postId, comment } = body as { postId: string, comment: Partial<Comment> }
  
  if (!comments[postId]) {
    comments[postId] = []
  }
  
  const now = new Date()
  
  const newComment: Comment = {
    id: Date.now().toString(),
    content: comment.content || '',
    author: comment.author || { name: 'Anonymous', avatar: '/default-avatar.png' },
    date: now.toISOString(),
    time: now.toLocaleTimeString(),
    likes: 0,
    replies: [],
    ...(comment.replyTo && { replyTo: comment.replyTo })
  }
  
  if (comment.replyTo) {
    const parentComment = findComment(comments[postId], comment.replyTo)
    if (parentComment) {
      parentComment.replies = parentComment.replies || []
      parentComment.replies.push(newComment)
    }
  } else {
    comments[postId].unshift(newComment)
  }
  
  return NextResponse.json(newComment)
}

function findComment(comments: Comment[], id: string): Comment | null {
  for (const comment of comments) {
    if (comment.id === id) return comment
    if (comment.replies) {
      const found = findComment(comment.replies, id)
      if (found) return found
    }
  }
  return null
}