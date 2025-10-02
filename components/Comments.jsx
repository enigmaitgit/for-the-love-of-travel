"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, User, Calendar, Heart, Reply } from "lucide-react";

const Comments = () => {
  const [comments, setComments] = useState([
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah.j@email.com",
      comment: "This article really opened my eyes to the future of workplace technology. The insights about remote collaboration tools are particularly relevant in today's world.",
      date: "2024-12-15",
      likes: 12,
      replies: [
        {
          id: 1,
          name: "Mike Chen",
          email: "mike.c@email.com",
          comment: "I completely agree! We've been using these tools at our company and the productivity gains have been remarkable.",
          date: "2024-12-15",
          likes: 5
        }
      ]
    },
    {
      id: 2,
      name: "Alex Rodriguez",
      email: "alex.r@email.com",
      comment: "The section about AI integration in the workplace was fascinating. It's amazing how quickly technology is evolving.",
      date: "2024-12-14",
      likes: 8,
      replies: []
    },
    {
      id: 3,
      name: "Emma Thompson",
      email: "emma.t@email.com",
      comment: "Great read! I especially enjoyed the part about sustainable technology practices. More companies should consider this approach.",
      date: "2024-12-13",
      likes: 15,
      replies: []
    }
  ]);

  const [newComment, setNewComment] = useState({
    name: "",
    email: "",
    comment: ""
  });

  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState("");

  const handleSubmitComment = (e) => {
    e.preventDefault();
    if (newComment.name && newComment.email && newComment.comment) {
      const comment = {
        id: Date.now(),
        name: newComment.name,
        email: newComment.email,
        comment: newComment.comment,
        date: new Date().toISOString().split('T')[0],
        likes: 0,
        replies: []
      };
      setComments([comment, ...comments]);
      setNewComment({ name: "", email: "", comment: "" });
    }
  };

  const handleSubmitReply = (parentId) => {
    if (replyText.trim()) {
      const parentComment = comments.find(c => c.id === parentId);
      if (parentComment) {
        const reply = {
          id: Date.now(),
          name: "Anonymous User", // In a real app, this would be the logged-in user
          email: "user@email.com",
          comment: replyText,
          date: new Date().toISOString().split('T')[0],
          likes: 0
        };
        
        const updatedComments = comments.map(comment => 
          comment.id === parentId 
            ? { ...comment, replies: [...comment.replies, reply] }
            : comment
        );
        setComments(updatedComments);
        setReplyText("");
        setReplyingTo(null);
      }
    }
  };

  const handleLike = (commentId, isReply = false, parentId = null) => {
    if (isReply && parentId) {
      const updatedComments = comments.map(comment => 
        comment.id === parentId 
          ? {
              ...comment,
              replies: comment.replies.map(reply => 
                reply.id === commentId 
                  ? { ...reply, likes: reply.likes + 1 }
                  : reply
              )
            }
          : comment
      );
      setComments(updatedComments);
    } else {
      const updatedComments = comments.map(comment => 
        comment.id === commentId 
          ? { ...comment, likes: comment.likes + 1 }
          : comment
      );
      setComments(updatedComments);
    }
  };

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-white">
      <div className="container max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header - UPSCALED */}
        <motion.div
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-4 sm:mb-6">
            Comments & Discussion
          </h2>
          <p className="text-gray-600 text-base sm:text-lg md:text-xl lg:text-2xl">
            Share your thoughts and join the conversation
          </p>
        </motion.div>

        {/* Add Comment Form - UPSCALED */}
        <motion.div
          className="mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="bg-gray-50 rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-12 shadow-sm border border-gray-100">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-900 mb-6 sm:mb-8">
              Leave a Comment
            </h3>
            <form onSubmit={handleSubmitComment} className="space-y-6 sm:space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                <div>
                  <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2 sm:mb-3">
                    Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={newComment.name}
                    onChange={(e) => setNewComment({ ...newComment, name: e.target.value })}
                    className="w-full px-4 sm:px-6 py-3 sm:py-4 text-base sm:text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-gold focus:border-transparent outline-none transition-all duration-200"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2 sm:mb-3">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={newComment.email}
                    onChange={(e) => setNewComment({ ...newComment, email: e.target.value })}
                    className="w-full px-4 sm:px-6 py-3 sm:py-4 text-base sm:text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-gold focus:border-transparent outline-none transition-all duration-200"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2 sm:mb-3">
                  Comment *
                </label>
                <textarea
                  required
                  rows={4}
                  value={newComment.comment}
                  onChange={(e) => setNewComment({ ...newComment, comment: e.target.value })}
                  className="w-full px-4 sm:px-6 py-3 sm:py-4 text-base sm:text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-gold focus:border-transparent outline-none transition-all duration-200 resize-none"
                  placeholder="Share your thoughts..."
                />
              </div>
              <div className="flex justify-end">
                <motion.button
                  type="submit"
                  className="bg-brand-gold text-white px-8 sm:px-12 py-3 sm:py-4 text-base sm:text-lg rounded-lg font-medium hover:bg-opacity-90 transition-all duration-200 flex items-center gap-2 sm:gap-3"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Send className="w-5 h-5 sm:w-6 sm:h-6" />
                  Post Comment
                </motion.button>
              </div>
            </form>
          </div>
        </motion.div>

        {/* Comments List - UPSCALED */}
        <div className="space-y-6 sm:space-y-8 md:space-y-10">
          {comments.map((comment, index) => (
            <motion.div
              key={comment.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white border border-gray-200 rounded-lg sm:rounded-xl p-4 sm:p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              {/* Comment Header - UPSCALED */}
              <div className="flex items-start justify-between mb-4 sm:mb-6">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-brand-gold rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white" />
                  </div>
                  <div>
                    <h4 className="text-base sm:text-lg font-semibold text-gray-900">{comment.name}</h4>
                    <div className="flex items-center gap-1 sm:gap-2 text-sm sm:text-base text-gray-500">
                      <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span>{new Date(comment.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => handleLike(comment.id)}
                  className="flex items-center gap-1 sm:gap-2 text-gray-500 hover:text-red-500 transition-colors duration-200"
                >
                  <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="text-sm sm:text-base md:text-lg">{comment.likes}</span>
                </button>
              </div>

              {/* Comment Content - UPSCALED */}
              <p className="text-gray-700 leading-relaxed mb-4 sm:mb-6 text-sm sm:text-base md:text-lg">
                {comment.comment}
              </p>

              {/* Comment Actions - UPSCALED */}
              <div className="flex items-center gap-4 sm:gap-6">
                <button
                  onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                  className="flex items-center gap-1 sm:gap-2 text-gray-500 hover:text-brand-gold transition-colors duration-200"
                >
                  <Reply className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="text-sm sm:text-base md:text-lg">Reply</span>
                </button>
              </div>

              {/* Reply Form - UPSCALED */}
              {replyingTo === comment.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-100"
                >
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                    <input
                      type="text"
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      placeholder="Write a reply..."
                      className="flex-1 px-4 sm:px-6 py-3 sm:py-4 text-base sm:text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-gold focus:border-transparent outline-none"
                    />
                    <button
                      onClick={() => handleSubmitReply(comment.id)}
                      className="bg-brand-gold text-white px-4 sm:px-6 py-3 sm:py-4 text-base sm:text-lg rounded-lg hover:bg-opacity-90 transition-all duration-200"
                    >
                      Reply
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Replies - UPSCALED */}
              {comment.replies.length > 0 && (
                <div className="mt-6 sm:mt-8 space-y-4 sm:space-y-6">
                  {comment.replies.map((reply) => (
                    <div key={reply.id} className="bg-gray-50 rounded-lg p-4 sm:p-6 ml-4 sm:ml-6 md:ml-8">
                      <div className="flex items-start justify-between mb-2 sm:mb-3">
                        <div className="flex items-center gap-2 sm:gap-3">
                          <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gray-400 rounded-full flex items-center justify-center">
                            <User className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                          </div>
                          <span className="font-medium text-sm sm:text-base text-gray-900">{reply.name}</span>
                          <span className="text-xs sm:text-sm text-gray-500">
                            {new Date(reply.date).toLocaleDateString()}
                          </span>
                        </div>
                        <button
                          onClick={() => handleLike(reply.id, true, comment.id)}
                          className="flex items-center gap-1 sm:gap-2 text-gray-500 hover:text-red-500 transition-colors duration-200"
                        >
                          <Heart className="w-3 h-3 sm:w-4 sm:h-4" />
                          <span className="text-xs sm:text-sm">{reply.likes}</span>
                        </button>
                      </div>
                      <p className="text-sm sm:text-base text-gray-700">{reply.comment}</p>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* No Comments State - UPSCALED */}
        {comments.length === 0 && (
          <motion.div
            className="text-center py-12 sm:py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
              <User className="w-8 h-8 sm:w-10 sm:h-10 text-gray-400" />
            </div>
            <h3 className="text-xl sm:text-2xl font-medium text-gray-900 mb-2 sm:mb-3">No comments yet</h3>
            <p className="text-gray-500 text-base sm:text-lg">Be the first to share your thoughts!</p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Comments;
