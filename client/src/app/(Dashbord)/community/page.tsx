
"use client"
import { useState } from 'react'
import { motion } from 'framer-motion'

const posts = [
  { id: 1, author: 'Alice Johnson', content: 'Just hit a new milestone with WOrecorder! 1000 orders processed this month.', likes: 15, comments: 3 },
  { id: 2, author: 'Bob Smith', content: 'Any tips for optimizing order processing? Looking to streamline our workflow.', likes: 8, comments: 5 },
  { id: 3, author: 'Charlie Brown', content: 'Loving the new features in the latest update. The dashboard is so much more intuitive now!', likes: 22, comments: 7 },
]

export default function Community() {
  const [newPost, setNewPost] = useState('')

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    // Here you would typically send the new post to your backend
    console.log('New post:', newPost)
    setNewPost('')
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Community</h1>
      <div className="shadow rounded-lg p-6 ">
        <form onSubmit={handleSubmit} className="mb-6">
          <textarea
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            placeholder="Share your thoughts..."
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            rows={3}
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="mt-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors duration-200"
          >
            Post
          </motion.button>
        </form>
        <div className="space-y-4">
          {posts.map((post) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="border-b border-gray-200 pb-4 bg-[#F5F5DC]"
            >
              <h3 className="font-semibold">{post.author}</h3>
              <p className="mt-2 text-gray-600">{post.content}</p>
              <div className="mt-2 flex space-x-4 text-sm text-gray-500">
                <span>{post.likes} likes</span>
                <span>{post.comments} comments</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}