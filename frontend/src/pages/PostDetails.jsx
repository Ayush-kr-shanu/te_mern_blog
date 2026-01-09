import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";
import useAuth from "../hooks/useAuth";

export default function PostDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [post, setPost] = useState(null);
  const [comment, setComment] = useState("");
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingContent, setEditingContent] = useState("");
  const [loading, setLoading] = useState(true);

  /* ---------------- FETCH POST ---------------- */
  const fetchPost = async () => {
    const res = await api.get(`/post/${id}`);
    setPost(res.data.data);
  };

  useEffect(() => {
    fetchPost().finally(() => setLoading(false));
  }, [id]);

  const deletePost = async () => {
    if (!window.confirm("Delete this post?")) return;

    await api.delete(`/post/${post._id}`);
    navigate("/");
  };

  const submitComment = async () => {
    if (!comment.trim()) return;

    await api.post(`/comment/${post._id}`, { content: comment });
    setComment("");
    fetchPost();
  };

  const updateComment = async (commentId) => {
    if (!editingContent.trim()) return;

    await api.put(`/comment/edit/${commentId}`, {
      content: editingContent,
    });

    setEditingCommentId(null);
    setEditingContent("");
    fetchPost();
  };

  const deleteComment = async (commentId) => {
    if (!window.confirm("Delete this comment?")) return;

    await api.delete(`/comment/${commentId}`);
    fetchPost();
  };

  if (loading) {
    return <p className="text-center text-gray-500 mt-10">Loading post...</p>;
  }

  if (!post) {
    return <p className="text-center text-red-500 mt-10">Post not found</p>;
  }

  console.log(user)

  return (
    <div className="max-w-4xl mx-auto px-4">
      {/* POST */}
      <div className="bg-white p-6 rounded shadow mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-3xl font-bold">{post.title}</h2>

          {/* POST EDIT / DELETE */}
          {user && (user.role === "admin" || post.author?._id === user._id) && (
            <div className="flex gap-3 text-sm">
              <button
                onClick={() => navigate(`/post/edit/${post._id}`)}
                className="text-blue-600 hover:underline"
              >
                Edit
              </button>

              <button
                onClick={deletePost}
                className="text-red-600 hover:underline"
              >
                Delete
              </button>
            </div>
          )}
        </div>

        <p className="text-sm text-gray-500 mb-4">
          By <span className="font-medium">{post.author?.name}</span>
        </p>

        <p className="text-gray-700 leading-relaxed">{post.content}</p>

        {/* Views */}
        <div className="text-sm text-gray-500 text-right">
          👁️ {post.views} views
        </div>
      </div>

      {/* COMMENTS */}
      <div className="bg-white p-6 rounded shadow">
        <h3 className="text-xl font-semibold mb-4">
          Comments ({post.comments?.length || 0})
        </h3>

        {post.comments?.length === 0 && (
          <p className="text-gray-500">No comments yet. Be the first one!</p>
        )}

        <div className="space-y-3">
          {post.comments?.map((c) => (
            <div key={c._id} className="bg-gray-100 p-3 rounded">
              <p className="font-medium text-sm text-gray-800">
                {c.author?.name || "User"}
              </p>

              {editingCommentId === c._id ? (
                <>
                  <textarea
                    className="w-full border rounded p-2 mt-2"
                    value={editingContent}
                    onChange={(e) => setEditingContent(e.target.value)}
                  />

                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={() => updateComment(c._id)}
                      className="bg-green-600 text-white text-sm px-3 py-1 rounded"
                    >
                      Save
                    </button>

                    <button
                      onClick={() => setEditingCommentId(null)}
                      className="bg-gray-400 text-white text-sm px-3 py-1 rounded"
                    >
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <p className="text-gray-700 mt-1">{c.content}</p>
              )}

              {/* COMMENT EDIT / DELETE */}
              {user &&
                (user.role === "admin" || c?.author?._id === user._id) &&
                editingCommentId !== c._id && (
                  <div className="flex gap-3 mt-2 text-sm">
                    <button
                      onClick={() => {
                        setEditingCommentId(c._id);
                        setEditingContent(c.content);
                      }}
                      className="text-blue-600"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => deleteComment(c._id)}
                      className="text-red-600"
                    >
                      Delete
                    </button>
                  </div>
                )}
            </div>
          ))}
        </div>

        {/* ADD COMMENT */}
        {user ? (
          <div className="mt-6">
            <textarea
              className="w-full border rounded p-2 mb-2"
              placeholder="Write a comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />

            <button
              onClick={submitComment}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Add Comment
            </button>
          </div>
        ) : (
          <p className="text-gray-500 mt-4">Login to add a comment.</p>
        )}
      </div>
    </div>
  );
}
