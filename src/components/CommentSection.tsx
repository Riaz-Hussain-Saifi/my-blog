// src/components/CommentSection.tsx
"use client"
import { useState, useEffect, useCallback } from 'react'
import { Button } from './ui/button'
import Image from 'next/image'
import { formatDistanceToNow } from 'date-fns'

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

export default function CommentSection({ postId }: { postId: string }) {
  const [comments, setComments] = useState<Comment[]>([])
  const [newComment, setNewComment] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [replyTo, setReplyTo] = useState<string | null>(null)

  const fetchComments = useCallback(async () => {
    try {
      const response = await fetch(`/api/comments?postId=${postId}`)
      if (!response.ok) throw new Error('Failed to fetch comments')
      const data = await response.json()
      setComments(data)
    } catch (error) {
      console.error('Error fetching comments:', error)
    } finally {
      setIsLoading(false)
    }
  }, [postId])

  useEffect(() => {
    fetchComments()
  }, [fetchComments])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newComment.trim()) return

    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          postId,
          comment: {
            content: newComment,
            author: {
              name: 'Current User',
              avatar: '/default-avatar.png'
            },
            replyTo: replyTo
          }
        })
      })

      if (!response.ok) throw new Error('Failed to post comment')
      
      const data = await response.json()
      if (replyTo) {
        setComments(prevComments => 
          prevComments.map(comment => {
            if (comment.id === replyTo) {
              return {
                ...comment,
                replies: [...(comment.replies || []), data]
              }
            }
            return comment
          })
        )
      } else {
        setComments(prev => [data, ...prev])
      }
      
      setNewComment('')
      setReplyTo(null)
    } catch (error) {
      console.error('Error posting comment:', error)
    }
  }

  const handleLike = async (commentId: string) => {
    setComments(prevComments =>
      prevComments.map(comment => {
        if (comment.id === commentId) {
          return { ...comment, likes: comment.likes + 1 }
        }
        return comment
      })
    )
  }

  const handleReply = (commentId: string) => {
    setReplyTo(commentId)
  }

  if (isLoading) return <div>Loading comments...</div>

  return (
    <div className="space-y-8 mt-8">
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder={replyTo ? "Write a reply..." : "Write a comment..."}
          className="w-full p-4 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          rows={3}
        />
        <div className="flex justify-between items-center">
          {replyTo && (
            <Button
              type="button"
              variant="ghost"
              onClick={() => setReplyTo(null)}
            >
              Cancel Reply
            </Button>
          )}
          <Button type="submit">
            {replyTo ? "Post Reply" : "Post Comment"}
          </Button>
        </div>
      </form>

      <div className="space-y-6">
        {comments.map((comment) => (
          <div key={comment.id} className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center space-x-4 mb-4">
              <Image
                src={comment.author.avatar}
                alt={comment.author.name}
                width={40}
                height={40}
                className="rounded-full"
              />
              <div>
                <h4 className="font-semibold">{comment.author.name}</h4>
                <p className="text-sm text-gray-500">
                  {formatDistanceToNow(new Date(comment.date), { addSuffix: true })}
                </p>
              </div>
            </div>
            <p className="text-gray-700 mb-4">{comment.content}</p>
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleLike(comment.id)}
              >
                ❤️ {comment.likes}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleReply(comment.id)}
              >
                Reply
              </Button>
            </div>
            {comment.replies && comment.replies.length > 0 && (
              <div className="mt-4 ml-8 space-y-4">
                {comment.replies.map((reply) => (
                  <div key={reply.id} className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center space-x-4 mb-2">
                      <Image
                        src={reply.author.avatar}
                        alt={reply.author.name}
                        width={32}
                        height={32}
                        className="rounded-full"
                      />
                      <div>
                        <h5 className="font-semibold">{reply.author.name}</h5>
                        <p className="text-sm text-gray-500">
                          {formatDistanceToNow(new Date(reply.date), { addSuffix: true })}
                        </p>
                      </div>
                    </div>
                    <p className="text-gray-700">{reply.content}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
