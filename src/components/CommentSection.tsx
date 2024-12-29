"use client"
import { useState, useEffect } from 'react'
import { Button } from './ui/button'

export default function CommentSection({ postId }: { postId: string }) {
  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchComments()
  }, [postId])

  const fetchComments = async () => {
    try {
      const response = await fetch(`/api/comments?postId=${postId}`)
      const data = await response.json()
      setComments(data)
    } catch (error) {
      console.error('Error fetching comments:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newComment.trim()) return

    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          postId,
          comment: {
            content: newComment,
            author: {
              name: 'Guest User', // In a real app, this would come from authentication
              avatar: '/guestUser.png'
            }
          }
        }),
      })

      if (response.ok) {
        setNewComment('')
        fetchComments()
      }
    } catch (error) {
      console.error('Error posting comment:', error)
    }
  }

  return (
    <div className="mt-8">
      <h3 className="text-2xl font-bold mb-4">Comments</h3>
      
      <form onSubmit={handleSubmitComment} className="mb-6">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
          rows={3}
          placeholder="Write a comment..."
        />
        <Button
          type="submit"
          className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Post Comment
        </Button>
      </form>

      {isLoading ? (
        <div>Loading comments...</div>
      ) : (
        <div className="space-y-4">
          {comments.map((comment: any) => (
            <div key={comment.id} className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <img
                  src={comment.author.avatar}
                  alt={comment.author.name}
                  className="w-8 h-8 rounded-full mr-2"
                />
                <div>
                  <div className="font-semibold">{comment.author.name}</div>
                  <div className="text-sm text-gray-500">
                    {new Date(comment.date).toLocaleDateString()}
                  </div>
                </div>
              </div>
              <p className="text-gray-700">{comment.content}</p>
              {/* <div className="mt-2 text-sm text-gray-500">
                <Button className="mr-4 hover:text-blue-600">
                  Like ({comment.likes})
                </Button>
                <Button className="hover:text-blue-600">Reply</Button>
              </div> */}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
