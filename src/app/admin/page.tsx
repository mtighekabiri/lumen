"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Plus,
  Pencil,
  Trash2,
  Eye,
  EyeOff,
  ArrowLeft,
  Save,
  X,
  Newspaper,
  Star,
  Calendar,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BlogPost, BlogPostInput, CATEGORIES } from "@/types/blog";

type ViewMode = "list" | "create" | "edit";

export default function AdminPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<ViewMode>("list");
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form state
  const [formData, setFormData] = useState<BlogPostInput>({
    title: "",
    excerpt: "",
    content: "",
    category: CATEGORIES[0],
    author: "",
    featured: false,
    imageUrl: "",
    tags: [],
    status: "draft",
  });
  const [tagsInput, setTagsInput] = useState("");

  // Fetch posts on load
  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    try {
      setLoading(true);
      const res = await fetch("/api/posts");
      if (!res.ok) throw new Error("Failed to fetch posts");
      const data = await res.json();
      setPosts(data);
    } catch (err) {
      setError("Failed to load posts");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  function resetForm() {
    setFormData({
      title: "",
      excerpt: "",
      content: "",
      category: CATEGORIES[0],
      author: "",
      featured: false,
      imageUrl: "",
      tags: [],
      status: "draft",
    });
    setTagsInput("");
    setEditingPost(null);
    setError(null);
  }

  function handleEdit(post: BlogPost) {
    setEditingPost(post);
    setFormData({
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      category: post.category,
      author: post.author,
      featured: post.featured,
      imageUrl: post.imageUrl || "",
      tags: post.tags,
      status: post.status,
    });
    setTagsInput(post.tags.join(", "));
    setViewMode("edit");
  }

  function handleCreate() {
    resetForm();
    setViewMode("create");
  }

  function handleCancel() {
    resetForm();
    setViewMode("list");
  }

  async function handleSave() {
    try {
      setSaving(true);
      setError(null);

      // Parse tags from comma-separated string
      const tags = tagsInput
        .split(",")
        .map((t) => t.trim())
        .filter((t) => t);

      const postData: BlogPostInput = {
        ...formData,
        tags,
      };

      let res: Response;
      if (viewMode === "edit" && editingPost) {
        res = await fetch(`/api/posts/${editingPost.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(postData),
        });
      } else {
        res = await fetch("/api/posts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(postData),
        });
      }

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to save post");
      }

      await fetchPosts();
      handleCancel();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save post");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this post?")) return;

    try {
      const res = await fetch(`/api/posts/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete post");
      await fetchPosts();
    } catch (err) {
      setError("Failed to delete post");
      console.error(err);
    }
  }

  async function toggleStatus(post: BlogPost) {
    try {
      const newStatus = post.status === "published" ? "draft" : "published";
      const res = await fetch(`/api/posts/${post.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!res.ok) throw new Error("Failed to update status");
      await fetchPosts();
    } catch (err) {
      setError("Failed to update status");
      console.error(err);
    }
  }

  async function toggleFeatured(post: BlogPost) {
    try {
      const res = await fetch(`/api/posts/${post.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ featured: !post.featured }),
      });
      if (!res.ok) throw new Error("Failed to update featured status");
      await fetchPosts();
    } catch (err) {
      setError("Failed to update featured status");
      console.error(err);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
              </Link>
              <h1 className="text-xl font-semibold text-gray-900">
                Content Manager
              </h1>
            </div>
            {viewMode === "list" && (
              <Button onClick={handleCreate}>
                <Plus className="h-4 w-4 mr-2" />
                New Post
              </Button>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            {error}
            <button
              onClick={() => setError(null)}
              className="float-right text-red-500 hover:text-red-700"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* List View */}
        {viewMode === "list" && (
          <>
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <Card>
                <CardContent className="p-4">
                  <div className="text-2xl font-bold text-gray-900">
                    {posts.length}
                  </div>
                  <div className="text-sm text-gray-500">Total Posts</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="text-2xl font-bold text-green-600">
                    {posts.filter((p) => p.status === "published").length}
                  </div>
                  <div className="text-sm text-gray-500">Published</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="text-2xl font-bold text-yellow-600">
                    {posts.filter((p) => p.status === "draft").length}
                  </div>
                  <div className="text-sm text-gray-500">Drafts</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="text-2xl font-bold text-[#01b3d4]">
                    {posts.filter((p) => p.featured).length}
                  </div>
                  <div className="text-sm text-gray-500">Featured</div>
                </CardContent>
              </Card>
            </div>

            {/* Posts List */}
            {posts.length === 0 ? (
              <Card>
                <CardContent className="py-16 text-center">
                  <Newspaper className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    No posts yet
                  </h3>
                  <p className="text-gray-500 mb-6">
                    Create your first blog post to get started.
                  </p>
                  <Button onClick={handleCreate}>
                    <Plus className="h-4 w-4 mr-2" />
                    Create First Post
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>All Posts</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="divide-y divide-gray-100">
                    {posts.map((post) => (
                      <div
                        key={post.id}
                        className="py-4 flex items-center justify-between gap-4"
                      >
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-medium text-gray-900 truncate">
                              {post.title}
                            </h3>
                            {post.featured && (
                              <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 shrink-0" />
                            )}
                            <span
                              className={`text-xs px-2 py-0.5 rounded-full shrink-0 ${
                                post.status === "published"
                                  ? "bg-green-100 text-green-700"
                                  : "bg-yellow-100 text-yellow-700"
                              }`}
                            >
                              {post.status}
                            </span>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span className="flex items-center gap-1">
                              <User className="h-3 w-3" />
                              {post.author}
                            </span>
                            <span>{post.category}</span>
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {new Date(post.publishedAt).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            onClick={() => toggleFeatured(post)}
                            className={`p-2 rounded-lg transition-colors ${
                              post.featured
                                ? "text-yellow-600 bg-yellow-50 hover:bg-yellow-100"
                                : "text-gray-400 hover:text-yellow-600 hover:bg-yellow-50"
                            }`}
                            title={
                              post.featured
                                ? "Remove from featured"
                                : "Mark as featured"
                            }
                          >
                            <Star
                              className={`h-4 w-4 ${post.featured ? "fill-current" : ""}`}
                            />
                          </button>
                          <button
                            onClick={() => toggleStatus(post)}
                            className={`p-2 rounded-lg transition-colors ${
                              post.status === "published"
                                ? "text-green-600 bg-green-50 hover:bg-green-100"
                                : "text-gray-400 hover:text-green-600 hover:bg-green-50"
                            }`}
                            title={
                              post.status === "published"
                                ? "Unpublish"
                                : "Publish"
                            }
                          >
                            {post.status === "published" ? (
                              <Eye className="h-4 w-4" />
                            ) : (
                              <EyeOff className="h-4 w-4" />
                            )}
                          </button>
                          <button
                            onClick={() => handleEdit(post)}
                            className="p-2 text-gray-400 hover:text-[#01b3d4] hover:bg-[#01b3d4]/10 rounded-lg transition-colors"
                            title="Edit"
                          >
                            <Pencil className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(post.id)}
                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                          {post.status === "published" && (
                            <Link
                              href={`/news/${post.slug}`}
                              target="_blank"
                              className="p-2 text-gray-400 hover:text-[#01b3d4] hover:bg-[#01b3d4]/10 rounded-lg transition-colors"
                              title="View post"
                            >
                              <ArrowLeft className="h-4 w-4 rotate-[135deg]" />
                            </Link>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </>
        )}

        {/* Create/Edit Form */}
        {(viewMode === "create" || viewMode === "edit") && (
          <Card>
            <CardHeader className="border-b border-gray-100">
              <div className="flex items-center justify-between">
                <CardTitle>
                  {viewMode === "create" ? "Create New Post" : "Edit Post"}
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Button variant="outline" onClick={handleCancel}>
                    Cancel
                  </Button>
                  <Button onClick={handleSave} disabled={saving}>
                    <Save className="h-4 w-4 mr-2" />
                    {saving ? "Saving..." : "Save Post"}
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-6">
                {/* Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Title *
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-[#01b3d4] focus:border-transparent outline-none"
                    placeholder="Enter post title"
                  />
                </div>

                {/* Excerpt */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Excerpt *
                  </label>
                  <textarea
                    value={formData.excerpt}
                    onChange={(e) =>
                      setFormData({ ...formData, excerpt: e.target.value })
                    }
                    rows={2}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-[#01b3d4] focus:border-transparent outline-none resize-none"
                    placeholder="Brief summary of the post (shown in listings)"
                  />
                </div>

                {/* Content */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Content * (Markdown supported)
                  </label>
                  <textarea
                    value={formData.content}
                    onChange={(e) =>
                      setFormData({ ...formData, content: e.target.value })
                    }
                    rows={15}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-[#01b3d4] focus:border-transparent outline-none resize-y font-mono text-sm"
                    placeholder="Write your post content here. Use Markdown for formatting:
# Heading 1
## Heading 2
**bold** *italic*
- bullet points
1. numbered list
> blockquote"
                  />
                </div>

                {/* Two column layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Category */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Category *
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) =>
                        setFormData({ ...formData, category: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-[#01b3d4] focus:border-transparent outline-none"
                    >
                      {CATEGORIES.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Author */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Author *
                    </label>
                    <input
                      type="text"
                      value={formData.author}
                      onChange={(e) =>
                        setFormData({ ...formData, author: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-[#01b3d4] focus:border-transparent outline-none"
                      placeholder="Author name"
                    />
                  </div>
                </div>

                {/* Tags */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tags (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={tagsInput}
                    onChange={(e) => setTagsInput(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-[#01b3d4] focus:border-transparent outline-none"
                    placeholder="e.g., attention, metrics, digital advertising"
                  />
                </div>

                {/* Options */}
                <div className="flex items-center gap-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.status === "published"}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          status: e.target.checked ? "published" : "draft",
                        })
                      }
                      className="w-4 h-4 text-[#01b3d4] border-gray-300 rounded focus:ring-[#01b3d4]"
                    />
                    <span className="text-sm text-gray-700">
                      Publish immediately
                    </span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.featured}
                      onChange={(e) =>
                        setFormData({ ...formData, featured: e.target.checked })
                      }
                      className="w-4 h-4 text-[#01b3d4] border-gray-300 rounded focus:ring-[#01b3d4]"
                    />
                    <span className="text-sm text-gray-700">
                      Mark as featured
                    </span>
                  </label>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}
