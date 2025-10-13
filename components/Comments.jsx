"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Send, User, Calendar, Heart, Reply, Loader2, ThumbsDown, Flag } from "lucide-react";
import { useParams } from "next/navigation";
import ReportCommentModal from "./ReportCommentModal";

const Comments = () => {
  const params = useParams();
  const postSlug = params?.slug;
  
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const [newComment, setNewComment] = useState({
    name: "",
    email: "",
    website: "",
    comment: ""
  });

  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [reportModal, setReportModal] = useState({ isOpen: false, commentId: null, commentAuthor: "" });

  // Fetch comments from API
  const fetchComments = async () => {
    if (!postSlug) return;
    
    try {
      setLoading(true);
      const response = await fetch(`/api/interactions/posts/${postSlug}/comments?includeReplies=true`);
      const data = await response.json();
      
      if (data.success) {
        // Transform flat comments into nested structure
        const commentsData = data.data || [];
        const commentsMap = new Map();
        const rootComments = [];
        
        // First pass: create map of all comments
        commentsData.forEach(comment => {
          commentsMap.set(comment._id, { ...comment, replies: [] });
        });
        
        // Second pass: build nested structure
        commentsData.forEach(comment => {
          if (comment.parentId) {
            // This is a reply
            const parent = commentsMap.get(comment.parentId);
            if (parent) {
              parent.replies.push(comment);
            }
          } else {
            // This is a root comment
            rootComments.push(commentsMap.get(comment._id));
          }
        });
        
        setComments(rootComments);
      } else {
        setError(data.message || 'Failed to load comments');
      }
    } catch (err) {
      setError('Failed to load comments');
      console.error('Error fetching comments:', err);
    } finally {
      setLoading(false);
    }
  };

  // Load comments on component mount
  useEffect(() => {
    fetchComments();
  }, [postSlug]);

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (!newComment.name || !newComment.email || !newComment.comment) {
      setError('Please fill in all required fields');
      return;
    }

    try {
      setSubmitting(true);
      setError(null);
      
      const response = await fetch(`/api/interactions/posts/${postSlug}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          author: {
            name: newComment.name,
            email: newComment.email,
            website: newComment.website
          },
          content: newComment.comment
        })
      });

      const data = await response.json();
      
      if (data.success) {
        setSuccessMessage(data.data.status === 'approved' 
          ? 'Comment posted successfully!' 
          : 'Comment submitted for moderation. Thank you!');
        setNewComment({ name: "", email: "", website: "", comment: "" });
        // Refresh comments to show the new one if approved
        if (data.data.status === 'approved') {
          fetchComments();
        }
      } else {
        // Handle validation errors
        if (data.errors && Array.isArray(data.errors)) {
          const errorMessages = data.errors.map(err => `${err.field}: ${err.message}`).join(', ');
          setError(errorMessages);
        } else {
          setError(data.message || 'Failed to submit comment');
        }
      }
    } catch (err) {
      setError('Failed to submit comment. Please try again.');
      console.error('Error submitting comment:', err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleSubmitReply = async (parentId) => {
    if (!replyText.trim()) {
      setError('Please enter a reply');
      return;
    }
    
    if (!newComment.name.trim() || !newComment.email.trim()) {
      setError('Please fill in your name and email to reply');
      return;
    }

    try {
      setSubmitting(true);
      setError(null);
      
      // Find the parent comment to get author info
      const parentComment = comments.find(c => c.id === parentId);
      
      const replyData = {
        author: {
          name: newComment.name || "Anonymous",
          email: newComment.email || "anonymous@example.com",
          website: newComment.website
        },
        content: replyText,
        parentId: parentId
      };
      
      const response = await fetch(`/api/interactions/posts/${postSlug}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(replyData)
      });

      const data = await response.json();
      
      if (data.success) {
        setSuccessMessage(data.data.status === 'approved' 
          ? 'Reply posted successfully!' 
          : 'Reply submitted for moderation. Thank you!');
        setReplyText("");
        setReplyingTo(null);
        // Clear the form fields
        setNewComment({ name: "", email: "", website: "", comment: "" });
        // Refresh comments to show the new reply if approved
        if (data.data.status === 'approved') {
          fetchComments();
        }
      } else {
        setError(data.message || 'Failed to submit reply');
      }
    } catch (err) {
      setError('Failed to submit reply. Please try again.');
      console.error('Error submitting reply:', err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleLike = async (commentId, isReply = false, parentId = null) => {
    try {
      const response = await fetch(`/api/interactions/comments/${commentId}/like`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      const data = await response.json();
      
      if (data.success) {
        // Update the comment in the state
        if (isReply && parentId) {
          const updatedComments = comments.map(comment => 
            comment._id === parentId 
              ? {
                  ...comment,
                  replies: comment.replies.map(reply => 
                    reply._id === commentId 
                      ? { ...reply, likes: data.data.likes }
                      : reply
                  )
                }
              : comment
          );
          setComments(updatedComments);
        } else {
          const updatedComments = comments.map(comment => 
            comment._id === commentId 
              ? { ...comment, likes: data.data.likes }
              : comment
          );
          setComments(updatedComments);
        }
      }
    } catch (err) {
      console.error('Error liking comment:', err);
    }
  };

  const handleDislike = async (commentId, isReply = false, parentId = null) => {
    try {
      const response = await fetch(`/api/interactions/comments/${commentId}/dislike`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      const data = await response.json();
      
      if (data.success) {
        // Update the comment in the state
        if (isReply && parentId) {
          const updatedComments = comments.map(comment => 
            comment._id === parentId 
              ? {
                  ...comment,
                  replies: comment.replies.map(reply => 
                    reply._id === commentId 
                      ? { ...reply, dislikes: data.data.dislikes }
                      : reply
                  )
                }
              : comment
          );
          setComments(updatedComments);
        } else {
          const updatedComments = comments.map(comment => 
            comment._id === commentId 
              ? { ...comment, dislikes: data.data.dislikes }
              : comment
          );
          setComments(updatedComments);
        }
      }
    } catch (err) {
      console.error('Error disliking comment:', err);
    }
  };

  const handleReport = (commentId, commentAuthor) => {
    setReportModal({
      isOpen: true,
      commentId,
      commentAuthor
    });
  };

  const closeReportModal = () => {
    setReportModal({
      isOpen: false,
      commentId: null,
      commentAuthor: ""
    });
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
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}
            {successMessage && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-green-600 text-sm">{successMessage}</p>
              </div>
            )}
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
                  Website (optional)
                </label>
                <input
                  type="text"
                  value={newComment.website}
                  onChange={(e) => setNewComment({ ...newComment, website: e.target.value })}
                  className="w-full px-4 sm:px-6 py-3 sm:py-4 text-base sm:text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-gold focus:border-transparent outline-none transition-all duration-200"
                  placeholder="https://yourwebsite.com"
                />
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
                  disabled={submitting}
                  className="bg-brand-gold text-white px-8 sm:px-12 py-3 sm:py-4 text-base sm:text-lg rounded-lg font-medium hover:bg-opacity-90 transition-all duration-200 flex items-center gap-2 sm:gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ scale: submitting ? 1 : 1.02 }}
                  whileTap={{ scale: submitting ? 1 : 0.98 }}
                >
                  {submitting ? (
                    <Loader2 className="w-5 h-5 sm:w-6 sm:h-6 animate-spin" />
                  ) : (
                    <Send className="w-5 h-5 sm:w-6 sm:h-6" />
                  )}
                  {submitting ? 'Posting...' : 'Post Comment'}
                </motion.button>
              </div>
            </form>
          </div>
        </motion.div>

        {/* Comments List - UPSCALED */}
        <div className="space-y-6 sm:space-y-8 md:space-y-10">
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-brand-gold" />
              <span className="ml-3 text-gray-600">Loading comments...</span>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-600 mb-4">{error}</p>
              <button 
                onClick={fetchComments}
                className="bg-brand-gold text-white px-6 py-2 rounded-lg hover:bg-opacity-90 transition-all duration-200"
              >
                Try Again
              </button>
            </div>
          ) : comments.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600">No comments yet. Be the first to share your thoughts!</p>
            </div>
          ) : (
            comments.map((comment, index) => (
            <motion.div
              key={comment._id}
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
                    <h4 className="text-base sm:text-lg font-semibold text-gray-900">{comment.author.name}</h4>
                    <div className="flex items-center gap-1 sm:gap-2 text-sm sm:text-base text-gray-500">
                      <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span>{new Date(comment.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Comment Content - UPSCALED */}
              <p className="text-gray-700 leading-relaxed mb-4 sm:mb-6 text-sm sm:text-base md:text-lg">
                {comment.content}
              </p>

              {/* Comment Actions - UPSCALED */}
              <div className="flex items-center gap-4 sm:gap-6">
                <button
                  onClick={() => handleLike(comment._id)}
                  className="flex items-center gap-1 sm:gap-2 text-gray-500 hover:text-red-500 transition-colors duration-200"
                >
                  <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="text-sm sm:text-base md:text-lg">{comment.likes || 0}</span>
                </button>
                <button
                  onClick={() => handleDislike(comment._id)}
                  className="flex items-center gap-1 sm:gap-2 text-gray-500 hover:text-blue-500 transition-colors duration-200"
                >
                  <ThumbsDown className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="text-sm sm:text-base md:text-lg">{comment.dislikes || 0}</span>
                </button>
                <button
                  onClick={() => setReplyingTo(replyingTo === comment._id ? null : comment._id)}
                  className="flex items-center gap-1 sm:gap-2 text-gray-500 hover:text-brand-gold transition-colors duration-200"
                >
                  <Reply className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="text-sm sm:text-base md:text-lg">Reply</span>
                </button>
                <button
                  onClick={() => handleReport(comment._id, comment.author.name)}
                  className="flex items-center gap-1 sm:gap-2 text-gray-500 hover:text-red-600 transition-colors duration-200"
                >
                  <Flag className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="text-sm sm:text-base md:text-lg">Report</span>
                </button>
              </div>

              {/* Reply Form - UPSCALED */}
              {replyingTo === comment._id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-100"
                >
                  <div className="space-y-3 sm:space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      <input
                        type="text"
                        value={newComment.name}
                        onChange={(e) => setNewComment({ ...newComment, name: e.target.value })}
                        placeholder="Your name *"
                        className="px-4 sm:px-6 py-3 sm:py-4 text-base sm:text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-gold focus:border-transparent outline-none"
                      />
                      <input
                        type="email"
                        value={newComment.email}
                        onChange={(e) => setNewComment({ ...newComment, email: e.target.value })}
                        placeholder="Your email *"
                        className="px-4 sm:px-6 py-3 sm:py-4 text-base sm:text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-gold focus:border-transparent outline-none"
                      />
                    </div>
                    <input
                      type="text"
                      value={newComment.website}
                      onChange={(e) => setNewComment({ ...newComment, website: e.target.value })}
                      placeholder="Website (optional)"
                      className="w-full px-4 sm:px-6 py-3 sm:py-4 text-base sm:text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-gold focus:border-transparent outline-none"
                    />
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
                  </div>
                </motion.div>
              )}

              {/* Replies - UPSCALED */}
              {comment.replies && comment.replies.length > 0 && (
                <div className="mt-6 sm:mt-8 space-y-4 sm:space-y-6">
                  {comment.replies.map((reply) => (
                    <div key={reply._id} className="bg-gray-50 rounded-lg p-4 sm:p-6 ml-4 sm:ml-6 md:ml-8">
                      <div className="flex items-start justify-between mb-2 sm:mb-3">
                        <div className="flex items-center gap-2 sm:gap-3">
                          <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gray-400 rounded-full flex items-center justify-center">
                            <User className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                          </div>
                          <span className="font-medium text-sm sm:text-base text-gray-900">{reply.author.name}</span>
                          <span className="text-xs sm:text-sm text-gray-500">
                            {new Date(reply.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleLike(reply._id, true, comment._id)}
                            className="flex items-center gap-1 text-gray-500 hover:text-red-500 transition-colors duration-200"
                          >
                            <Heart className="w-3 h-3 sm:w-4 sm:h-4" />
                            <span className="text-xs sm:text-sm">{reply.likes || 0}</span>
                          </button>
                          <button
                            onClick={() => handleDislike(reply._id, true, comment._id)}
                            className="flex items-center gap-1 text-gray-500 hover:text-blue-500 transition-colors duration-200"
                          >
                            <ThumbsDown className="w-3 h-3 sm:w-4 sm:h-4" />
                            <span className="text-xs sm:text-sm">{reply.dislikes || 0}</span>
                          </button>
                          <button
                            onClick={() => handleReport(reply._id, reply.author.name)}
                            className="flex items-center gap-1 text-gray-500 hover:text-red-600 transition-colors duration-200"
                          >
                            <Flag className="w-3 h-3 sm:w-4 sm:h-4" />
                          </button>
                        </div>
                      </div>
                      <p className="text-sm sm:text-base text-gray-700">{reply.content}</p>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          ))
          )}
        </div>

      </div>

      {/* Report Comment Modal */}
      <ReportCommentModal
        isOpen={reportModal.isOpen}
        onClose={closeReportModal}
        commentId={reportModal.commentId}
        commentAuthor={reportModal.commentAuthor}
      />
    </section>
  );
};

export default Comments;
