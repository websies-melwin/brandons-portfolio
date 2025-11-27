"use client";

import { useEffect, useState, useRef } from "react";
import { supabase } from "@/lib/supabaseClient";

interface MediaItem {
  url: string;
  type: "image" | "video";
}

interface Project {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  media_url: string;
  media_type: "image" | "video";
  thumbnail_url: string | null;
  additional_media: MediaItem[] | null;
  display_order: number;
  created_at: string;
}

export default function AdminPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });
  const [saving, setSaving] = useState(false);
  const [uploadingIndex, setUploadingIndex] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchProjects = async () => {
    const { data, error } = await supabase
      .from("portfolio_projects")
      .select("*")
      .order("display_order", { ascending: true });

    if (error) {
      console.error("Error fetching projects:", error);
    } else {
      setProjects(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
    });
    setMediaItems([]);
    setEditingProject(null);
    setShowForm(false);
  };

  const handleEdit = (project: Project) => {
    setFormData({
      title: project.title,
      description: project.description || "",
    });

    // Reconstruct media items from project data
    const items: MediaItem[] = [];
    if (project.media_url) {
      items.push({ url: project.media_url, type: project.media_type });
    }
    if (project.additional_media) {
      items.push(...project.additional_media);
    }
    setMediaItems(items);

    setEditingProject(project);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;

    const { error } = await supabase
      .from("portfolio_projects")
      .delete()
      .eq("id", id);

    if (error) {
      alert("Error deleting project: " + error.message);
    } else {
      fetchProjects();
    }
  };

  const uploadFile = async (file: File): Promise<string | null> => {
    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `projects/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("media")
        .upload(filePath, file);

      if (uploadError) {
        alert("Error uploading file: " + uploadError.message);
        return null;
      }

      const { data: { publicUrl } } = supabase.storage
        .from("media")
        .getPublicUrl(filePath);

      return publicUrl;
    } catch (err) {
      alert("Error uploading file: " + (err as Error).message);
      return null;
    }
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const isVideo = file.type.startsWith("video/");
    const type: "image" | "video" = isVideo ? "video" : "image";

    // Set uploading state (use length as index for "adding new")
    setUploadingIndex(mediaItems.length);

    const url = await uploadFile(file);

    if (url) {
      setMediaItems([...mediaItems, { url, type }]);
    }

    setUploadingIndex(null);

    // Reset the input so same file can be selected again
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const removeMediaItem = (index: number) => {
    setMediaItems(mediaItems.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (mediaItems.length === 0) {
      alert("Please add at least one image or video");
      return;
    }

    setSaving(true);

    // First item is the main media (thumbnail)
    const mainMedia = mediaItems[0];
    const additionalMedia = mediaItems.slice(1);

    const projectData = {
      title: formData.title,
      slug: formData.title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""),
      description: formData.description || null,
      media_url: mainMedia.url,
      media_type: mainMedia.type,
      thumbnail_url: mainMedia.type === "image" ? mainMedia.url : null,
      additional_media: additionalMedia.length > 0 ? additionalMedia : null,
      display_order: editingProject?.display_order ?? projects.length,
    };

    if (editingProject) {
      const { error } = await supabase
        .from("portfolio_projects")
        .update(projectData)
        .eq("id", editingProject.id);

      if (error) {
        alert("Error updating project: " + error.message);
      }
    } else {
      const { error } = await supabase
        .from("portfolio_projects")
        .insert(projectData);

      if (error) {
        alert("Error creating project: " + error.message);
      }
    }

    setSaving(false);
    resetForm();
    fetchProjects();
  };

  if (loading) {
    return <div className="text-zinc-500">Loading projects...</div>;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
          Projects
        </h2>
        <button
          onClick={() => setShowForm(true)}
          className="px-4 py-2 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-sm font-medium rounded-lg hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors"
        >
          Add Project
        </button>
      </div>

      {/* Project Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-zinc-900 rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-zinc-200 dark:border-zinc-800">
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                {editingProject ? "Edit Project" : "Add New Project"}
              </h3>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                  Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                  className="w-full px-3 py-2 border border-zinc-200 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border border-zinc-200 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 resize-none"
                />
              </div>

              {/* Media Upload Section */}
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                  Media {mediaItems.length === 0 && "*"}
                </label>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-3">
                  First image/video will be used as the thumbnail
                </p>

                {/* Media Items Grid */}
                <div className="grid grid-cols-3 gap-3 mb-3">
                  {mediaItems.map((item, index) => (
                    <div
                      key={index}
                      className={`relative aspect-square rounded-lg overflow-hidden bg-zinc-100 dark:bg-zinc-800 ${
                        index === 0 ? "ring-2 ring-zinc-900 dark:ring-zinc-100" : ""
                      }`}
                    >
                      {item.type === "image" ? (
                        <img
                          src={item.url}
                          alt={`Media ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <video
                          src={item.url}
                          className="w-full h-full object-cover"
                        />
                      )}
                      {index === 0 && (
                        <span className="absolute top-1 left-1 px-1.5 py-0.5 text-[10px] font-medium bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded">
                          Main
                        </span>
                      )}
                      <span className="absolute top-1 right-1 px-1.5 py-0.5 text-[10px] font-medium bg-black/50 text-white rounded capitalize">
                        {item.type}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeMediaItem(index)}
                        className="absolute bottom-1 right-1 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                      >
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ))}

                  {/* Add Button */}
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileSelect}
                    accept="image/*,video/*"
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploadingIndex !== null}
                    className="aspect-square rounded-lg border-2 border-dashed border-zinc-300 dark:border-zinc-600 flex flex-col items-center justify-center text-zinc-400 hover:border-zinc-400 dark:hover:border-zinc-500 hover:text-zinc-500 transition-colors disabled:opacity-50"
                  >
                    {uploadingIndex !== null ? (
                      <svg className="animate-spin h-6 w-6" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                    ) : (
                      <>
                        <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        <span className="text-xs">Add</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              <p className="text-sm text-zinc-500 dark:text-zinc-400 text-center">
                Once published, this project will show onto your portfolio
              </p>

              <div className="flex gap-3 pt-4 border-t border-zinc-200 dark:border-zinc-800">
                <button
                  type="button"
                  onClick={resetForm}
                  className="flex-1 px-4 py-2 border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 text-sm font-medium rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving || mediaItems.length === 0}
                  className="flex-1 px-4 py-2 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-sm font-medium rounded-lg hover:bg-zinc-800 dark:hover:bg-zinc-200 disabled:opacity-50 transition-colors"
                >
                  {saving ? "Saving..." : editingProject ? "Update Project" : "Create Project"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Projects List */}
      {projects.length === 0 ? (
        <div className="text-center py-12 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800">
          <p className="text-zinc-500 dark:text-zinc-400">No projects yet</p>
          <p className="text-sm text-zinc-400 dark:text-zinc-500 mt-1">
            Click &quot;Add Project&quot; to create your first one
          </p>
        </div>
      ) : (
        <div className="grid gap-4">
          {projects.map((project) => (
            <div
              key={project.id}
              className="flex items-center gap-4 p-4 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800"
            >
              {/* Thumbnail */}
              <div className="w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-zinc-100 dark:bg-zinc-800">
                {project.media_type === "image" ? (
                  <img
                    src={project.media_url}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                ) : project.thumbnail_url ? (
                  <img
                    src={project.thumbnail_url}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-zinc-400">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-medium text-zinc-900 dark:text-zinc-100 truncate">
                    {project.title}
                  </h3>
                  <span className="px-2 py-0.5 text-xs bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 rounded capitalize">
                    {project.media_type}
                  </span>
                  {project.additional_media && project.additional_media.length > 0 && (
                    <span className="px-2 py-0.5 text-xs bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 rounded">
                      +{project.additional_media.length} more
                    </span>
                  )}
                </div>
                {project.description && (
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 truncate mt-0.5">
                    {project.description}
                  </p>
                )}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleEdit(project)}
                  className="p-2 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
                  title="Edit"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
                <button
                  onClick={() => handleDelete(project.id)}
                  className="p-2 text-zinc-500 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                  title="Delete"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
